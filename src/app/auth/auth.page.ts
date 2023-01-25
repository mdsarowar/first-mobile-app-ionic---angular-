import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
isLoading=false;
islogin=true;
  constructor(
    private authService:AuthService,
    private router:Router,
    private loadingCtrl:LoadingController
    ) { }
  onLogin(){
    this.isLoading=true;
    this.authService.login();
    this.loadingCtrl.create({keyboardClose:true,message:'Logging in ...'})
    .then(loadingEl=>{
      loadingEl.present();
      setTimeout(()=>{
        this.isLoading=false;
        loadingEl.dismiss();
        this.router.navigateByUrl('/place/tabs/discover');
      },1500);
    })




  }
  onSubmit(from:NgForm){
    if(!from.valid){
      return;
    }
    const email=from.value.email;
    const pass=from.value.password;
    this.router.navigateByUrl('/place/tabs/discover');
  }

  onSwitch(){
    this.islogin=!this.islogin
  }

  ngOnInit() {
  }

}
