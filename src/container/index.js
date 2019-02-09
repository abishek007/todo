import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { transferTask, updateTodo, removeTask } from "./actions"

function mapStateToProps(state) {
  const { todoReducer } = state
  const { task } = todoReducer
  return {
    task
  }
}
  
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    transferTask,
    updateTodo,
    removeTask,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)