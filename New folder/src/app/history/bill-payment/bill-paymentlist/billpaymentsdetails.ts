/* Model class for login history */
export class Billpaymentsdetails {
  public enterpriseId: string;
  public enterpriseName: string;
  public billPeriodType: string;
  public billPeriodStartDate: string;
  public billPeriodEndDate: string;
  public billPeriodDuration: string;
  public billPaymentStatus: string;
  public invoiceNumber: string;
  public invoiceDate: string;
  public amountDue: string;
  public addressLine1: string;
  public addressLine2: string;
  public city: string;
  public state: string;
  public ZIP: string;
  public country: string;
  public amountPaid: string;
  public paidDate: string;
  public paidByCreditCartAuthorizationNumber: string;
  public nameOnCreditCard: string;
  public creditCardType: string;
  public creditCardNumber: string;
  public creditCardExpiryDate: string;
  public notes: string;
  public createdAt: any;
  public createdBy: any;
  public updatedAt: any;
  public updatedBy: any;
}
export class Enterprise {
   public enterpriseName: string;
   public enterprise: string;
}
