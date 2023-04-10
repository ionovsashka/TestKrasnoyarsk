export interface DataUserPage{
  first_name: string
  last_name: string
  avatar: string
  email: string
  id: number
}

export interface SupportUserPage{
  text: string
  url: string
}

export interface UserPage {
  data: DataUserPage
  support: SupportUserPage
}
