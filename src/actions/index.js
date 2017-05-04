import { ADDUSER, REMOVEUSER , EDITUSER} from '../constants'


export const addUserAction = (user) => {
  return {
    type : ADDUSER,
    user
  }

}


export const editUserAction = (user) => {
  return {
    type : EDITUSER,
    user
  }

}

export const removeUserAction = (id) => {
   return {
     type: REMOVEUSER,
     id
   }
}
