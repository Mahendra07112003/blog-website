import type { CollectionConfig } from 'payload';

export const Blog: CollectionConfig = {
  slug: 'blogs',
  labels: {
    singular: 'Blog',
    plural: 'Blogs',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'draft'], // Improved admin view
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(), // Auto-fills with current date
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true, // Ensure every blog has an image
    },
    {
      name: 'categories',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'category',
          type: 'select',
          options: ['Technology', 'Health', 'Education', 'Business', 'Lifestyle'],
          required: true,
        },
      ],
    },
    {
      name: 'authors',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users', // Links authors to user accounts
          required: true,
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'draft',
      type: 'checkbox',
      defaultValue: false,
      label: 'Save as Draft',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        elements: ['h2', 'h3', 'bold', 'italic', 'link', 'ul', 'ol', 'blockquote'], // Improved formatting options
      },
    },
  ],
};

export default Blog;
