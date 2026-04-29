import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'deliveryPrice',
  title: 'Delivery Prices',
  type: 'document',
  fields: [
    defineField({
      name: 'wilayaId',
      title: 'Wilaya ID',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(58),
    }),
    defineField({
      name: 'wilayaName',
      title: 'Wilaya Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'homePrice',
      title: 'Home Delivery Price (DA)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'officePrice',
      title: 'Office/Pickup Point Price (DA)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'carrier',
      title: 'Delivery Carrier',
      type: 'string',
      options: {
        list: [
          { title: 'Yalidine', value: 'yalidine' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'yalidine',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Additional notes about pricing',
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
