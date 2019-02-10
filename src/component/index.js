import React, { Component } from "react"
import { reduxForm, Field } from "redux-form"
import cloneDeep from "lodash/cloneDeep"
import Container from "../container"
import renderInput from "./renderInput"
import "./styles.css"
class App extends Component {
  state = {
    todo: [],
    done: []
  }

  dragStart = (event, name) => {
    event.dataTransfer.setData("name", name)
  }
  
  drop = (event) => {
    let name = event.dataTransfer.getData("name")
    const { transferTask, task } = this.props
    const updatedTask = cloneDeep(task)
    for (let i=0;i < updatedTask.length;i++) {
      if (updatedTask[i].name === name) {
        updatedTask[i].status = "done"
      }
    }
    transferTask(updatedTask)
  }
  
  dragOver = (event) => {
    event.preventDefault()
  }
  
  keyPress = (event) => {
    const {reset, updateTodo} = this.props
    if (event.key === "Enter") {
      updateTodo(event.target.value)
      this.todoNotification("added", event.target.value)
      reset()
    }
  }

  todoNotification = (purpose, value) => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      let title = "TODO"
      let options = {
        body: `your task ${value} has been successfully ${purpose}`,
        icon: "http://georgeosddev.github.io/react-web-notification/example/Notifications_button_24.png",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
      }
      new Notification(title, options)
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          let title = "TODO"
          let options = {
            body: `your task ${value} has been successfully ${purpose}`,
            icon: "http://georgeosddev.github.io/react-web-notification/example/Notifications_button_24.png",
          }
          new Notification(title, options)
        }
      })
    }
  }

  removeTask = (event, name) => {
    const { task, removeTask } = this.props
    const updatedTask = cloneDeep(task)
    let index
    for (let i=0;i < updatedTask.length;i++) {
      if (updatedTask[i].name === name) {
        index = i
      }
    }
    updatedTask.splice(index, 1)
    this.todoNotification("removed", name)
    removeTask(updatedTask)
  }

  render() {
    const { task } = this.props
    const todo = [], done = []
    task.forEach(ele => {
      (ele.status === "todo") ? todo.push(ele) : done.push(ele)
    })
    return (
      <div className="container">
        <div className="field-sec">
            <Field
              name="todoTask"
              component={renderInput}
              placeholder="Enter the To Do Task"
              onKeyPress={this.keyPress}
            />
        </div>
        <div className="left-sec">
          <p className="text">To Do Task</p>
          {todo.map((x) => (
          <div
            key={x.name}
            className="content"
            draggable
            onDragStart={(e) => this.dragStart(e, x.name)}
          >
            {x.name}
            <span onClick={(e) => this.removeTask(e, x.name)}><i className="fa fa-close"></i></span>
          </div>
          ))}
        </div>
        <div className="right-sec"
          onDragOver={(e) => this.dragOver(e)}
          onDrop={(e) => this.drop(e)}
        >
          <p className="text">Completed Task</p>
          {done.map((x) => (
            <div key={x.name} className="content">
              {x.name} 
              <span onClick={(e) => this.removeTask(e, x.name)}><i className="fa fa-close"></i></span>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Container(reduxForm({
  form: "TODO_FORM",
  onSubmit: () => { },
})(App))