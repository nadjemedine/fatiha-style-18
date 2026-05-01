import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'المنتج',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'الاسم',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'الرابط',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'السعر',
      type: 'number',
      validation: Rule => Rule.required().positive(),
    }),
    defineField({
      name: 'originalPrice',
      title: 'السعر الأصلي',
      type: 'number',
      description: 'مفيد لإظهار التخفيضات',
    }),
    defineField({
      name: 'image',
      title: 'الصورة الرئيسية',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'معرض الصور',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'category',
      title: 'الفئة',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'description',
      title: 'الوصف',
      type: 'text',
    }),
    defineField({
      name: 'stock',
      title: 'كمية المخزون',
      description: 'ادخل الكمية لكل مقاس',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'size', type: 'string', title: 'المقاس', description: 'مثل S, M, L, XL, الخ' },
            { name: 'quantity', type: 'number', title: 'الكمية', validation: Rule => Rule.min(0) }
          ],
          preview: {
            select: {
              size: 'size',
              quantity: 'quantity'
            },
            prepare({ size, quantity }) {
              return {
                title: `${size || 'بدون مقاس'}`,
                subtitle: `الكمية: ${quantity || 0}`
              };
            }
          }
        }
      ]
    }),
    defineField({
      name: 'sizes',
      title: 'المقاسات المتاحة',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'المقاسات المتاحة للمنتج (مثل S, M, L, XL)',
    }),
    defineField({
      name: 'colors',
      title: 'الألوان المتاحة',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'اسم اللون' },
            { name: 'image', type: 'image', title: 'صورة اللون (اختياري)', options: { hotspot: true } }
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image'
            }
          }
        }
      ],
      description: 'الألوان المتاحة للمنتج مع صور اختيارية لكل لون',
    }),
    defineField({
      name: 'fabric',
      title: 'القماش',
      type: 'string',
      description: 'المادة / القماش المستخدم',
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
