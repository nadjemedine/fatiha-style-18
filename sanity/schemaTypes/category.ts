import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'الفئة',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'العنوان',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'الرابط',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'الوصف',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'صورة الغلاف',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
