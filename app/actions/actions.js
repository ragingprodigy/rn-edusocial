import * as types from './actionTypes';

export function login(navProps, res) {
  return {
    type: types.LOGIN,
    nav:navProps,
    data: res
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
