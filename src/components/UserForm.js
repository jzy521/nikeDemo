/* eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import * as Action from '../actions'
import update from 'immutability-helper';
import $ from 'jquery';
import EventObserver from './EventObserver'
import {TOAST,EDITUSER} from '../constants'

class UserForm extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            id: -1,
            firstName: '',
            lastName: '',
            hobbies: {
                basketball: false,
                football: false,
                soccer: false
            }
        };

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleEditUser=this.handleEditUser.bind(this);
        this.handleClear=this.handleClear.bind(this);
    }

    handleEditUser(user){
        this.setState({id: user.id});
        this.setState({firstName: user.firstName});
        this.setState({lastName: user.lastName});
        this.setState({hobbies:user.hobbies});

    }


    componentDidMount() {
        EventObserver.register(EDITUSER, this.handleEditUser );
    }

    componentDidUnMount() {
        EventObserver.unRegister(EDITUSER, this.handleEditUser);
    }

    showLoading(){
        var $modal = $('#modal');
        var $loader = $('#loader');
        $modal.css('display',"block");
        $loader.css('display',"block");
    }

    hideLoading(){
        var $modal = $('#modal');
        var $loader = $('#loader');
        $modal.css('display',"none");
        $loader.css('display',"none");
    }

    handleSubmit(e){
        this.showLoading();
        setTimeout(function(){
            let saveUser = {};
            saveUser.id = this.state.id;
            saveUser.firstName =this.state.firstName;
            saveUser.lastName = this.state.lastName;
            saveUser.hobbies = this.state.hobbies;
            if(saveUser.id===-1){
                this.props.addUserToStore(saveUser);
                EventObserver.emitChange(TOAST,"Add user success ! ");
            }else{
                this.props.editUserToStore(saveUser);
                EventObserver.emitChange(TOAST,"Edit user success ! ");
            }

            this.hideLoading();
            this.handleClear();
        }.bind(this),2000);

       e.preventDefault();
        e.stopPropagation();
    }

    handleChange(e){
      var inputName =  e.target.name;
       if(inputName === 'firstName'){
           this.setState({firstName: e.target.value});

       }else if(inputName === 'lastName'){
           this.setState({lastName: e.target.value});

       }else if(inputName === 'hobby'){

           for(var key in this.state.hobbies){
               if(key === e.target.value){
                   let temp = !this.state.hobbies[key];
                    var hobbies =update(this.state.hobbies,{[key]: {$set: temp}});
                   this.setState({hobbies});
               }
           }
       }

    }

    handleClear(){
        this.setState({
            id: -1,
            firstName: '',
            lastName: '',
            hobbies: {
                basketball: false,
                football: false,
                soccer: false
            }
        });

    }
    
    render(){
        return (
            <div className = "container-fluid">
                <div id="modal" className="modal"/>
            <div  className="user-card">
                <div id="loader" className="loader"></div>
                <h1>User Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <input name="firstName" type="text" value={this.state.firstName} onChange={this.handleChange} className="form-control account-input" placeholder="First Name"  required />
                    <input name="lastName" type="text" value={this.state.lastName} onChange={this.handleChange} className="form-control account-input"  placeholder="Last Name"  required />
                    <label><input name="hobby" type="checkbox" checked={this.state.hobbies.basketball} onChange={this.handleChange} value="basketball"/>Basketball</label>
                    <label><input name="hobby" type="checkbox" checked={this.state.hobbies.football} onChange={this.handleChange} value="football"/>Football</label>
                    <label><input name="hobby" type="checkbox" checked={this.state.hobbies.soccer} onChange={this.handleChange} value="soccer"/>Soccer</label>
                    <button type="submit" name="submit" className="button user-button" >Submit</button>
                    <button type="button" name="cancel" className="button user-button" onClick={this.handleClear} >Cancel</button>
                </form>
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUserToStore: (payload) => dispatch( Action.addUserAction(payload) ),
        editUserToStore: (payload) => dispatch( Action.editUserAction(payload) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)



