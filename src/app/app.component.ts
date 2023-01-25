import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plugin, Capacitor, Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(
    private platform:Platform,

    private authservice:AuthService,
    private router:Router
  ) {
    this.initializeApp();

  }
  initializeApp(){
    // console.log(this.platform.is('hybrid'));
    this.platform.ready().then(()=>{
      if(Capacitor.isPluginAvailable('SplashScreen')){
        Plugins['SplashScreen']['hide']();
      }

    })

  }
  onlogutbtn(){
    this.authservice.logout();
    this.router.navigateByUrl('/auth');


  }

}

