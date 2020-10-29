export interface IAuth {
  isAuthenticated: boolean
  user: IUser
  login: (username: string, password: string) => Promise<any>
  loading: boolean
  logout(): void
}

export interface IUser {
  id: Number
  username: string
  rank: string
  leo: string
  ems_fd: string
  dispatch: string
  tow: string
}