import { IAbsenceModel } from "./models/Absence"
import { ApiResponseObjectList } from './models/ApiResponseObjectList'
import { parseQueryParam, parsePagination, parseFields } from './ApiQuery'
import { ErrorModel } from './models/ErrorModel'
import axios from "axios";

export class AbsenceModule {

  private apiToken: string | undefined
  private apiKey: string
  private apiUri: string | undefined

  // method to initialize property and get ready to use
  initialize(token: string | undefined, apiUri: string, apiKey: string | undefined): void {
    this.apiToken = token
    this.apiKey = apiKey
    this.apiUri = apiUri
  }

  // get all absence for a collab by collabId
  async getAllbyId (pId: string): Promise<Array<IAbsenceModel>> {

    const url = this.apiUri + '/api/v1/absences/' + pId
    return new Promise ((resolve, reject) => {
      // define options
      axios({
        method: 'get',
        url: url,
        headers: {
          Authorization: this.apiToken,
          'x-api-key': this.apiKey
        }
      }).then(res => {
        let absences: Array<IAbsenceModel> = res.data
        resolve(absences)
      }).catch(error => {
        if (error.response.status === 404) {
          reject(new ErrorModel('error.notFound', 404, false, error.response.data))
        } if (error.response.status === 500) {
          reject(new Error('error.server'))
        } else {
          reject(new Error('error.dataNotProvided'))
        }
      })
    })
  }

  // get solde acquis for a collab
  async getSoldeAcquis (id: string): Promise<number> {

    let url = this.apiUri + '/api/v1/solde/acquis/' + id
    return new Promise((resolve, reject) => {

      // define options
      axios({
        method: 'get',
        url: url,
        headers: {
          Authorization: this.apiToken,
          'x-api-key': this.apiKey
        }
      }).then(res => {
        resolve(res.data)
      }).catch(error => {
        if (error.response.status === 404) {
          reject(new Error('error.notFound'))
        } if (error.response.status === 500) {
          reject(new Error('error.server'))
        } else {
          reject(new Error('error.dataNotProvided'))
        }
      })
    })
  }

  // get solde anticipate for a collab
  async getSoldeAnticipate (id: string): Promise<number> {

    let url = this.apiUri + '/api/v1/solde/anticipate/' + id
    return new Promise((resolve, reject) => {

    // define options
      axios({
        method: 'get',
        url: url,
        headers: {
          Authorization: this.apiToken,
          'x-api-key': this.apiKey
        }
      }).then(res => {
        resolve(res.data)
      }).catch(error => {
        if (error.response.status === 404) {
          reject(new Error('error.notFound'))
        } if (error.response.status === 500) {
          reject(new Error('error.server'))
        } else {
          reject(new Error('error.dataNotProvided'))
        }
      })
    })
  }
}