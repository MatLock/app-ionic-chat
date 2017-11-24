import { Component, NgZone } from '@angular/core';
import { NavController,NavParams,IonicPage } from 'ionic-angular';
import { ChatPage } from '../chat/chat';


@Component({
  selector: 'home-chat',
  templateUrl: 'home-chat.html'
})
@IonicPage()
export class HomeChatPage {


  private channels:string[];
  private newChannel:string;

  constructor(private navCtrl:NavController, private navParams: NavParams){
     let myChannels = localStorage.getItem('channels');
     if(myChannels){
       this.channels = JSON.parse(localStorage.getItem('channels'));
      }else{
        this.channels = ['/chat'];
     }
  }


  public addChannel(){

    if(this.newChannel && this.newChannel != '' && !this.channels.some( c => c === this.newChannel)){
      this.channels.push(this.newChannel);
      localStorage.setItem('channels',JSON.stringify(this.channels));
      this.newChannel = '';
    }
  }

  public onSelectChannel(channel :string):void{
    this.navCtrl.push('ChatPage',{username:this.navParams.get('username'),channel:channel});
  }


}
