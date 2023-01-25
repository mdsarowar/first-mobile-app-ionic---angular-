export class OfferModel{
  constructor(
    public id:string,
    public title:string,
    public old_price:number,
    public new_price:number,
    public imgUrl:string,
    public description:string
  ){}
}
