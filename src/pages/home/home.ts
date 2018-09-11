import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Reference } from '@firebase/database-types';
import firebase from 'firebase';
import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public groupListRef: Reference;
  public groups: Array<any>;
  public user: string;
  public members: Array<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public profile: ProfileProvider) {
    this.groupListRef = firebase
          .database()
          .ref(`/GroupChats`);
  }

  ionViewDidLoad() {
    this.profile.getUserProfile().on('value', userProfileSnapshot => {
      this.user = userProfileSnapshot.val().firstName;
    });

    this.groupListRef.on('value', usersListSnapshot => {
      this.groups= [];
      usersListSnapshot.forEach(snap => {
        this.groups.push({
          id: snap.key,
          groupName: snap.val().groupName,
          members: snap.val().members
        });
        return false;
      });
    });
  }

  goToCreateGroup(){
    this.navCtrl.push('CreatePage');
  }

  goToChatRoom(groupId: string, groupName: string,members: Array<any>){
    this.navCtrl.push('ChatRoomPage', {groupId: groupId, groupName: groupName, members: members});
  }

  goToProfile(){
    this.navCtrl.push('ProfilePage');
  }

}
