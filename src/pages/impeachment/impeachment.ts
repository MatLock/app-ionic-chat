import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Message } from '../../models/Message';

@IonicPage()
@Component({
  selector: 'page-impeachment',
  templateUrl: 'impeachment.html'
})
export class ImpeachmentPage {

  private username:string;
  constructor(private geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams) {
    this.username = this.navParams.get('username');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImpeachmentPage');
  }

  private getCoors():Promise<any>{
    return this.geolocation.getCurrentPosition(); 
  }


  public sendAlert(type:string):void{
    this.getCoors().then( (resp) => {    
      let message: Message = new Message(this.username,new Date(),resp.coords.latitude,resp.coords.longitude);
      console.log(message);
    }).catch((error) => {
       alert('Error getting location');
    });
  }


}
