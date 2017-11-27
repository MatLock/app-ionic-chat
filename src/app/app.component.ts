import { Component,ViewChild } from '@angular/core';
import { Platform,Nav,ViewController,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Constant } from '../config/Constant';
import { User } from '../models/User';
import { Pages } from '../config/Pages';
import { FCM } from '@ionic-native/fcm';


@Component({
  templateUrl: 'app.html'
})
export class DenunciaApp {

  @ViewChild(Nav)
  private nav: Nav;
  private rootPage: string;
  private activePage: string;
  private pages: Array<Pages> = Pages.initPages();
  private loggedUser : User = new User();

  constructor(private fcm:FCM,private platform:Platform,private statusBar:StatusBar,private splashScreen:SplashScreen,private events:Events){
    this.initApp();
    this.initFCM();
    this.onUserLogin();
  }

  private async initApp(){
    await this.platform.ready();
    this.statusBar.styleDefault();
    this.splashScreen.hide();  
    this.rootPage = 'LoginPage';
    this.activePage = 'LoginPage';
  }

  private initFCM(){
    this.platform.ready().then( _ => {
      this.fcm.subscribeToTopic('topicExample');
      this.fcm.getToken().then(token=>{
        console.log("TOKEN");
        console.log(token);
      });
      this.fcm.onTokenRefresh().subscribe( token =>{
        console.log(token);
      });
      this.fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
          console.log(data.message);
          console.log("Received in background");
        } else {
          console.log(data.message);
          console.log("Received in foreground");
        };
      });
    });
  }

  public openPage(page:Pages):void{
    let views : Array<ViewController> = this.nav.getViews();
    let namesViews : Array<string> = views.map(view=>view.name);
    if(namesViews.indexOf(page.name) === -1){
      this.nav.push(page.name);
    }
    let position = namesViews.indexOf(page.name);
    if(position !== -1 && position !== namesViews.length - 1){
      this.nav.remove(position);
      this.nav.push(page.name);
    }
    this.activePage = page.name;
  }

  public onUserLogin():void{
    this.events.subscribe(Constant.EVENTS_USER_LOGGED,username=>{
      this.loggedUser.username = username.toUpperCase();
    });
  }

  public onLogout():void{
      this.nav.setRoot('LoginPage');
  }

}
