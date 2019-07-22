import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addReminder } from '../actions/reminderAction'
import {bindActionCreators} from 'redux'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReminderTable from './ReminderTable'

class Reminder extends Component {
    constructor(props){
        super(props)
        this.state = {
            reminderText: '',
            startDate:new Date()
        }
        this.onChangeTodoText = this.onChangeTodoText.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
    }

    onChangeTodoText(e){
        this.setState({
            reminderText: e.target.value
        })
    }

    onChangeDate (value) {
        this.setState({
            startDate: value
        })
    }

    render(){
        return (
            <div> 
                <div className="form-group row">
                    <div className="col-sm-5">
                        <input onChange={this.onChangeTodoText} value={this.state.reminderText} type="text" className="form-control" id="inputEmail3" placeholder="add reminder text here"/>
                    </div>
                    <div className="col-sm-5">
                      <DatePicker class="form-control" selected={this.state.startDate} onChange={this.onChangeDate}/>
                    </div>
                </div>
                <div>
                    <button type="button" onClick={ () => this.setState({ reminderText: '' }) } style={{marginTop: "25px", marginRight: "15px"}} className="btn btn-danger">Cancel</button>
                    <button type="button" onClick={() =>{ this.props.addReminder({reminderText:this.state.reminderText,date:this.state.startDate}); this.setState({ reminderText: '' }) } } style={{marginTop: "25px"}} className="btn btn-success">Add Reminder</button>
                </div> 
                <ReminderTable />
            </div>    
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addReminder
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(Reminder)

