import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <div className="row" style={{'justify-content': 'center'}}>
          <div className="card col-md-3" style={{'margin-right': '10px'}}>
            <img className="card-img-top" src="/assets/todoappimage3.png" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title">TODO APP</h5>
              <p className="card-text">A list of tasks that need to be done</p>
              <a href="/todo" className="btn btn-primary">Go to todo</a>
            </div>
          </div>
          <div className="card col-md-3" style={{'margin-left': '10px'}}>
            <img className="card-img-top" src="/assets/reminder1.png" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title">REMINDER APP</h5>
              <p className="card-text">A list of task that needs to be done on a particular day.</p>
              <a href="/reminder" className="btn btn-primary">Go to reminder</a>
            </div>
          </div>
      </div>
    );
  }
}

export default connect()(Home);
