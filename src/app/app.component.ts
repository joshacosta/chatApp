import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyAFZV5dZr2Dxg85J9SbtVd9sANbDG4TilY",
      authDomain: "chatapp-2f0f3.firebaseapp.com",
      databaseURL: "https://chatapp-2f0f3.firebaseio.com",
      projectId: "chatapp-2f0f3",
      storageBucket: "chatapp-2f0f3.appspot.com",
      messagingSenderId: "79058875845"
    });

    
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user){
        this.rootPage = 'LoginPage';
        unsubscribe();
      } else {
        this.rootPage = 'HomePage';
        unsubscribe();
      }
    });

    platform.ready().then(() => {
  
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

