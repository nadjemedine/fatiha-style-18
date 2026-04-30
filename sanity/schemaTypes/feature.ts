import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'feature',
  title: 'ميزة',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'العنوان',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'الوصف',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'اسم الأيقونة (Lucide)',
      type: 'string',
      description: 'الاسم الدقيق لأيقونة Lucide لاستخدامها (مثل Truck, ShieldCheck, RefreshCcw, Headphones)',
    }),
  ],
});
