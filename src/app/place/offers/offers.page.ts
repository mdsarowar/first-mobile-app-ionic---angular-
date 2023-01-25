import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlaceService } from '../place.service';
import { OfferModel } from './offer.model';
import { OffersService } from './offers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit ,OnDestroy{

  // offers!:OfferModel[];
  offers!: Place[];
  private placesSub!:Subscription
  isloading=false;

  constructor(
    private offerService:OffersService,
    private placeService:PlaceService,
    private router:Router
    ) { }

  ngOnInit() {
    // this.offers=this.offerService.alloffers;
    // this.places=this.placeService.allPlaces;
   this.placesSub= this.placeService.allPlaces.subscribe(places=>{
    this.offers=places;
   })
  }

  ionViewWillEnter(){
    this.isloading=true;
    this.placeService.fetchPlaces().subscribe(()=>{
      this.isloading=false
    });

  }


  onEdit(offerId:string,slidingItem:IonItemSliding){
    // console.log('here is',offerId);
    slidingItem.close();
    // this.router.navigate(['/','place','tabs','offers',offerId]);
    this.router.navigate(['/','place','tabs','offers','edit',offerId]);


  }

  ngOnDestroy(): void {
    if(this.placesSub){
      this.placesSub.unsubscribe();
    }
  }

}
