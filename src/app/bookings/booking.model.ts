export class Booking{
  constructor(
    public id:string,
    public placeId:string,
    public userId:string,
    public placeTitle:string,
    public placeImage:string,
    public firstName:string,
    public lastName:string,
    public gusetNumber:number,
    dateFrom:Date,
    dateTo:Date
  ){  }
}
