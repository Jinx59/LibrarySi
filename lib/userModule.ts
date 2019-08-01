import { IUser } from "./models/User"
import axios from "axios";

// method call API Auth to get user by mail
export async function getUserByMail (token: string, pEmail: string, API_URL: string, API_KEY: string): Promise<IUser|undefined> {

  // set headers and method
  // const options = { method: "GET", headers: { Authorization: token, "x-api-key": API_KEY }, url: API_URL + pEmail };
  
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        headers: { Authorization: token, "x-api-key": API_KEY },
        url: API_URL + pEmail
      }).then(res => {
        res.data.then((jsonData: IUser) => {
          if (res.status == 200) {
            // delete critical information
            delete jsonData.password
            delete jsonData.passwordSalt
            resolve(jsonData)
          } else if (res.status == 404) {
            resolve(undefined)
          } else {
            reject(new Error('error.dataNotProvided'))
          }
        }).catch(e => reject(new Error('error.dataNotProvided')))
      }).catch(e => reject(new Error('error.dataNotProvided')))
    })
  }


// method call API Auth to create a user
export async function createUser (token: string, pUser: IUser, API_URL: string, API_KEY: string): Promise<IUser|undefined> {

  // // set headers and method
  // const options = { method: "GET", headers: { Authorization: token, "x-api-key": API_KEY, "Content-Type": "application/json" }, body: JSON.stringify(pUser) };
  
    return new Promise((resolve, reject) => {
      fetch(API_URL, { method: "POST", headers: { Authorization: token, "x-api-key": API_KEY, "Content-Type": "application/json" }, body: JSON.stringify(pUser)})
      .then(data => {
        data.json().then((jsonData: IUser) => {
          if (data.ok) {
            resolve(jsonData)
          } else if (data.status == 404) {
            resolve(undefined)
          } else {
            reject(new Error('error.dataNotProvided'))
          }
        }).catch(e => reject(new Error('error.dataNotProvided')))
      }).catch(e => reject(new Error('error.dataNotProvided')))
    })
  }