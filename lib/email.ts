import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

type OrderEmail = {
  customerName: string;
  email?: string;
  orderId: string;
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  totalPrice: number;
  paymentMethod: "esewa" | "cod";
};

export async function sendOrderConfirmationEmail(order: OrderEmail) {
  const productsHtml = order.products
    .map(
      (product) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #e2e8f0;">
            ${product.name}
          </td>

          <td
            align="center"
            style="padding:10px;border-bottom:1px solid #e2e8f0;"
          >
            ${product.quantity}
          </td>

          <td
            align="right"
            style="padding:10px;border-bottom:1px solid #e2e8f0;"
          >
            Rs. ${(product.price * product.quantity).toLocaleString()}
          </td>
        </tr>
      `
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html>

<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table
width="600"
cellpadding="0"
cellspacing="0"
style="background:white;margin-top:30px;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">

<tr>
<td
style="background:#38BDF8;padding:30px;text-align:center;">

<h1 style="margin:0;color:white;">
SUGANDHA
</h1>

<p style="margin-top:8px;color:white;">
Smell Good, Feel Confident!
</p>

</td>
</tr>

<tr>
<td style="padding:35px;">

<h2>Hello ${order.customerName},</h2>

<p>
Thank you for shopping with <b>Sugandha</b>.
Your order has been successfully received.
</p>

<table
width="100%"
cellpadding="10"
style="border-collapse:collapse;margin-top:20px;">

<tr style="background:#f1f5f9;">
<td><b>Order ID</b></td>
<td>${order.orderId}</td>
</tr>

<tr>
<td colspan="2" style="padding-top:20px;">

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="border-collapse:collapse;">

<tr style="background:#f1f5f9;">
<th
align="left"
style="padding:10px;">
Product
</th>

<th
align="center"
style="padding:10px;">
Qty
</th>

<th
align="right"
style="padding:10px;">
Subtotal
</th>
</tr>

${productsHtml}

</table>

</td>
</tr>

<tr style="background:#f1f5f9;">
<td><b>Total</b></td>
<td>
Rs. ${order.totalPrice.toLocaleString()}
</td>
</tr>

<tr>
<td><b>Payment</b></td>
<td>${order.paymentMethod.toUpperCase()}</td>
</tr>

<tr style="background:#f1f5f9;">
<td><b>Status</b></td>
<td style="color:#16a34a;font-weight:bold;">
Pending Confirmation
</td>
</tr>

</table>

<p style="margin-top:25px;">
We'll start preparing your order soon.
You'll receive another email when your order has been shipped.
</p>

<hr style="margin:30px 0;">

<p style="color:#64748b;font-size:14px;">
Thank you for choosing <b>Sugandha</b> ❤️
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>

</html>
  `;

  const info = await transporter.sendMail({
    from: `"Sugandha" <${process.env.EMAIL_USER}>`,
    to: order.email,
    subject: `Order Confirmed - ${order.orderId}`,
    html,
  });
  console.log("Accepted:", info.accepted);
  console.log("Rejected:", info.rejected);
}

type DeliveryEmail = {
  customerName: string;
  email: string;
  orderId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
};

export async function sendDeliveryEmail(order: DeliveryEmail) {

  const html = `
    <!DOCTYPE html>
    <html>

    <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
    <td align="center">

    <table
    width="600"
    cellpadding="0"
    cellspacing="0"
    style="
    background:white;
    margin-top:30px;
    border-radius:12px;
    overflow:hidden;
    border:1px solid #e2e8f0;
    ">

    <tr>    
<td
style="
background:#38BDF8;
padding:30px;
text-align:center;
">

<h1 style="margin:0;color:white;">
SUGANDHA
</h1>

<p style="margin-top:8px;color:white;">
Smell Good, Feel Confident!
</p>

</td>
</tr>

<tr>

<td style="padding:35px;">

<h2 style="margin-top:0;color:#0f172a;">
🎉 Your Order Has Been Delivered!
</h2>

<p style="color:#475569;font-size:16px;line-height:26px;">

Hello <b>${order.customerName}</b>,

<br><br>

We're happy to let you know that your order has been successfully delivered.

We hope you're enjoying your new fragrance!

</p>

<table
width="100%"
cellpadding="10"
style="
margin-top:25px;
border-collapse:collapse;
">

<tr style="background:#f1f5f9;">
<td><b>Order ID</b></td>
<td>${order.orderId}</td>
</tr>

<tr>
<td><b>Product</b></td>
<td>${order.productName}</td>
</tr>

<tr style="background:#f1f5f9;">
<td><b>Quantity</b></td>
<td>${order.quantity}</td>
</tr>

<tr>
<td><b>Total Paid</b></td>
<td>Rs. ${order.totalPrice}</td>
</tr>

<tr style="background:#f1f5f9;">
<td><b>Status</b></td>
<td style="color:#16a34a;font-weight:bold;">
Delivered ✅
</td>
</tr>

</table>

<div
style="
margin-top:35px;
padding:20px;
background:#ecfeff;
border-left:4px solid #38BDF8;
">

<h3 style="margin-top:0;">
Thank You ❤️
</h3>

<p style="margin-bottom:0;color:#475569;line-height:24px;">

Thank you for trusting <b>Sugandha</b>.

Your support helps us grow every single day.

If you loved our fragrance, we'd love to serve you again.

</p>

</div>

<div
style="
text-align:center;
margin-top:35px;
">

<a
href="https://wa.me/9779818849093"
style="
display:inline-block;
background:#25D366;
color:white;
text-decoration:none;
padding:14px 28px;
border-radius:8px;
font-weight:bold;
">

Contact Us on WhatsApp

</a>

</div>

<hr
style="
margin:40px 0 20px;
border:none;
border-top:1px solid #e2e8f0;
">

<p
style="
text-align:center;
font-size:13px;
color:#64748b;
">

This email was sent by
<b>SUGANDHA</b>

<br><br>

Let's Smell Good

</p>

</td>
</tr>

</table>

</td>
</tr>

</table>

</body>
</html>
`;

  await transporter.sendMail({
    from: `"Sugandha" <${process.env.EMAIL_USER}>`,
    to: order.email,
    subject: `Your Order Has Been Delivered ✅`,
    html,
  });

}

type CancelEmail = {
  customerName: string;
  email: string;
  orderId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
};

export async function sendCancellationEmail(order: CancelEmail) {

  const html = `
<!DOCTYPE html>
<html>

<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table
width="600"
cellpadding="0"
cellspacing="0"
style="
background:white;
margin-top:30px;
border-radius:12px;
overflow:hidden;
border:1px solid #e2e8f0;
">

<!-- Header -->

<tr>
<td
style="
background:#38BDF8;
padding:30px;
text-align:center;
">

<h1 style="margin:0;color:white;">
SUGANDHA
</h1>

<p style="margin-top:8px;color:white;">
Smell Good, Feel Confident!
</p>

</td>
</tr>

<!-- Body -->

<tr>
<td style="padding:35px;">

<h2 style="margin-top:0;color:#0f172a;">
Your Order Has Been Cancelled
</h2>

<p style="color:#475569;font-size:16px;line-height:26px;">

Hello <b>${order.customerName}</b>,

<br><br>

We're sorry to inform you that your order has been cancelled.

This may happen because of product availability, payment verification issues, or at your request.

If you believe this was a mistake, please contact us and we'll be happy to help.

</p>

<table
width="100%"
cellpadding="10"
style="
margin-top:25px;
border-collapse:collapse;
">

<tr style="background:#f1f5f9;">
<td><b>Order ID</b></td>
<td>${order.orderId}</td>
</tr>

<tr>
<td><b>Product</b></td>
<td>${order.productName}</td>
</tr>

<tr style="background:#f1f5f9;">
<td><b>Quantity</b></td>
<td>${order.quantity}</td>
</tr>

<tr>
<td><b>Total Amount</b></td>
<td>Rs. ${order.totalPrice}</td>
</tr>

<tr style="background:#f1f5f9;">
<td><b>Status</b></td>
<td style="color:#DC2626;font-weight:bold;">
Cancelled ❌
</td>
</tr>

</table>

<div
style="
margin-top:35px;
padding:20px;
background:#FEF2F2;
border-left:4px solid #EF4444;
">

<h3 style="margin-top:0;">
Need Assistance?
</h3>

<p style="margin-bottom:0;color:#475569;line-height:24px;">

If you still wish to purchase this fragrance or have any questions, please contact our support team.

We'll do our best to assist you.

</p>

</div>

<div
style="
text-align:center;
margin-top:35px;
">

<a
href="https://wa.me/9779818849093"
style="
display:inline-block;
background:#25D366;
color:white;
text-decoration:none;
padding:14px 28px;
border-radius:8px;
font-weight:bold;
">

Contact Support

</a>

</div>

<hr
style="
margin:40px 0 20px;
border:none;
border-top:1px solid #e2e8f0;
">

<p
style="
text-align:center;
font-size:13px;
color:#64748b;
">

Thank you for considering
<b>SUGANDHA</b>

<br><br>

We hope to serve you again soon.

</p>

</td>
</tr>

</table>

</td>
</tr>

</table>

</body>
</html>
`;

  await transporter.sendMail({
    from: `"Sugandha" <${process.env.EMAIL_USER}>`,
    to: order.email,
    subject: `Your Sugandha Order Has Been Cancelled`,
    html,
  });

}
