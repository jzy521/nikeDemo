import React from 'react'
import { connect } from 'react-redux'
import * as Action from '../actions'
import EventObserver from './EventObserver'
import {TOAST,EDITUSER} from '../constants'
class UserList extends React.Component {
    removeUser(userId){
        this.props.removeUserFromStore(userId);
        EventObserver.emitChange(TOAST,"Remove user success ! ");
    }

    editUser(user){
        EventObserver.emitChange(EDITUSER,user);
    }

    render () {
        return (
            <ul className="list-group user-list">
                {this.props.users.map(user =>
                    <li key={user.id}  className="list-group-item">{user.firstName} {user.lastName}
                        <a className="editUser" onClick={this.editUser.bind(this,user)}>Edit</a>
                        <a className="removeUser" onClick={this.removeUser.bind(this,user.id)}>Remove</a>
                    </li>
                )}
            </ul>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        users : state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeUserFromStore: (payload) => dispatch( Action.removeUserAction(payload) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)