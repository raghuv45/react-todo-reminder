import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteReminder,
  fetchReminders,
  setVisibilityFilter
} from "../actions/reminderAction";

import { SHOW_REMINDER_ALL, SHOW_REMINDER_FUTURE, SHOW_REMINDER_PAST } from "../actions/actionsTypes";
import { bindActionCreators } from "redux";

class ReminderTable extends Component {

  componentDidMount() {
    this.props.fetchReminders();
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
              className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_REMINDER_ALL ? 'active' : '') }
              onClick={() => this.props.setVisibilityFilter(SHOW_REMINDER_ALL)}
            >
             All
            </li>
            <li
               className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_REMINDER_PAST ? 'active' : '') }
              onClick={() => this.props.setVisibilityFilter(SHOW_REMINDER_PAST)}
            >
              Past
            </li>
            <li
               className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_REMINDER_FUTURE ? 'active' : '') }
              onClick={() => this.props.setVisibilityFilter(SHOW_REMINDER_FUTURE)}
            >
              Upcoming
            </li>
          </ol>
        </nav>
        {this.props.reminders.length !== 0 ? (
          <table
            style={{ marginTop: "60px" }}
            className="table table-hover table-dark"
          >
            <thead>
              <tr>
                <th scope="col">Reminders</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.reminders.map(reminder => (
                <tr key={reminder._id}>
                  <td>
                    {reminder.title} {reminder.completed === true ? "(completed)" : ""}
                  </td>
                  <td>
                    {new Date(reminder.remindDate).toLocaleDateString()}
                  </td>
                  <td>
                    <span
                      className="fas fa-minus-circle"
                      onClick={() => this.props.deleteReminder(reminder._id)}
                      style={{
                        color: "white",
                        fontSize: "20pt",
                        marginRight: "20px"
                      }}
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
              Reminder List is empty or Filter results show no results
            </div>
          </div>
        )}{" "}
      </div>
    );
  }
}

const getVisibleReminders = (reminders, filter) => {
  switch (filter) {
    case SHOW_REMINDER_ALL:
      return reminders;
    case SHOW_REMINDER_PAST:
      return reminders.filter(t => t.completed);
    case SHOW_REMINDER_FUTURE:
      return reminders.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = state => {
  console.log("state",state)
  return { reminders: state.reminders,
    visibilityFilter: state.visibilityFilter
 };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteReminder,
      fetchReminders
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ReminderTable);
