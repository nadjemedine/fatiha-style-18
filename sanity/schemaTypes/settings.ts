import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'settings',
  title: 'الإعدادات العامة',
  type: 'document',
  fields: [
    defineField({
      name: 'storeName',
      title: 'اسم المتجر',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'الشعار',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'contactEmail',
      title: 'البريد الإلكتروني',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'هاتف التواصل',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'مواقع التواصل الاجتماعي',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'اسم المنصة (مثل Facebook, X, الخ)' },
            { name: 'url', type: 'url', title: 'الرابط' },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'نص التذييل',
      type: 'text',
    }),
  ],
});
