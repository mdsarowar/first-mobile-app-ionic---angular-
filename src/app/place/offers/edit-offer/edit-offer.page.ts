import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../../place.model';
import { PlaceService } from '../../place.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit,OnDestroy {

  placeId!:any;
  form!:FormGroup;
  loadPlace: any;
  // place!:Place;
  isLoading=false;
  private placeSub!:Subscription;


  constructor(
    private route:ActivatedRoute,
    private placeservice:PlaceService,
    private navCtrl:NavController,
    private router:Router,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController
  ) { }

  ngOnInit() {
    // console.log('not to get peramap');
    this.route.paramMap.subscribe(p=>{
      // console.log('paramap get');
      if(!p.has('offerId')){
        // console.log('not dei ni');
        this.navCtrl.navigateBack('/place/tabs/offers')
        return;
      }
      this.placeId=p.get('offerId');
      this.isLoading=true;
     const placeid:any=p.get('offerId')
     this.placeSub= this.placeservice.Placeid(placeid).subscribe(place=>{
        this.loadPlace=place
        this.form=new FormGroup({
          title:new FormControl(this.loadPlace.title,{
            updateOn:'blur',
            validators:[Validators.required]
          }),
          description:new FormControl(this.loadPlace.description,{
            updateOn:'blur',
            validators:[Validators.required,Validators.maxLength(180)]
          })

        });
        this.isLoading=false;
      },error=>{
        this.alertCtrl.create({
          header:'An error occurred!',
          message:'pleace could not be fetched. Please try again later.',
          buttons:[{text:'okey',handler:()=>{
            this.router.navigate(['/place/tabs/offers']);
          }}]
        }).then(alertEl=>{
          alertEl.present();
        })

      }
            );
      // console.log(this.loadPlace);

    })
  }

  onUpdateOffer(){
    console.log('updateing process start');
    if(!this.form.valid){
      console.log('update form is invalid');
      return
    }
    console.log('update form is valid');
    this.loadingCtrl.create({
      message:'updating Place....'
    }).then(loadingEl=>{
      loadingEl.present();
      console.log('loading el .......');
      this.placeservice.updatePlace(this.loadPlace.id,
        this.form.value.title,
        this.form.value.description
        ).subscribe(()=>{
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/place/tabs/offers']);
        });
    })

  }

  ngOnDestroy(): void {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }

}
