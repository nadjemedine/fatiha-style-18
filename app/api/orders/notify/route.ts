import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData, cart, total, deliveryPrice, finalTotal } = body;

    // Create order details HTML
    const orderItems = cart.map((item: any) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 16px 0;">
          <div style="font-weight: 700; color: #1f2937; font-size: 14px;">${item.name}</div>
          <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">
            ${item.color ? `Color: ${item.color}` : ''}
            ${item.size ? ` | Size: ${item.size}` : ''}
            ${item.fabric ? ` | Fabric: ${item.fabric}` : ''}
          </div>
          <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">Quantity: ${item.quantity}</div>
        </td>
        <td style="padding: 16px 0; text-align: right; font-weight: 700; color: #c9beda; font-size: 14px;">
          ${item.price * item.quantity} DA
        </td>
      </tr>
    `).join('');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order Notification</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; margin-top: 40px; margin-bottom: 40px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #c9beda 0%, #d6c9e8 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800;">🎉 Nouvelle Commande!</h1>
              <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">Order received successfully</p>
            </td>
          </tr>
          
          <!-- Customer Info -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 18px; font-weight: 700; border-bottom: 2px solid #c9beda; padding-bottom: 10px;">📦 Customer Information</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 140px;">Name:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 700;">${formData.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Phone:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 700;">${formData.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Wilaya:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 700;">${formData.wilaya}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Commune:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 700;">${formData.commune}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Delivery:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 700;">${formData.deliveryType === 'home' ? 'Home Delivery' : 'Pickup Point'}</td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Order Items -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 18px; font-weight: 700; border-bottom: 2px solid #c9beda; padding-bottom: 10px;">🛍️ Order Details</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                ${orderItems}
              </table>
            </td>
          </tr>
          
          <!-- Total -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Subtotal:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 700; text-align: right; font-size: 14px;">${total} DA</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Delivery (Yalidine):</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 700; text-align: right; font-size: 14px;">${deliveryPrice} DA</td>
                </tr>
                <tr style="border-top: 2px solid #e5e7eb;">
                  <td style="padding: 12px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 800;">Total:</td>
                  <td style="padding: 12px 0 0 0; color: #c9beda; font-weight: 900; text-align: right; font-size: 20px;">${finalTotal} DA</td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">Payment method: Cash on Delivery (COD)</p>
              <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 11px;">Order placed on ${new Date().toLocaleString('fr-FR')}</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'My Store <onboarding@resend.com>',
      to: ['fatihabenamor1984@gmail.com'],
      subject: `🎉 New Order - ${formData.fullName} - ${finalTotal} DA`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email notification' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Order notification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
