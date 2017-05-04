import React from 'react'
import UserForm from './UserForm'
import UserList from './UserList'
import EventObserver from './EventObserver'
import {TOAST} from '../constants'
var ReactToastr = require("react-toastr");
var {ToastContainer,ToastMessage} = ReactToastr;
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
class App extends React.Component {
    
    triggerToast(message){
        this.refs.container.success(
            "",
            message, {
                closeButton: true,
            });
    }
    
    componentDidMount() {
        EventObserver.register(TOAST, this.triggerToast.bind(this));
    }

    componentDidUnMount() {
        EventObserver.unRegister(TOAST, this.triggerToast);
    }

    render() {
        return (
            <div>
                <ToastContainer ref="container"
                                toastMessageFactory={ToastMessageFactory}
                                className="toast-top-right"/>
                <UserForm/>
                <UserList/>
            </div>
        )
    }
}

export default App
