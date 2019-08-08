import { ICollaborator } from "./models/Collaborator"
import { ApiResponseObjectList } from './models/ApiResponseObjectList'
import { parseQueryParam, parsePagination, parseFields } from './ApiQuery'
import { ErrorModel } from './models/ErrorModel'
import axios from "axios";

export class CollaboratorModule {

  private apiToken: string | undefined
  private apiKey: string
  private apiUri: string | undefined

  initialize(token: string | undefined, apiUri: string, apiKey: string | undefined): void {
    this.apiToken = token
    this.apiKey = apiKey
    this.apiUri = apiUri
  }
  // get collaborator with filters
  async getAll(filters: string, pagination: string): Promise<ApiResponseObjectList<ICollaborator>> {

    return new Promise((resolve, reject) => {
      let url = this.apiUri + '/api/v1/collaborators'

      url = parseQueryParam(filters, url)
      url = parsePagination(pagination, url)

      // define options
      axios({
        method: 'get',
        url: url,
        headers: {
          Authorization: this.apiToken,
          'x-api-key': this.apiKey
        }
      }).then(res => {
        let collab: ApiResponseObjectList<ICollaborator> = res.data
        resolve(collab)
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

  async getById(pId: string): Promise<ICollaborator | undefined> {

    // set url
    const url = this.apiUri + pId
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        headers: {
          Authorization: this.apiToken,
          'x-api-key': this.apiKey
        }
      }).then(res => {
        let collaborator: ICollaborator = res.data
        resolve(collaborator)
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

  async delete(pId: string): Promise<void> {

    const url = this.apiUri + '/api/v1/collaborators/' + pId
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: url,
        headers: {
          Authorization: this.apiToken,
          'x-api-key': this.apiKey
        }
      }).then(res => {
        resolve()
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

  async update(pCollab: ICollaborator, pId: string): Promise<void> {
    const url = this.apiUri + '/api/v1/collaborators/' + pId
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: url,
        headers: {
          Authorization: this.apiToken,
          'x-api-key': this.apiKey
        },
        data: pCollab
      }).then(res => {
        resolve()
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

  async create(pCollab: ICollaborator): Promise<ICollaborator> {
    const url = this.apiUri + '/api/v1/collaborators/'
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        headers: {
          Authorization: this.apiToken,
          'x-api-key': this.apiKey
        },
        data: pCollab
      }).then(res => {
        let collab: ICollaborator = res.data
        resolve(collab)
      }).catch(error => {
        if (error.response.status === 409) {
          reject(new Error('error.conflict'))
        } if (error.response.status === 500) {
          reject(new Error('error.server'))
        } else {
          reject(new Error('error.dataNotProvided'))
        }
      })
    })
  }
}