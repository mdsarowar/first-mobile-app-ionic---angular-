import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlaceService } from '../../place.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  form!:FormGroup;
  constructor(private placesService:PlaceService,private router:Router) { }

  ngOnInit() {
    this.form=new FormGroup({
      title:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      description:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required,Validators.maxLength(150)]
      }),
      price:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required,Validators.min(1)]
      }),
      dateFrom:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      dateTo:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      })

    });
  }
  onCreateOffer(){
    console.log('hoy ni');
    if(!this.form.valid){
      console.log('not valid');
      return;
    }
    this.placesService.addPlace(
      this.form.value.title,
      this.form.value.description,
      +this.form.value.price,
     new Date( this.form.value.dateFrom),
      new Date( this.form.value.dateTo)
      )
      .subscribe(()=>{
        // HTMLIonLoadingElement.dismiss();
        this.form.reset();
        this.router.navigate(['/place/tabs/offers']);
      });

  }

}
