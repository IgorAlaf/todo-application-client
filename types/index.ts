export interface ILogin {
  email: string
  password: string
}

export interface IRegister extends ILogin {
  repeat: string
}
export interface IUser {
  userId: number
  email: string
}
export interface INavItem {
  title: string
  path: string
}

export interface IAuthResponse extends ITokens {
  user: IUser
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface ITodo extends ITodoReq {
  id: number
}
export interface ITodoReq {
  title: string
  description: string
  time: string
  date: string
  checked: boolean
}

export interface IState {
  user: IUser | null
  isLoading: boolean
  errors: string
  search: string
}

export interface IPass {
  password: string
  newPassword: string
}

export interface IProfileReq {
  name: string
  surname: string
  sex: string
  phone: string
  dateOfBirth: string
  patronymic: string
}

export interface IProfile extends IProfileReq {
  id: number
}

export interface INavItem {
  icon: string
  title: string
  path: string
}
