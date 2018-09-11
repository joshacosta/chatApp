import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { Reference } from '@firebase/database-types';


@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {
  public users: Array<any>;
  public userListRef: Reference;
  public groupRef: Reference;
  public members = [];
  public groupName: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userListRef = firebase
          .database()
          .ref(`/userProfile`);
  }

  ionViewDidLoad() {
     this.userListRef.on('value', usersListSnapshot => {
      this.users= [];
      usersListSnapshot.forEach(snap => {
        this.users.push({
          id: snap.key,
          name: snap.val().firstName
        });
        return false;
      });
    });
    
  }

  sendToDB(){
    if(this.groupName == "" || this.members.length == 0){
      alert("Enter a valid input.");
      return;
    }

    this.navCtrl.pop().then(contine => {
      this.groupRef = firebase.database().ref(`/GroupChats/`);

      return this.groupRef.push({
       groupName: this.groupName,
        members: this.members
       });
    });
  }


}
