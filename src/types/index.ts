//型の宣言
export type CsrfToken = {
  csrf_token: string
}

export type Credential = {
  email: string
  password: string
}

export type Shift = {
  id: number
  starttime: string
  endtime: string
  created_at: Date
  updated_at: Date
}
