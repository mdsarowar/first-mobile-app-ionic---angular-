import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlaceService } from '../../place.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit ,OnDestroy{
  loadPlace: any;
  placeis!:Place[];
  private placeSub!:Subscription;
  isLoading=false;
  isBookable=false;

  constructor(
    private router:Router,
    private navCtrl:NavController,
    private activateRoute:ActivatedRoute,
    private placeService:PlaceService,
    private modalctrl:ModalController,
    private actionSheetCtrl:ActionSheetController,
    private authService:AuthService,
    private alertCtrl:AlertController
    ) { }

  ngOnInit() {
    console.log('this is details page');
    // console.log(id);
    this.activateRoute.paramMap.subscribe(paramap=>{
      if(!paramap.has('placeId')){
        this.navCtrl.navigateBack('/place/tabs/discover');
        return;
      }
      this.isLoading=true;
      const placesid:any=paramap.get('placeId');
      this.placeSub= this.placeService.Placeid(placesid).subscribe(places=>{
        this.loadPlace=places;
        this.isBookable=places.userId == this.authService.userId;
        this.isLoading=false;
      },error=>{
        this.alertCtrl.create({
          header:'An error ocurred',
          message:'could not load place.',
          buttons:[{text:'okey',handler:()=>{
            this.router.navigate(['/place/tabs/discover']);
          }}]
        }).then(alertEl=>alertEl.present())

      });
      // console.log('this is place details');
      // console.log(this.placeService);


    })
  }

  onBookPlace(){
    // this.router.navigateByUrl('/place/tabs/discover');
    this.actionSheetCtrl.create({
      header:'choose an action',
      buttons:[
        {
          text:'Select DAte',
          handler:()=>{
            this.openBookingModal('select')
          }
        },
        {
          text:'Random Date',
          handler:()=>{
            this.openBookingModal('random')
          }
        },
        {
          text:'cancel',
          role:'distructive'
        }
      ]
    }).then(actionSheetEl=>{
      actionSheetEl.present();
    });

  }
  openBookingModal(mode:'select'|'random'){
    console.log(mode);
    this.modalctrl.create({
      component:CreateBookingComponent,
      componentProps:{selectplace:this.loadPlace}
    })
    .then(modalEl=>{
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData=>{
      console.log(resultData,resultData.role);
      if(resultData.role=='confilrm'){
        console.log('booked');
      }
    })
  }

  ngOnDestroy(): void {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }

}
