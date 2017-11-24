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
  selector: 'profile-page',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  private userData: FormGroup;
  public edit : boolean = false;
  constructor(private navCtrl:NavController,private menu:MenuController,private utils:UtilsServices,private events:Events,private formBuilder:FormBuilder,private rest:RestServices) {
    this.initFormBuilderUser();
  }

  private initFormBuilderUser():void{
    this.userData = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      dni:['',Validators.required],
      cel:['',Validators.required],
      tasaMunicipal:['',Validators.required]
    });
  }


  public onEditProfile():void{
    let progress = this.utils.processing(Messages.USER_PROGRESS_CREATE,Constant.SPINNER_CIRCLES);
      progress.present().then(()=>{
      //this.rest.editProfile(this.userData.value).then(() =>{
        progress.dismiss();
      }).catch(err=>{
        progress.dismiss();
        this.utils.handleException(err,Messages.CREATE,Messages.CREATE_ERR);
      });
    //});
  }

  public enableEdition():void{
    this.edit = true;
  }

}