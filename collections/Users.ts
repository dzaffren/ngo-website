import { CollectionConfig } from 'payload'
import { isDeveloper, isAdmin, isAdminFieldLevel } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  access: {
    // Only Admins/Devs can read the user list
    // (Optional: You can allow users to read their own profile with { id: { equals: user.id } })
    read: isAdmin, 
    
    // Only Admins/Devs can create new users
    create: isAdmin,

    // Only Admins/Devs can update users
    // (Or allow users to update themselves)
    update: isAdmin,

    // Only Admins/Devs can delete users
    delete: isAdmin,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      // Only Admins can see/edit this field
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        { label: 'Developer (Super Admin)', value: 'developer' },
        { label: 'NGO Admin (User Manager)', value: 'admin' },
        { label: 'NGO Editor (Content Creator)', value: 'editor' },
      ]
    },
    // Add Name for friendlier UI
    {
      name: 'name',
      type: 'text',
    }
  ],
}