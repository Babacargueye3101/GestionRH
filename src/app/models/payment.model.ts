export class Payment {
    constructor(
      public id: number,
      public employeeId: number,
      public paymentDate: Date,
      public amount: number,
      public paymentMethod: string,
      public referenceNumber: string,
      public status: string
    ) {}
}
