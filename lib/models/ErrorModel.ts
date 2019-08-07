/**
 * Interface of the Error Model
 */
export interface IErrorModel {
    message: string;
    code: number;
    success: boolean;
    response: object
  }
  
  /**
   * Error model thrown when using the Mongo DB.
   */
  export class ErrorModel implements IErrorModel {
    constructor(
      public message: string, public code: number, public success: boolean, public response: object) {}
  }
  