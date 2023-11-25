declare global {
  export type Roles = {
    superAdmin: string
    doctor: string 
    medChief: string
    patient : string
  };
 
  export type UserStatus = 'approval' | 'pending' | 'notapproval';

  export type SortByType = 'ASC' | 'DESC' | null;
 
}

export {};
