export class Agent {
    constructor(
      public id: string,
      public name: string,
      public username: string,
      public dob: string,
      public phNum: number,
      public proofType: string,
      public proofValue: string,
      public admin:boolean,
      private _token: string,
      private _tokenExpirationDate: Date
    ) {}
  
    get token() {
      if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
        return null;
      }
      return this._token;
    }
}