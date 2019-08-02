import { IUser } from "./models/User"
import axios from "axios";

// method call API Auth to get user by mail
export async function getUserByMail (token: string, pEmail: string, API_URL: string, API_KEY: string): Promise<IUser|undefined> {

  // set url
  const url = API_URL + pEmail
    return new Promise((resolve, reject) => {
      axios.get(url, {
        headers: { Authorization: token, "x-api-key": API_KEY }
        } 
      ).then(res => {
          if (res.status == 200) {
            let user: IUser = res.data
            // delete critical information
            delete user.password
            delete user.passwordSalt
            resolve(user)
          } else if (res.status == 404) {
            resolve(undefined)
          } else {
            reject(new Error('error.dataNotProvideed'))
          }
      }).catch(e => reject(new Error('error.dataNotProvideeed')))
    })
  }


// method call API Auth to create a user
export async function createUser (token: string|undefined, pUser: IUser, API_URL: string, API_KEY: string): Promise<IUser|undefined> {

  // // set headers and method
  // const options = { method: "GET", headers: { Authorization: token, "x-api-key": API_KEY, "Content-Type": "application/json" }, body: JSON.stringify(pUser) };
  
    return new Promise((resolve, reject) => {
      axios.post(API_URL, { headers: {
         Authorization: token, "x-api-key": API_KEY, "Content-Type": "application/json" }, data: pUser})
      .then(res => {
            let user: IUser = res.data
            resolve(user)
      }).catch(e => reject(new Error('error.dataNotProvided')))
    })
  }