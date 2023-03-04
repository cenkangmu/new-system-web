type Action = {
  type: string,
  [prop: string]: any
}

export default ((state = {
  userMenus: [],
  allMenus:null,
  collapsed: false,
}, action: Action) => {

  switch (action.type) {
    case 'changeUserMenus':
      return {...state, userMenus: action.data}
    case 'changeAllMenus':
      return {...state, allMenus: action.data}
    case 'setCollapsed':
      return {...state, collapsed: action.data}
    default:
      return state
  }
})