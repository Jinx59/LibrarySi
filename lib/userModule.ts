import { IUser } from "./models/User"
import fetch from "node-fetch";

export async function getUserByMail (token: string, pEmail: string, API_URL: string, API_KEY: string): Promise<IUser> {

  const options = { method: "GET", headers: { Authorization: token, "x-api-key": API_KEY } };
    return new Promise((resolve, reject) => {
      fetch(API_URL + pEmail, options).then(data => {
        data.json().then((jsonData: IUser) => {
          if (data.ok) {
            resolve(jsonData)
          } else if (data.status == 404) {
            resolve(jsonData)
          } else {
            reject(new Error('error.dataNotProvided'))
          }
        }).catch(e => reject(new Error('error.dataNotProvided')))
      }).catch(e => reject(new Error('error.dataNotProvided')))
    })
  }