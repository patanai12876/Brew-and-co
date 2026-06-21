import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export interface OrderConfirmationData {
  customerName: string;
  customerEmail: string;
  orderId: string;
  totalPrice: number;
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
  deliveryAddress: string;
  estimatedDeliveryTime: string;
}

export async function sendOrderConfirmation(
  data: OrderConfirmationData
): Promise<void> {
  const itemsHTML = data.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #F5E6D0;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #F5E6D0; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #F5E6D0; text-align: right;">Rs.${item.unitPrice}</td>
      <td style="padding: 10px; border-bottom: 1px solid #F5E6D0; text-align: right;">Rs.${(item.quantity * item.unitPrice).toFixed(2)}</td>
    </tr>
  `
    )
    .join("");

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #1A0F0A; background-color: #FDF6EC; }
        .container { max-width: 600px; margin: 0 auto; background-color: #FFFFFF; padding: 30px; border-radius: 8px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #C8956C; padding-bottom: 20px; }
        .header h1 { color: #1A0F0A; margin: 0; font-size: 28px; }
        .order-details { margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #F5E6D0; }
        .detail-label { font-weight: bold; color: #C8956C; }
        .detail-value { color: #1A0F0A; }
        .items-table { width: 100%; margin: 20px 0; }
        .items-table thead { background-color: #F5E6D0; }
        .items-table th { padding: 12px; text-align: left; color: #1A0F0A; font-weight: bold; }
        .total-row { background-color: #F5E6D0; padding: 15px; margin: 20px 0; border-radius: 4px; }
        .total-row h3 { margin: 0; color: #1A0F0A; display: flex; justify-content: space-between; }
        .cta-button { background-color: #C8956C; color: #FFFFFF; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #F5E6D0; color: #6B3A2A; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Brew & Co.</h1>
          <p style="margin: 10px 0 0 0; color: #C8956C;">Order Confirmation</p>
        </div>

        <p>Dear ${data.customerName},</p>
        <p>Thank you for your order! We're preparing your delicious items.</p>

        <div class="order-details">
          <div class="detail-row">
            <span class="detail-label">Order ID:</span>
            <span class="detail-value">#${data.orderId}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Delivery Address:</span>
            <span class="detail-value">${data.deliveryAddress}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Estimated Delivery:</span>
            <span class="detail-value">${data.estimatedDeliveryTime}</span>
          </div>
        </div>

        <h3 style="color: #1A0F0A; margin-top: 30px;">Order Items</h3>
        <table class="items-table">
          <thead>
            <tr>
              <th>Item</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Unit Price</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div class="total-row">
          <h3>Total Amount: Rs.${data.totalPrice.toFixed(2)}</h3>
        </div>

        <p>You can track your order on our website or contact us at any time.</p>

        <div style="text-align: center;">
          <a href="${process.env.NEXTAUTH_URL || "https://brewandco.com"}" class="cta-button">Track Your Order</a>
        </div>

        <div class="footer">
          <p>© 2025 Brew & Co. · Lahore · All rights reserved</p>
          <p>For support, contact us at support@brewandco.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: data.customerEmail,
    subject: `Order Confirmation #${data.orderId} - Brew & Co.`,
    html: htmlContent,
  });

  // Verify connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Mailer connection failed:", error);
  } else {
    console.log("✅ Mailer ready");
  }
});
}
