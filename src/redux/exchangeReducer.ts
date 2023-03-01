type Action = {
  type: string,
  [prop: string]: any
}
type Comp = {
  [prop: string]: Element
}
const components: Comp = {}
export default ((state = {
  components,
}, action: Action) => {
  switch (action.type) {
    case 'addComp':
      state.components[action.id] = action.data
      return {...state}
    case 'delComp':
      delete state.components[action.id]
      return {...state}
    default:
      return state
  }
})