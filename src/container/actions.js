export const TRANSFER_TASK = "TRANSFER_TASK"
export const TODO_TASK = "TODO_TASK"
export const REMOVE_TASK = "REMOVE_TASK"

export const transferTask = (data) => ({
  type: TRANSFER_TASK,
  data
})

export const updateTodo = (data) => ({
  type: TODO_TASK,
  data
})

export const removeTask = (data) => ({
  type: REMOVE_TASK,
  data
})