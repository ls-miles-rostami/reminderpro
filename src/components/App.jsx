import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux'
import {addReminder, deleteReminder, clearReminders} from '../actions';
import moment from 'moment'


class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      text: '',
      dueDate:''
    }
  }

  addReminder(){
    this.props.addReminder(this.state.text, this.state.dueDate)
  }


  deleteReminder(id){
    this.props.deleteReminder(id)
  }


  renderReminders(){
    const {reminders} = this.props
    return (
      <ul className='list-group col-sm-4'>
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className='list-group-item'>
                <div className='list-item'>
                  <div>{reminder.text}</div>
                    <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                </div>
                <div className='list list-item delete-button' onClick={() => this.deleteReminder(reminder.id)}>
                  &#x2715;
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render(){
    return(
      <div className='App'>
        <div className='Title'>Reminder Pro</div>
        <div className='from-inline reminder-form'>
          <div className='form-group'>
            <input className='form-controle'
              placeholder='I have to...'
              onChange={event => this.setState({text: event.target.value})}
            />
          <input className='form-controle' type='datetime-local' onChange={event => this.setState({dueDate: event.target.value})} />
          </div>
          <button type='button' className='btn btn-success' onClick={() => this.addReminder()}>Add reminder
          </button>
        </div>
        {this.renderReminders()}
        <div
          className='btn btn-danger'
          onClick={() => this.props.clearReminders()}> 
          Clear Reminders

        </div>
      </div>
    )
  }
}

/* mapDispatchToProps binds the action creators that we create to the overall dispatch function throughout the entire
   redux application and makes it accessible as props to a specific component when we call the connect feature */
// function mapDispatchToProps(dispatch){
//   return bindActionCreators({addReminder}, dispatch);
// }

// export default connect(null, mapDispatchToProps)(App)

// There is a shortcut to writing the mapDispatchToProps where you dont even have to import import {bindActionCreators} from 'redux'

function mapStateToProps(state){
  return{
    reminders: state
  }
}

export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminders})(App)
