import * as types from "./actionTypes";

export function login() {
  return {
    type: types.LOGIN_LOGOUT,
    loggedIn: true
  };
}

export function logout() {
  return {
    type: types.LOGIN_LOGOUT,
    loggedIn: false
  };
}

export function setNav(nav) {
  return {
    type: types.NAV,
    navigator : nav
  }
}

export function changeNav(propz){
  return {
    type: types.CHANGE_NAV_STYLE,
    prop: propz
  }
}

export function changeNavTitle(propz){
  return {
    type: types.CHANGE_NAV_TITLE,
    prop: propz
  }
}

export function navToPop(propz){
  return {
    type: types.NAV_TO_POP,
    name: propz
  }
}

export function navigate(id){
  return {
    type: types.NAVTO,
    props : id
  }
}
