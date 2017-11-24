import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, Events } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { VerboseHTTP } from '../../config/VerboseHTTP';
import { RestServices } from '../../providers/rest-services';
import { Endpoint } from '../../config/Endpoint';
import { Messages } from '../../config/Messages';
import { Constant} from '../../config/Constant';
import { UtilsServices } from '../../providers/utils-services';

@IonicPage()
@Component({
  selector: 'register-page',
  templateUrl: 'register.html'
})
export class RegisterPage {

  private userData: FormGroup;
  constructor(private navCtrl:NavController,private menu:MenuController,private utils:UtilsServices,private events:Events,private formBuilder:FormBuilder,private rest:RestServices) {
    this.menu.swipeEnable(false);
    this.initFormBuilderUser();
  }

  private initFormBuilderUser():void{
    this.userData = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      dni:['',Validators.required]
    });
  }


  public onRegistry():void{
    let progress = this.utils.processing(Messages.USER_PROGRESS_CREATE,Constant.SPINNER_CIRCLES);
      progress.present().then(()=>{
      //this.rest.register(this.userData.value).then(() =>{
        progress.dismiss();
        this.events.publish(Constant.EVENTS_USER_LOGGED,this.userData.get('user').value);
        this.navCtrl.setRoot('WelcomePage');
      }).catch(err=>{
        progress.dismiss();
        this.utils.handleException(err,Messages.CREATE,Messages.CREATE_ERR);
      });
    //});
  }

}