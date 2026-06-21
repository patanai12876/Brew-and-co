import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmation } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, items, note } = body;

    // Validate customer
    if (
      !customer?.name ||
      !customer?.email ||
      !customer?.phone ||
      !customer?.address
    ) {
      return NextResponse.json(
        { success: false, error: "Customer details incomplete" },
        { status: 400 }
      );
    }

    // Validate items
    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "No items in order" },
        { status: 400 }
      );
    }

    // Fetch menu items to verify prices
    const menuItemIds = items.map(
      (i: { menuItemId: string }) => i.menuItemId
    );

    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: menuItemIds } },
    });

    // Calculate total
    const totalPrice = items.reduce(
      (sum: number, item: { menuItemId: string; quantity: number }) => {
        const menuItem = menuItems.find((m) => m.id === item.menuItemId);
        return sum + (menuItem?.price ?? 0) * item.quantity;
      },
      0
    );

    // Create user
   const user = await prisma.user.upsert({
  where: { email: customer.email },
  update: {
    name: customer.name,
    phone: customer.phone,
    address: customer.address,
  },
  create: {
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
  },
});


    // Create order with items and delivery
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalPrice,
        note: note || "",
        status: "pending",
        items: {
          create: items.map(
            (item: { menuItemId: string; quantity: number }) => {
              const menuItem = menuItems.find((m) => m.id === item.menuItemId);
              return {
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                unitPrice: menuItem?.price ?? 0,
              };
            }
          ),
        },
        delivery: {
          create: {
            address: customer.address,
            estimatedTime: "30-45 minutes",
          },
        },
      },
      include: {
        items: {
          include: { menuItem: true },
        },
        delivery: true,
      },
    });

    // Send confirmation email
sendOrderConfirmation({
  customerName: customer.name,
  customerEmail: customer.email,
  orderId: order.id,
  totalPrice,
  items: order.items.map((i) => ({
    name: i.menuItem.name,
    quantity: i.quantity,
    unitPrice: i.unitPrice,
  })),
  deliveryAddress: customer.address,
  estimatedDeliveryTime: "30-45 minutes",
}).catch((emailError) => console.error("Email send failed:", emailError));

    return NextResponse.json({
      success: true,
      data: {
        id: order.id,
        totalPrice,
        status: order.status,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}