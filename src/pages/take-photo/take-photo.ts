import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, Events } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { VerboseHTTP } from '../../config/VerboseHTTP';
import { RestServices } from '../../providers/rest-services';
import { Endpoint } from '../../config/Endpoint';
import { Messages } from '../../config/Messages';
import { Constant} from '../../config/Constant';
import { UtilsServices } from '../../providers/utils-services';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'take-photo',
  templateUrl: 'take-photo.html'
})
export class TakePhotoPage {

  private image: string = null;
  private options: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
    targetWidth: 1000,
    targetHeight: 1000,
    quality: 100
  }
  constructor(private navCtrl:NavController,private rest:RestServices, private camera: Camera) {}


  takePicture(){
    this.camera.getPicture( this.options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
    });
  }



}