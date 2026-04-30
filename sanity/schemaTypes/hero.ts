import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'الواجهة الرئيسية',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'العنوان',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'العنوان الفرعي',
      type: 'string',
    }),
    defineField({
      name: 'ctaText',
      title: 'نص زر الدعوة',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'رابط زر الدعوة',
      type: 'string',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'صورة الخلفية',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
