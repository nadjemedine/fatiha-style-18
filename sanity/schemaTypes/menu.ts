import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'menu',
  title: 'القائمة',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'اسم القائمة',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'مثال: "القائمة الرئيسية" أو "تذييل الصفحة"',
    }),
    defineField({
      name: 'items',
      title: 'عناصر القائمة',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'عنوان العنصر' },
            { name: 'path', type: 'string', title: 'الرابط (مثال: /about أو /contact)' },
            { name: 'icon', type: 'string', title: 'اسم الأيقونة (اختياري)', description: 'مثل: Store, Info, Phone, etc.' },
          ],
        },
      ],
    }),
  ],
});
