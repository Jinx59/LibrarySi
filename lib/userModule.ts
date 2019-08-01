import { IUser } from "./models/User"

export async function getUserByMail (token: string, pEmail: string, API_URL: string, API_KEY: string): Promise<IUser> {

    return new Promise((resolve, reject) => {
      fetch(API_URL + pEmail, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'authorization': token
        })
      }).then(data => {
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