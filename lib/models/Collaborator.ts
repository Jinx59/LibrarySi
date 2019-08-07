/**
 * represents Collaborators base information
 */
export interface ICollaborator {
    active: boolean;
    address: IAddress;
    birthdate: Date;
    client: string;
    collabId: string;
    commentary: string;
    company: string;
    contact: IContact;
    contract_type: string;
    dependent_children: number;
    entrydate: Date;
    leavingdate: Date;
    family_status: string;
    gender: string;
    health_mutual: boolean;
    health_mutual_option: boolean;
    identifiant: string;
    job: string;
    last_interview_RH: Date;
    matricule: String;
    medical_check: Date;
    next_medical_check: Date;
    managerRH: string;
    name: string;
    nationality: string;
    picture: string;
    restaurant_ticket: boolean;
    qualification: string;
    ss_number: string;
    surname: string;
    transport: Transport;
  
  }
  
  /**
   * Represents address of collaborator
   */
  export interface IAddress {
    city: string;
    complement: string;
    country: string;
    nbr: string;
    street_name: string;
    zip_code: string;
  }
  
  /**
   * Transport information
   */
  export interface ITransport {
    card_number: string;
    public_transport: boolean;
  }
  
  /**
   * Contact information
   */
  export interface IContact {
    perso: IPrivate;
    professional: IProfessional;
    urgency: IUrgency;
  }
  
  /**
   * Private contact Information
   */
  export interface IPrivate {
    mail: string;
    mobile: string;
    phone: string;
  }
  
  /**
   * Urgency contact Information
   */
  export interface IUrgency {
    phone: string;
    urgency: string;
  }
  
  /**
   * Professional contact information
   */
  export interface IProfessional {
    mail: string;
    phone: string;
  }