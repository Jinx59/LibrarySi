export interface IAbsenceModel extends Document {
    collabId: string;
    commentary: string;
    rejectionText: string;
    endDate: Date;
    eventDate: Date;
    reason: string;
    requestId: string;
    startDate: Date;
    status: string;
    type: string;
    nbDays: number
  }