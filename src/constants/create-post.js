export const POST_TYPES = {
  Items: {
    categoryName: 'items',
    subcategories: {
      'Antiques & Collectibles': {
        name: 'Antiques & Collectibles',
        fields: [
          {
            fieldName: 'Post Title',
            type: 'text',
            validation: {
              required: true,
              min: 1,
            },
          },
          {
            fieldName: 'price',
            type: 'number',
            validation: {
              min: 1,
            },
          },
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
            fieldName: 'description',
            type: 'textarea',
            validation: {
              required: true,
              min: 1,
            },
          },
          {
            fieldName: 'subcategory',
            type: 'select',
            validation: {
              required: true,
            },
            options: 'dynamic',
          },
          {
            fieldName: 'Pictures',
            type: 'file',
            validation: {
              required: true,
              maxCount: 5,
            },
          },
          {
            fieldName: 'location',
            type: 'select',
            validation: {
              required: true,
            },
            options: 'dynamic',
          },
        ],
        contactInfo: {
          email: true,
          phoneNumber: {
            maxCount: 2,
            requiredFirst: true,
          },
          webAndSocial: {
            maxCount: 2,
            requiredFirst: true,
          },
        },
      },
    },
  },
};
