import Cookies from 'js-cookie';

const TokenKey:string = 'token'
const EventKey:string = 'eventId'

export const getToken = () => {
  const res:any = Cookies.get(TokenKey)
  return Cookies.get(TokenKey) !== undefined ? JSON.parse(res).token : '57b9e0b8-d243-4fff-989e-3d1c6ecf43b5';
}

export const getAuthorization = () => {
  const res:any = Cookies.get(TokenKey)
  return Cookies.get(TokenKey) !== undefined ? JSON.parse(res).tokenType + JSON.parse(res).token : ''
}

export const setToken = (token:string) => {
  return Cookies.set(TokenKey, token)
}

export const removeToken = () => {
  return Cookies.remove(TokenKey)
}

export const getEvent = () => {
  return Cookies.get(EventKey)
}

export const setEvent = (eventId:string) => {
  return Cookies.set(EventKey, eventId)
}

export const removeEvent = () => {
  return Cookies.remove(EventKey)
}
