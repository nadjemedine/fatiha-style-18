import { defineField, defineType } from 'sanity';
import { ImageIcon } from '@sanity/icons';

export default defineType({
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      description: 'Auto-generated order number',
      readOnly: true,
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wilaya',
      title: 'Wilaya',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'commune',
      title: 'Commune',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'deliveryType',
      title: 'Delivery Type',
      type: 'string',
      options: {
        list: [
          { title: 'Home Delivery', value: 'home' },
          { title: 'Office/Pickup Point', value: 'office' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'productName',
              title: 'Product Name',
              type: 'string',
            }),
            defineField({
              name: 'productId',
              title: 'Product ID',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Product Image',
              type: 'string',
            }),
            defineField({
              name: 'color',
              title: 'Color',
              type: 'string',
            }),
            defineField({
              name: 'size',
              title: 'Size',
              type: 'string',
            }),
            defineField({
              name: 'fabric',
              title: 'Fabric',
              type: 'string',
            }),
            defineField({
              name: 'price',
              title: 'Price (DA)',
              type: 'number',
            }),
            defineField({
              name: 'quantity',
              title: 'Quantity',
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
      title: 'Subtotal (DA)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'deliveryPrice',
      title: 'Delivery Price (DA)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'total',
      title: 'Total (DA)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Processing', value: 'processing' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          { title: 'Cash on Delivery (COD)', value: 'cod' },
        ],
      },
      initialValue: 'cod',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Internal notes about this order',
    }),
    defineField({
      name: 'orderedAt',
      title: 'Order Date',
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
