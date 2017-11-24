import { Component,ViewChild } from '@angular/core';
import { IonicPage,Tabs, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('tab') tabRef: Tabs;
  private username:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = navParams.get('username');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }


}
