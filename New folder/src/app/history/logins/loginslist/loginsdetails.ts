/* Model class for login history */
export class Loginsdetails {
  public enterpriseName: string;
  public enterprise: Enterprise;
  public userAccount: string;
  public OS: string;
  public ipAddress: string;
  public deviceAddress: string;
  public enterpriseID: string;
  public fleetAssetId: string;
  public userId: string;
  public notes: string;
  public deviceType: string;
  public deviceId: string;
  public macAddress: string;
  public browserName: string;
  public browserVersion: string;
  public loginTime: string;
  public logoutTime: string;
  public remarks: string;
  public createdBy: string;
  public createdAt: string;
  public updatedBy: string;
  public updatedAt: string;
  public callTo: any;
  public callType: string;
  public callFrom: any;
  public callDuration: string;
}
export class Enterprise {
   public enterpriseName: string;
   public enterprise: string;
}
