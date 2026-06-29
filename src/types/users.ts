export type Users = {
  id: string
  username: string
  email: string
  password: string
  role: 'user' | 'admin'
  emailVerified: boolean
}