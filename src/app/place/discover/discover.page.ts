import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController, SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Place } from '../place.model';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit,OnDestroy {
  loadPlaces!:Place[];
  listedLodedPlaces!:Place[];
  private placeSub!:Subscription;
  relevantPlaces!:Place[];
  isLoading=false;
  $ev:any


  constructor(
    private placesService:PlaceService,
    private authService:AuthService,
    private menuCtrl:MenuController

    ) { }

  ngOnInit() {
   this.placeSub= this.placesService.allPlaces.subscribe(places=>{
      this.loadPlaces=places;
      this.relevantPlaces=this.loadPlaces;

      this.listedLodedPlaces=this.loadPlaces.slice(1);
    });
  }

  onOpenMenu(){
    this.menuCtrl.toggle();
  }

  ionViewWillEnter(){
    console.log('is loading false'+ this.isLoading);
    this.isLoading=true;
    this.placesService.fetchPlaces().subscribe(()=>{
      this.isLoading=false;
    });
  }

  onFilterUpdate(ev:CustomEvent<SegmentChangeEventDetail>){
    if(ev.detail.value=='all'){
      this.relevantPlaces=this.loadPlaces;
      this.listedLodedPlaces=this.relevantPlaces.slice(1);
    }else{
      this.relevantPlaces=this.loadPlaces.filter(
        place=>place.userId!==this.authService.userId
      );
      this.listedLodedPlaces=this.relevantPlaces.slice(1)
    }

  }
  ngOnDestroy(): void {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }

}
