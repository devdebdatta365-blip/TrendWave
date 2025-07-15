// export class User {
//     userId?: number;
//     email: string;
//     password: string;
//     username: string;
//     mobileNumber: string;
//     userRole: string;
//     }
    
export class User {
    constructor(
      public email: string,
      public password: string,
      public userName: string,
      public mobileNumber: string,
      public userRole: string
    ) {}
  }
  