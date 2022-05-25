const defaultState = {
  projectName: '这里显示项目名称'
}

export default (state = defaultState, action) => {
  if (action.type === 'PROJECTNAME') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.projectName = action.input
    return newState
  }

  return state
}
