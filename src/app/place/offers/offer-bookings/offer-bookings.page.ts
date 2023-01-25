import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../../place.model';
import { PlaceService } from '../../place.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit ,OnDestroy{
  place!: Place;
  loadplace: any;
  private placesSub!:Subscription;

  constructor(
    private route:ActivatedRoute,
    private navCtrl:NavController,
    private placeService:PlaceService

    ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(p=>{
      if(!p.has('booking_offer')){
        this.navCtrl.navigateBack('/place/tabs/offers');
        // console.log('paramap has');
        return;
      }

      const placeid:any=p.get('booking_offer');
         this.placesSub= this.placeService.Placeid(placeid).subscribe(placs=>{
        this.loadplace=placs;
      });

    })
  }

  ngOnDestroy(): void {
    if(this.placesSub){
      this.placesSub.unsubscribe();
    }
  }

}
