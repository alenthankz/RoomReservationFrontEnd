export class Booking {
    constructor(
       public bookingid:number,public _id:number,public name:string, public username:string,public dob:string,public phNum:number,
       public proofType:string,public proofValue:string,public fromDate:string,
       public toDate:string,public typeOfRoom:string,public noBeds:number,public totalCost:number
   ){}
}

