import {ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS} from '../constant';
//The sfcookie package was purposly written for react in order to easily read and initiate cookies in a browser
import {bake_cookie, read_cookie} from 'sfcookies'


const reminder = (action) => {
  let {text, dueDate} = action
  return {
    text: action.text,
    id: Math.random(),
    text,
    dueDate
  }
}

const removeById = (state = [], id) => {
  const reminders = state.filter(reminder => reminder.id !== id);
  console.log('reduced reminder', reminders)
  return reminders
}

const reminders = (state= [], action) => {
  let reminders = null;
  // adding the cookie to our state
  state= read_cookie('reminders')
  switch(action.type){
    case ADD_REMINDER:
      reminders = [...state, reminder(action)];
      // installing the cookie
      bake_cookie('reminders', reminders)
      return reminders;
      case DELETE_REMINDER:
        reminders = removeById(state, action.id)
        //This will allow us to delete the cookie and the browser wont remember the reminder
        bake_cookie('reminders', reminders)
        return reminders
      case CLEAR_REMINDERS:
        reminders = []
        bake_cookie('reminders', reminders);
        return reminders
    default:
      return state
  }
}

export default reminders
