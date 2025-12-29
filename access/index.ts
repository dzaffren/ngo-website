import { Access, FieldAccess } from 'payload'

// 1. Developer: Full Access
export const isDeveloper: Access = ({ req: { user } }) => {
  return user?.role === 'developer'
}

// 2. Admin: Can manage users & content (Developer is also an Admin)
export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.role === 'admin' || user?.role === 'developer')
}

// 3. Editor: Can manage content only (Admin & Developer are also Editors)
export const isEditor: Access = ({ req: { user } }) => {
  return Boolean(user?.role === 'editor' || user?.role === 'admin' || user?.role === 'developer')
}

// 4. Field Level: Only Admins can change the "Role" field
// (Prevents an Editor from making themselves an Admin)
export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.role === 'admin' || user?.role === 'developer')
}