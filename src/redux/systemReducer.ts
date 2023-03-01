type Action = {
  type: string,
  [prop: string]: any
}

export default ((state = {
  menus: [],
  collapsed: false,
}, action: Action) => {
  switch (action.type) {
    case 'changeMenus':
      return {...state, menus: action.data}
    case 'setCollapsed':
      return {...state, collapsed: action.data}
    default:
      return state
  }
})