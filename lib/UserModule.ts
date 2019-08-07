import { IUser } from "./models/User"
import axios from "axios";


 export class UserModule {

  private apiToken: string|undefined
  private apiKey: string
  private apiUri: string|undefined
  
  initialize(token: string|undefined, apiUri: string, apiKey: string|undefined): void {
    this.apiToken = token
    this.apiKey = apiKey
    this.apiUri = apiUri
  }
  // method call API Auth to get user by mail
  async getByMail(pEmail: string): Promise<IUser|undefined> {
  
    // set url
    const url = this.apiUri + pEmail
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        headers: {
          Authorization: this.apiToken,
          'x-api-key': this.apiKey
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
  async create(pUser: IUser): Promise<IUser|undefined> {
  
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: this.apiUri,
        headers: {
          Authorization: this.apiToken,
          'x-api-key': this.apiKey
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
}
