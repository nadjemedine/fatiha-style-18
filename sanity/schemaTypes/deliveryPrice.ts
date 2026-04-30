import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'deliveryPrice',
  title: 'أسعار التوصيل',
  type: 'document',
  fields: [
    defineField({
      name: 'wilayaId',
      title: 'رقم الولاية',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(58),
    }),
    defineField({
      name: 'wilayaName',
      title: 'اسم الولاية',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'homePrice',
      title: 'سعر توصيل للمنزل (د.ج)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'officePrice',
      title: 'سعر توصيل للمكتب / نقطة استلام (د.ج)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'carrier',
      title: 'شركة التوصيل',
      type: 'string',
      options: {
        list: [
          { title: 'ياليدين', value: 'yalidine' },
          { title: 'أخرى', value: 'other' },
        ],
      },
      initialValue: 'yalidine',
    }),
    defineField({
      name: 'isActive',
      title: 'مفعل',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'notes',
      title: 'ملاحظات',
      type: 'text',
      description: 'ملاحظات إضافية حول التسعير',
    }),
  ],
  preview: {
    select: {
      wilayaName: 'wilayaName',
      homePrice: 'homePrice',
      officePrice: 'officePrice',
      carrier: 'carrier',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { wilayaName, homePrice, officePrice, carrier, isActive } = selection;
      return {
        title: `${wilayaName} - ${carrier}`,
        subtitle: `Home: ${homePrice} DA | Office: ${officePrice} DA | ${isActive ? '✓ Active' : '✗ Inactive'}`,
      };
    },
  },
});
