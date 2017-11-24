import { Injectable } from '@angular/core';
import {App, AlertController, ModalController, LoadingController, Modal, Loading, Alert, ToastController, Toast, ActionSheetController, ActionSheet, Platform } from 'ionic-angular';
import { Constant } from '../config/Constant';
import { Messages } from '../config/Messages';
import { TimeOut } from '../models/TimeOut';

@Injectable()
export class UtilsServices {
  
  constructor(private app:App,private alertCtrl:AlertController,private modalCtrl:ModalController,private loadingCtrl:LoadingController,private toast:ToastController,private actionsheetCtrl:ActionSheetController,private platform:Platform){}
  
  /** Permite crear un modal para una pÃ¡gina */
  public crearModal(pagina:string,params:any):Modal{
    return this.modalCtrl.create(pagina,params);
  }

  /** Permite crear la barra de progreso */
  public processing(mensaje:string,tipoSpinner:string):Loading{
    return this.loadingCtrl.create({
      content: mensaje,
      spinner:tipoSpinner
    });
  }

  /** Permite crear un alert sin evento (muestra boton aceptar) */
  public createNotificationAlert(titulo:string,mensaje:string):Alert{
    return this.alertCtrl.create({
      title: titulo,
      message: mensaje
    });
  }

  /** Permite crear un alert generico */
  public createAlert(titulo:string,mensaje:string,options?: Array<{text:string,handler:any}>):Alert{
    let alert =  this.alertCtrl.create({
      title: titulo,
      message: mensaje,
      buttons:options
    });
    return alert;
  }

  /** Permite crear un toast , se situa en la parte inferior (bottom) */
  public createAcceptToast(mensaje:string):Toast{
    return this.toast.create({
      message: mensaje,
      position: Constant.POSITION_BOTTOM_TOAST,
      showCloseButton: true,
      closeButtonText: Messages.ACCEPT
    });
  }

  /** Permite crear un toast, con una duracion determinada */
  public createToast(mensaje:string,duracion:number):Toast{
    return this.toast.create({
      message:mensaje,
      position:Constant.POSITION_BOTTOM_TOAST,
      duration:duracion
    });
  }

  /** Permite crear un menu de acciones, para luego agregar los buttons con eventos */
  public createActionSheet(titulo:string):ActionSheet{
    return this.actionsheetCtrl.create({
      title: titulo,
      cssClass: Constant.ACTION_SHEET_CSS_DEFAULT,
    });
  }
  
  /** Permite guardar keys en el localStorage, solo para datos chicos  */
  public getKeyLocalStorage(key:string):string{
    return localStorage.getItem(key);
  }

  /** Permite obtener keys en el localStorage, solo para datos chicos  */
  public setKeyLocalStorage(key:string,val:string):void{
    localStorage.setItem(key,val);
  }

  /** Permite verificar que plataforma es , si es un iOS o un Android */
  public checkPlatform(sistemaOperativo:string):boolean{
    return this.platform.is(sistemaOperativo);
  }

   /** Permite manejar las excepciones , si es timeout , si hubo error al actualizar un refresh vencido , error recibido por parametro...*/
   public handleException(err:any,tituloError:string,mensajeError:string):void{
    if(err instanceof TimeOut){
      this.createNotificationAlert(Messages.NOTIFICATION,err.mensaje).present();
      return;
    }
    if(err.error && err.newAccessToken == null){
      this.deleteDeviceTokens().then(()=>this.showNotificationAndRedirectToLogin()).catch(err=>null);
      return;
    }
    this.createNotificationAlert(tituloError,mensajeError).present();
  }

  private deleteDeviceTokens():Promise<any>{
    return Promise.resolve();
    //return new Promise((resolve,reject)=>this.secureDataServices.removeProperty(Constant.KEY_REFRESH_TOKEN).then(()=>this.secureDataServices.removeProperty(Constant.KEY_ACCESS_TOKEN).then(()=>resolve()).catch(()=>reject())).catch(()=>reject()));
  }

  private showNotificationAndRedirectToLogin():void{
    let alert : Alert = this.createAlert(Messages.NOTIFICATION,Messages.INVALID_SESSION);
    alert.addButton({
    text: Messages.ACCEPT,
      handler: ()=> this.app.getRootNav().setRoot('LoginPage')
    });
    alert.present();
  }
  
}
