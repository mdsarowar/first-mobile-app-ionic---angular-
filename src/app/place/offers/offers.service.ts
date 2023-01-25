import { Injectable } from '@angular/core';
import { OfferModel } from './offer.model';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private _offer:OfferModel[]=[
    new OfferModel(
      'o1',
      'offer first demo',
      150,
      140,
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
      'This is first offer place.'
    ),
    new OfferModel(
      'o2',
      'offer first demo',
      150,
      140,
      'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_960_720.jpg',
      'This is first offer place.'
    ),
    new OfferModel(
      'o3',
      'offer first demo',
      150,
      140,
      'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg',
      'This is first offer place.'
    )

  ]

 get alloffers(){
    return[...this._offer]
  }

  constructor() { }
}
