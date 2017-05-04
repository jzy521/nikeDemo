var {EventEmitter} = require('fbemitter');
var emitter = new EventEmitter();
import {EDITUSER , TOAST} from '../constants'

const EventObserver =  {

    emitChange: function(type, data){
        emitter.emit(type,data);
    },
    register: function(type, callback){
        switch (type){
            case EDITUSER:
                emitter.addListener(EDITUSER, (data)=>{callback(data)});
                break;
            case TOAST:
                emitter.addListener(TOAST, (data)=>{callback(data)});
                break;
            default:
                console.log("No type find");
        }

    },
    unRegister: function(type){
        switch (type){
            case EDITUSER:
                emitter.removeListener(EDITUSER);
                break;
            case TOAST:
                emitter.removeListener(TOAST);
                break;
            default:
                console.log("No type find");
        }
    },

}

export default EventObserver;