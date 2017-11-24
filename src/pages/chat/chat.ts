import { Component,ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController, NavParams,IonicPage,Content  } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';



@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
@IonicPage()
export class ChatPage {
 
  private username:string;
  private message:string = '';
  private messages:Object[] = [];
  private channelUsed:string;
  @ViewChild('content') content: Content; 

  constructor(private db: AngularFireDatabase,private navCtrl: NavController, private navParams: NavParams) {    
    this.username = this.navParams.get('username');
    this.channelUsed = navParams.get('channel');
  }
  
  public ionViewDidLoad():void{
    this.db.list(this.channelUsed).valueChanges().subscribe( data =>{
      this.messages = data;;
      this.content.scrollToBottom(300);
    });
  }
  public ionViewDidEnter():void{
    this.content.scrollToBottom(300);
  }
  // asi se actualiza un registro
  // this.db.list(this.channelUsed).update('-KziF0cC3xOkh4BUTb99',{username:this.username,msg:"nuevo mensaje"});
 public send():void{
   this.db.list(this.channelUsed).push({
     username:this.username,
     msg: this.message
   }).then( obj => {
     this.message = '';
     this.content.scrollToBottom(300);
    });
 }

}
