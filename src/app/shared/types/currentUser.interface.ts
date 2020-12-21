export interface CurrentUserInterface {
  id: number
  email: string
  username: string
  createdAt: Date
  updatedAt: Date
  bio: string | null
  image: string | null
  token: string
}
