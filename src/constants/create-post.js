import { TRIGGERS } from '@/constants/triggers';
import { EMAIL_PATTERN } from '@/modules/auth/AuthLayout/constants';

export const POST_TYPES = {
  Items: {
    categoryName: 'items',
    subcategories: {
      'Antiques & Collectibles': {
        generalInformation: {
          label: 'General Information',
          direction: 'row',
          fields: [
            {
              label: 'Subcategory',
              fieldName: 'subcategory',
              type: 'select',
              validation: {
                required: true,
              },
              options: 'dynamic',
              trigger: TRIGGERS.GET_FROM_SUBCATEGORY,
            },
            {
              label: 'Post Title',
              fieldName: 'postTitle',
              type: 'text',
              validation: {
                required: true,
                min: 1,
              },
            },
            {
              label: 'Location',
              fieldName: 'location',
              type: 'location',
              validation: {
                required: true,
              },
            },
            {
              label: 'Price',
              fieldName: 'price',
              type: 'text',
              constantSymbol: '$',
              validation: {
                min: 1,
                isNumber: true,
              },
            },
          ],
        },
        detailedInformation: {
          label: 'Detailed Information',
          direction: 'column',
          fields: [
            {
              fieldName: 'condition',
              type: 'radio',
              validation: {
                required: true,
              },
              options: [
                {
                  label: 'New',
                  name: 'new',
                },
                {
                  label: 'usedLikedNew',
                  name: 'Used (Like new)',
                },
                {
                  label: 'usedGood',
                  name: 'Used (Good)',
                },
                {
                  label: 'usedFair',
                  name: 'Used (Fair)',
                },
              ],
            },
            {
              label: 'Description',
              fieldName: 'description',
              type: 'textarea',
              validation: {
                required: true,
                min: 1,
              },
            },
            {
              fieldName: 'pictures',
              type: 'file',
              validation: {
                maxCount: 5,
              },
            },
          ],
        },
        contactInfo: {
          label: 'Contact Information',
          direction: 'column',
          fields: [
            {
              fieldName: 'email',
              type: 'email',
              validation: {
                required: true,
                pattern: EMAIL_PATTERN,
              },
            },
            {
              label: 'Phone Number',
              fieldName: 'phoneNumber',
              type: 'number',
              maxCount: 2,
              requiredFirst: true,
              validation: {
                min: 5,
                isNumber: true,
              },
            },
            {
              label: 'Web and Social',
              fieldName: 'webAndSocial',
              type: 'text',
              maxCount: 2,
              requiredFirst: true,
              validation: {
                min: 5,
              },
            },
          ],
        },
      },
    },
  },
};
