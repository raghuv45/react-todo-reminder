import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteTodo,
  fetchTodos,
  toggleTodo,
  setVisibilityFilter
} from "../actions/actionCreator";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../actions/actionsTypes";
import { bindActionCreators } from "redux";

class Table extends Component {

  componentDidMount() {
    this.props.fetchTodos();
  }

  toggleTodo(tododata){
    console.log("tododata",tododata)
    const completed = tododata.completed ? false : true;
    this.props.toggleTodo({_id:tododata._id,completed})
  }

  render() {
    return (
      <div className="col-lg-10 offset-lg-1 col-md-10 col-sm-12 col-xs-12">
        {this.props.error  && (
          <div className="alert alert-danger" role="alert" style={{ marginTop: '20px'}}>
            {this.props.error}
          </div>
        )}
        <nav style={{ marginTop: "60px" }}>
          <ol className="breadcrumb">
            <li
              className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_ALL ? 'active' : '') }
              onClick={() => this.props.setVisibilityFilter(SHOW_ALL)}
            >
             All
            </li>
            <li
               className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_COMPLETED ? 'active' : '') }
              onClick={() => this.props.setVisibilityFilter(SHOW_COMPLETED)}
            >
              Completed
            </li>
            <li
               className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_ACTIVE ? 'active' : '') }
              onClick={() => this.props.setVisibilityFilter(SHOW_ACTIVE)}
            >
              Active
            </li>
          </ol>
        </nav>
        {this.props.todos.length !== 0 ? (
          <table
            style={{ marginTop: "60px" }}
            className="table table-hover table-dark"
          >
            <thead>
              <tr>
                <th scope="col">Todos</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.todos.map(todo => (
                <tr key={todo._id}>
                  <td
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none"
                    }}
                  >
                    {todo.title} {todo.completed === true ? "(completed)" : ""}
                  </td>
                  <td>
                    <span
                      className="fas fa-minus-circle"
                      onClick={() => this.props.deleteTodo(todo._id)}
                      style={{
                        color: "white",
                        fontSize: "20pt",
                        marginRight: "20px"
                      }}
                    />
                    <span
                      className="fas fa-check-circle"
                      onClick={() => this.toggleTodo(todo)}
                      style={{ color: "white", fontSize: "20pt" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
            style={{ marginTop: "50px" }}
            className="col-lg-10 col-md-10 col-xs-12 col-sm-12 offset-lg-1"
          >
            <div className="alert alert-danger" role="alert">
              Todo List is empty or Filter results show no results
            </div>
          </div>
        )}{" "}
      </div>
    );
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return todos;
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = state => {
  return { todos: getVisibleTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
 };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteTodo,
      fetchTodos,
      toggleTodo,
      setVisibilityFilter
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
