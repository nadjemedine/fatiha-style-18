import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const sanityToken = process.env.SANITY_API_TOKEN;
    
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
    }

    const body = await request.json();
    const { formData, cart, total, deliveryPrice, finalTotal } = body;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Save order to Sanity
    if (sanityToken) {
      const { createClient } = await import('next-sanity');
      const writeClient = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: '2024-01-01',
        useCdn: false,
        token: sanityToken,
      });

      await writeClient.create({
        _type: 'order',
        orderNumber,
        customerName: formData.fullName,
        customerPhone: formData.phone,
        wilaya: formData.wilaya,
        commune: formData.commune,
        deliveryType: formData.deliveryType,
        detailedAddress: formData.detailedAddress || null,
        items: cart.map((item: any) => ({
          _type: 'orderItem',
          productName: item.name,
          productId: item.id,
          image: item.image,
          color: item.color || null,
          size: item.size || null,
          fabric: item.fabric || null,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: total,
        deliveryPrice: deliveryPrice,
        total: finalTotal,
        status: 'pending',
        paymentMethod: 'cod',
        orderedAt: new Date().toISOString(),
      });

      console.log('Order saved to Sanity:', orderNumber);

      // Decrease stock quantity for each item
      try {
        const stockTransaction = writeClient.transaction();
        let hasStockUpdates = false;

        for (const item of cart) {
          if (item.id && item.size) {
            stockTransaction.patch(item.id, (p) => 
              p.dec({ [`stock[size == "${item.size}"].quantity`]: item.quantity })
            );
            hasStockUpdates = true;
          }
        }

        if (hasStockUpdates) {
          await stockTransaction.commit();
          console.log('Stock updated successfully for order:', orderNumber);
        }
      } catch (stockError) {
        // Log stock update error but don't fail the order process
        console.error('Failed to update stock items:', stockError);
      }
    }

    // Send email notification if API key is available
    let messageId = null;
    if (apiKey) {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);

      // Create order details HTML
      const orderItems = cart.map((item: any) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 16px 0;">
            <div style="font-weight: 700; color: #1f2937; font-size: 14px;">${item.name}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">
              ${item.color ? `<span style="background-color: #FEE4ED; color: #c9beda; padding: 2px 6px; border-radius: 4px; font-weight: bold;">اللون: ${item.color}</span>` : ''}
              ${item.size ? ` | المقاس: ${item.size}` : ''}
              ${item.fabric ? ` | القماش: ${item.fabric}` : ''}
            </div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">الكمية: ${item.quantity}</div>
          </td>
          <td style="padding: 16px 0; text-align: left; font-weight: 700; color: #c9beda; font-size: 14px;">
            ${item.price * item.quantity} DA
          </td>
        </tr>
      `).join('');

      const emailHtml = `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>إشعار طلب جديد</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; direction: rtl; text-align: right;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; margin-top: 40px; margin-bottom: 40px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #c9beda 0%, #d6c9e8 100%); padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800;">🎉 طلب جديد!</h1>
                <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">تم استلام طلب جديد بنجاح</p>
              </td>
            </tr>
            
            <!-- Customer Info -->
            <tr>
              <td style="padding: 30px;">
                <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 18px; font-weight: 700; border-bottom: 2px solid #c9beda; padding-bottom: 10px;">📦 معلومات الزبون</h2>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; direction: rtl;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 140px;">الاسم الكامل:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-weight: 700;">${formData.fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">رقم الهاتف:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-weight: 700;">${formData.phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">الولاية:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-weight: 700;">${formData.wilaya}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">البلدية:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-weight: 700;">${formData.commune}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">نوع التوصيل:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-weight: 700;">${formData.deliveryType === 'home' ? 'توصيل للمنزل' : 'نقطة استلام'}</td>
                  </tr>
                  ${formData.deliveryType === 'home' && formData.detailedAddress ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">العنوان التفصيلي:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-weight: 700;">${formData.detailedAddress}</td>
                  </tr>
                  ` : ''}
                </table>
              </td>
            </tr>
            
            <!-- Order Items -->
            <tr>
              <td style="padding: 0 30px 30px 30px;">
                <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 18px; font-weight: 700; border-bottom: 2px solid #c9beda; padding-bottom: 10px;">🛍️ تفاصيل الطلب</h2>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; direction: rtl;">
                  ${orderItems}
                </table>
              </td>
            </tr>
            
            <!-- Total -->
            <tr>
              <td style="padding: 0 30px 30px 30px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; padding: 20px; direction: rtl;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">المجموع الفرعي:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-weight: 700; text-align: left; font-size: 14px;">${total} DA</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">سعر التوصيل:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-weight: 700; text-align: left; font-size: 14px;">${deliveryPrice} DA</td>
                  </tr>
                  <tr style="border-top: 2px solid #e5e7eb;">
                    <td style="padding: 12px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 800;">الإجمالي الكلي:</td>
                    <td style="padding: 12px 0 0 0; color: #c9beda; font-weight: 900; text-align: left; font-size: 20px;">${finalTotal} DA</td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #6b7280; font-size: 12px;">طريقة الدفع: الدفع عند الاستلام (COD)</p>
                <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 11px;">تم تسجيل الطلب بتاريخ ${new Date().toLocaleString('fr-FR')}</p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      // Send email using Resend
      const { data, error } = await resend.emails.send({
        from: 'My Store <orders@fatihastyle18.store>',
        to: ['fatihabenamor1984@gmail.com'],
        subject: `🎉 New Order - ${formData.fullName} - ${finalTotal} DA`,
        html: emailHtml,
      });

      if (error) {
        console.error('Resend error:', error);
      } else {
        messageId = data?.id;
      }
    }

    return NextResponse.json(
      { success: true, messageId, orderNumber },
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
