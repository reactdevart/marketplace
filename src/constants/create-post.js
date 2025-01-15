import { acceptedImageFormats } from '@/constants/common';
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
              options: 'dynamic',
              trigger: TRIGGERS.GET_FROM_SUBCATEGORY,
              validation: {
                required: true,
              },
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
              label: 'Condition',
              fieldName: 'condition',
              type: 'radio',
              validation: {
                required: true,
              },
              options: 'dynamic',
              trigger: TRIGGERS.GET_FROM_SUBCATEGORY_OPTIONS,
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
                acceptedFormats: acceptedImageFormats,
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
              type: 'phoneNumber',
              maxCount: 2,
              requiredFirst: true,
              validation: {
                min: 5,
                isNumber: true,
              },
            },
          ],
        },
      },
    },
  },
};
