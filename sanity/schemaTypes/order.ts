import { defineField, defineType } from 'sanity';
import { ImageIcon } from '@sanity/icons';

export default defineType({
  name: 'order',
  title: 'الطلبات',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'رقم الطلب',
      type: 'string',
      description: 'رقم الطلب (يولد تلقائيا)',
      readOnly: true,
    }),
    defineField({
      name: 'customerName',
      title: 'اسم الزبون',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerPhone',
      title: 'هاتف الزبون',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wilaya',
      title: 'الولاية',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'commune',
      title: 'البلدية',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'deliveryType',
      title: 'نوع التوصيل',
      type: 'string',
      options: {
        list: [
          { title: 'توصيل للمنزل', value: 'home' },
          { title: 'توصيل للمكتب / نقطة استلام', value: 'office' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detailedAddress',
      title: 'العنوان التفصيلي',
      type: 'text',
      description: 'العنوان المفصل في حالة التوصيل للمنزل',
    }),
    defineField({
      name: 'items',
      title: 'عناصر الطلب',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'productName',
              title: 'اسم المنتج',
              type: 'string',
            }),
            defineField({
              name: 'productId',
              title: 'معرف المنتج',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'صورة المنتج',
              type: 'string',
            }),
            defineField({
              name: 'color',
              title: 'اللون',
              type: 'string',
            }),
            defineField({
              name: 'size',
              title: 'المقاس',
              type: 'string',
            }),
            defineField({
              name: 'fabric',
              title: 'القماش',
              type: 'string',
            }),
            defineField({
              name: 'price',
              title: 'السعر (د.ج)',
              type: 'number',
            }),
            defineField({
              name: 'quantity',
              title: 'الكمية',
              type: 'number',
            }),
          ],
          preview: {
            select: {
              productName: 'productName',
              quantity: 'quantity',
              price: 'price',
              image: 'image',
            },
            prepare(selection) {
              const { productName, quantity, price, image } = selection;
              return {
                title: `${productName} (x${quantity})`,
                subtitle: `${price * quantity} DA`,
                media: ImageIcon,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'subtotal',
      title: 'المجموع الفرعي (د.ج)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'deliveryPrice',
      title: 'سعر التوصيل (د.ج)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'total',
      title: 'الإجمالي (د.ج)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'status',
      title: 'حالة الطلب',
      type: 'string',
      options: {
        list: [
          { title: 'قيد الانتظار', value: 'pending' },
          { title: 'مؤكد', value: 'confirmed' },
          { title: 'قيد المعالجة', value: 'processing' },
          { title: 'تم الشحن', value: 'shipped' },
          { title: 'تم التوصيل', value: 'delivered' },
          { title: 'ملغى', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'paymentMethod',
      title: 'طريقة الدفع',
      type: 'string',
      options: {
        list: [
          { title: 'الدفع عند الاستلام (COD)', value: 'cod' },
        ],
      },
      initialValue: 'cod',
    }),
    defineField({
      name: 'notes',
      title: 'ملاحظات',
      type: 'text',
      description: 'ملاحظات داخلية حول هذا الطلب',
    }),
    defineField({
      name: 'orderedAt',
      title: 'تاريخ الطلب',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      orderNumber: 'orderNumber',
      customerName: 'customerName',
      total: 'total',
      status: 'status',
      wilaya: 'wilaya',
    },
    prepare(selection) {
      const { orderNumber, customerName, total, status, wilaya } = selection;
      const statusLabels: Record<string, string> = {
        pending: '⏳ Pending',
        confirmed: '✅ Confirmed',
        processing: '🔄 Processing',
        shipped: '📦 Shipped',
        delivered: '✓ Delivered',
        cancelled: '❌ Cancelled',
      };
      return {
        title: `Order #${orderNumber || 'N/A'} - ${customerName}`,
        subtitle: `${total} DA | ${wilaya} | ${statusLabels[status] || status}`,
      };
    },
  },
});
