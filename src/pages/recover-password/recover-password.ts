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
  selector: 'recover-page',
  templateUrl: 'recover-password.html'
})
export class RecoverPasswordPage {

  private email:string;

  constructor(private navCtrl:NavController,private menu:MenuController,private utils:UtilsServices,private rest:RestServices) {
    this.menu.swipeEnable(false);
  }

  public onRecoverPassword():void{
    let progress = this.utils.processing(Messages.RECOVER_PASS_PROGRESS,Constant.SPINNER_CIRCLES);
    let options = [{text:Messages.ACCEPT,handler: () => this.navCtrl.setRoot('LoginPage')}];
    let confirmation = this.utils.createAlert(Messages.RECOVER_PASS,Messages.RECOVER_PASS_SUCCESS,options);
    progress.present().then(()=>{
      console.log(this.email);
      /*this.rest.recoverPassword(this.userData.value).then(() =>{*/
      progress.dismiss();
      confirmation.present()
      }).catch(err=>{
        progress.dismiss();
        this.utils.handleException(err,Messages.RECOVER_PASS,Messages.RECOVER_PASS_ERR);
      });
    //};
  }

}