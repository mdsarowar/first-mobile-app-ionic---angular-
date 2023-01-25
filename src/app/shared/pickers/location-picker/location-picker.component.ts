import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Plugins,Capacitor } from '@capacitor/core';
// import { Plugins } from '@capacitor/core/types/global';
// import { Capacitor, Plugins } from '@capacitor/core/types/global';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {

  selectedLocationImage:any

  constructor(private modalCtrl:ModalController,
    private http:HttpClient,
    private actionSheetCtrl:ActionSheetController,
    private alertCtrl:AlertController
    ) { }

  ngOnInit() {}

  onPickLocation(){
    this.actionSheetCtrl.create({header:'please choose',buttons:[
      {text:'auto-locate', handler:()=> {
        this.locateUser();
      }},
      {text:'pick on map', handler:()=> {}},
      {text:'cancel', role:'cancel'},
    ]}).then(actionSheetEl=>{
      actionSheetEl.present();
    })
    this.modalCtrl.create({component:MapModalComponent}).then(modalEl=>{
      modalEl.present();
    })

  }

  locateUser(){
    if(!Capacitor.isPluginAvailable('Geolocation')){
      this.alertCtrl.create({header:'could not fatch lOcation0',
    message:'please use the map to pick a location!'
  });
      return ;
    }
    Plugins['Geolocation']['getCurrentPosition']().then((geoPosition: any)=>{
      // const coordinates:Coordinates={lat:geoPosition.coords.latitude,lang:geoPosition.coords.longitude}

    }
    ).catch((err: any)=>{
      this.showErrorAlert();
    })
  }

  private showErrorAlert(){
    this.alertCtrl.create({
      header:'could not fetch location',
      message:'please use the map to pick a lcocation ',
      buttons:['okay']
    })
  }

}
