import * as actions from "../actions"

const intialState = {
  task: [
    {name: "google", status: "todo"},
    {name: "yahoo", status: "done"},
    {name: "uber", status: "done"}
  ],
}

const todoReducer = (state = intialState, action) => {
  switch(action.type) {
    case actions.TRANSFER_TASK: {
      return {...state, task: [...action.data]}
    }
    case actions.REMOVE_TASK: {
      return {...state, task: [...action.data]}
    }
    case actions.TODO_TASK: {
      const tempTask = state.task.slice()
      tempTask.push({name: action.data, status: "todo"})
      return {...state, task: tempTask}
    }
    default:
      return state
  }
}

export default todoReducer
