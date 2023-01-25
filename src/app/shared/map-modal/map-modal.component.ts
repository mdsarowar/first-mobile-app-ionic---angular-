import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { rejects } from 'assert';
import { resolve } from 'dns';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit ,AfterViewInit{
 @ViewChild('map')
  mapElementRef!: ElementRef;
  constructor( private modalCtrl:ModalController,private rendere:Renderer2) { }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getGoogleMaps().then(googleMaps=>{
      const mapel=this.mapElementRef.nativeElement;
     const map= new googleMaps.Map(mapel,{
        center:{lat:-34.397,lng:150.644},
        zoom:16
      });
      googleMaps.event.addListenerOnce(map,'idle',()=>{
        this.rendere.addClass(mapel,'visible');

      })
    }).catch(err=>{
      console.log(err);
    })
  }

  onCancel(){
    this.modalCtrl.dismiss();

  }

  private getGoogleMaps(): Promise<any> {
    const win=window as any;
    const googleModule=win.google;
    if(googleModule && googleModule.maps){
      return Promise.resolve(googleModule.maps);

    }
    return new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src=''
      script.async=true;
      script.defer=true;
      document.body.appendChild(script);
      script.onload=()=>{
        const locadedGoogleModule=win.google;
        if(locadedGoogleModule && locadedGoogleModule.maps){
          resolve(locadedGoogleModule.maps);
        }else{
          reject('google maps sdk not aailable.')
        }
      }
    })
  }

}
