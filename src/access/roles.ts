import type { Access, FieldAccess, Where } from 'payload'

export type UserRole = 'admin' | 'editor' | 'manager'
type UserWithRole = { role?: UserRole } | null | undefined

export const hasRole = (...roles: UserRole[]): Access => ({ req }) => {
  const role = (req.user as UserWithRole)?.role
  return Boolean(role && roles.includes(role))
}

export const hasRoleField = (...roles: UserRole[]): FieldAccess => ({ req }) => {
  const role = (req.user as UserWithRole)?.role
  return Boolean(role && roles.includes(role))
}

export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } } satisfies Where
}

export const publicTariffsOrStaff: Access = ({ req }) => {
  const role = (req.user as UserWithRole)?.role
  if (role) return role === 'admin' || role === 'editor'
  const publicTariffWhere: Where = {
    and: [
      { _status: { equals: 'published' } },
      { publiclyVisible: { equals: true } },
    ],
  }
  return publicTariffWhere
}
