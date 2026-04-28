import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().positive(),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
      description: 'Useful for showing discounts',
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'stock',
      title: 'Stock Quantity (كمية المخزون)',
      description: 'Enter quantities per color and size (ادخل الكمية لكل مقاس ولون)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'color', type: 'string', title: 'Color (اللون)', description: 'e.g., Red, Blue, etc.' },
            { name: 'size', type: 'string', title: 'Size (المقاس)', description: 'e.g., S, M, L, XL, etc.' },
            { name: 'quantity', type: 'number', title: 'Quantity (الكمية)', validation: Rule => Rule.min(0) }
          ],
          preview: {
            select: {
              color: 'color',
              size: 'size',
              quantity: 'quantity'
            },
            prepare({ color, size, quantity }) {
              return {
                title: `${color || 'No Color'} - ${size || 'No Size'}`,
                subtitle: `Qty: ${quantity || 0}`
              };
            }
          }
        }
      ]
    }),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'colorVariant',
          fields: [
            { name: 'name', type: 'string', title: 'Color Name' },
            { name: 'image', type: 'image', title: 'Associated Image', options: { hotspot: true } },
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image'
            }
          }
        }
      ],
      description: 'Available colors and their associated images',
    }),
    defineField({
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Available sizes for the product (e.g., S, M, L, XL)',
    }),
    defineField({
      name: 'fabric',
      title: 'Fabric (القماش)',
      type: 'string',
      description: 'The material/fabric of the product',
    }),

  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'price',
    },
    prepare({ title, media, subtitle }) {
      return {
        title,
        media,
        subtitle: subtitle ? `$${subtitle}` : '',
      };
    },
  },
});
