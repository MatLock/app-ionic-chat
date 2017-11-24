import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'welcome-page',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(private navCtrl:NavController){}

  public createImpeachment():void{
    this.navCtrl.push('ImpeachmentPage');
  }

}
