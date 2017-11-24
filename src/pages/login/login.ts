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
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private userForm: FormGroup;
  private recordPassword: boolean;

  constructor(private navCtrl:NavController,private menu:MenuController,private utils:UtilsServices,private events:Events,private formBuilder:FormBuilder,private rest:RestServices) {
    this.menu.swipeEnable(false);
    this.initFormBuilderUser();
  }

  private initFormBuilderUser():void{
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      recordPassword: [false,null]
    });
  }

  public onLogin():void{
    let progress = this.utils.processing(Messages.USER_PROGRESS,Constant.SPINNER_CIRCLES);
    progress.present().then(()=>{
      this.rest.login(this.userForm.value).then(()=>{
        progress.dismiss();
        this.events.publish(Constant.EVENTS_USER_LOGGED,this.userForm.value.email);
        this.navCtrl.setRoot('HomePage',{username:this.userForm.value.email});
      }).catch(err=>{
        progress.dismiss();
        this.utils.handleException(err,Messages.LOGIN,Messages.LOGIN_ERR);
      });
    });
  }

  public onRegistry():void{
    this.navCtrl.setRoot('RegisterPage');
  }

  public onRecoverPassword():void{
    this.navCtrl.push('RecoverPasswordPage');
  }

  public onRecordPassword():void{
    console.log('change recordPassword, update....',this.userForm.get('recordPassword').value);
  }

}
