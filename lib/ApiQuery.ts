

    /**
     * convert Object to format query param string URL
     */
    export function parseQueryParam (filters: string, url: string): string {
      let queryParams = url
      if (filters !== undefined) {
        let queryOperator = '?'
        if (url.lastIndexOf('?') >= 0) {
          queryOperator = '&'
        }
        Object.keys(filters).forEach(filter => {
          if (filters[filter] !== undefined || filters[filter] !== '') {
            queryParams += queryOperator + filter + '=' + filters[filter]
            queryOperator = '&'
          }
        })
      }
      return queryParams
    }

    export function parsePagination (pagination: any, url: string): string {
      let queryParams = url
      if (pagination !== undefined) {
        let queryOperator = '?'
        if (url.lastIndexOf('?') >= 0) {
          queryOperator = '&'
        }
        // Pagination determination
        let start = (pagination.page - 1) * pagination.rowsPerPage
        let end = pagination.page * pagination.rowsPerPage
        queryParams += queryOperator + 'range=' + start + '-' + end
        // Sort
        if (queryParams.lastIndexOf('?') >= 0) {
          queryOperator = '&'
        }
        if (pagination.descending) {
          queryParams += queryOperator + 'sort=' + pagination.sortBy + '_desc'
        } else {
          queryParams += queryOperator + 'sort=' + pagination.sortBy + '_asc'
        }
      }
      return queryParams
    }
  
    export function parseFields (fields: string, url: string): string {
      let fieldsParams = url
      if (fields !== undefined) {
        let queryOperator = '?'
        if (url.lastIndexOf('?') >= 0) {
          queryOperator = '&'
        }
        fieldsParams += queryOperator + 'fields=' + fields.toString()
      }
      return fieldsParams
    }
  
  