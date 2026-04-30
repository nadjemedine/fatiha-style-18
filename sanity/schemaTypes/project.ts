import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'المشروع',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'العنوان',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'نوع المشروع',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'السنة',
      type: 'string',
    }),
    defineField({
      name: 'client',
      title: 'العميل',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'رابط المشروع',
      type: 'url',
    }),
  ],
});
