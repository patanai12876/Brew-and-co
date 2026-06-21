import { config } from "dotenv";
import image from "next/image";
config();

process.env.DATABASE_URL = process.env.DATABASE_URL;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.orderItem.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.user.deleteMany();

  const menuItems = await prisma.menuItem.createMany({
    data: [
      { name: "Espresso", category: "Coffee", price: 250, image:"/menu/espresso.webp", description: "Strong and bold, pure coffee perfection", available: true },
      { name: "Cappuccino", category: "Coffee", price: 350,image:"/menu/Cappuccino.jpg", description: "Creamy espresso with steamed milk foam", available: true },
      { name: "Latte", category: "Coffee", price: 380, image:"/menu/latte.webp", description: "Smooth espresso blended with hot milk", available: true },
      { name: "Cold Brew", category: "Cold Drinks", price: 420, image:"/menu/brew.jpg", description: "Smooth cold brew concentrate with ice", available: true },
      { name: "Iced Americano", category: "Cold Drinks", price: 350, image:"/menu/iced.webp", description: "Refreshing espresso shots over ice", available: true },
      { name: "Caramel Frappe", category: "Cold Drinks", price: 480, image:"/menu/caramel.webp", description: "Icy blended drink with caramel sweetness", available: true },
      { name: "Croissant", category: "Food", price: 280, image:"/menu/croissant.jpg", description: "Buttery and flaky French pastry", available: true },
      { name: "Club Sandwich", category: "Food", price: 450, image:"/menu/club.jpg", description: "Triple-layer sandwich with ham, bacon, and chicken", available: true },
      { name: "Chocolate Muffin", category: "Food", price: 220, image:"/menu/muffin.jpg",description: "Moist chocolate muffin with chocolate chips", available: true },
    ],
  });

  console.log(`✅ Created ${menuItems.count} menu items`);
  console.log("✨ Seeding completed!");
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });