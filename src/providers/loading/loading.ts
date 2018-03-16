import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingProvider {

  loading;

  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
    console.log('Hello LoadingProvider Provider');
  }

  startLoad(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    this.loading.present();
  }

  endLoad(){
    this.loading.dismiss();
  }
}