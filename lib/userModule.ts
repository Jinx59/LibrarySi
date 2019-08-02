import { IUser } from "./models/User"
import axios from "axios";

// method call API Auth to get user by mail
export async function getUserByMail(token: string, pEmail: string, API_URL: string, API_KEY: string): Promise<IUser|undefined> {

  // set url
  const url = API_URL + pEmail
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: token,
        'x-api-key': API_KEY
      }
    }).then(res => {
      let user: IUser = res.data
      // delete critical information
      delete user.password
      delete user.passwordSalt
      resolve(user)
    }).catch(error => {
      if (error.response.status === 404) {
        resolve(undefined)
      } if (error.response.status === 500) {
        reject(new Error('error.server'))
      } else {
        reject(new Error('error.dataNotProvided'))
      }
    })
  })
}


// method call API Auth to create a user
export async function createUser(token: string|undefined, pUser: IUser, API_URL: string, API_KEY: string|undefined): Promise<IUser|undefined> {

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: API_URL,
      headers: {
        Authorization: token,
        'x-api-key': API_KEY
      },
      data: pUser
    }).then(res => {
      let user: IUser = res.data
      resolve(user)
    }).catch(error => {
      if (error.response.status === 409) {
        resolve(undefined)
      } if (error.response.status === 500) {
        reject(new Error('error.server'))
      } else {
        reject(new Error('error.dataNotProvided'))
      }
    })
  })
}