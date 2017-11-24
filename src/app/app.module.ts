import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DenunciaApp } from './app.component';

import { HttpModule } from '@angular/http';
import { EnvironmentsModule } from './environment-variables/environment-variables.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera'
import { Geolocation } from '@ionic-native/geolocation';

import { RestServices } from '../providers/rest-services';
import { UtilsServices } from '../providers/utils-services';


const config = {
  apiKey: "AIzaSyDVFYrETy1bx3UZIcK8cWZLzIvbg4StoEU",
  authDomain: "botonalerta.firebaseapp.com",
  databaseURL: "https://botonalerta.firebaseio.com",
  projectId: "botonalerta",
  storageBucket: "botonalerta.appspot.com",
  messagingSenderId: "912864399805"
};


@NgModule({
  declarations: [
    DenunciaApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    EnvironmentsModule,
    IonicModule.forRoot(DenunciaApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DenunciaApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestServices,
    UtilsServices
  ]
})
export class AppModule {}
