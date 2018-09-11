import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Reference } from '@firebase/database-types';
import firebase from "firebase";
import { ProfileProvider } from '../../providers/profile/profile';
import { AlertController } from 'ionic-angular'


/**
 * Generated class for the ChatRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {

  public user: string;
  public userId: string;
  public from: string = 'josh';
  groupId: string;
  public currentChat:Reference;
  public currentChatNode: Reference;
  public userListRef: Reference;
  public currentUser: string ;
  public newMsg: string;
  public messages: Array<any>;
  public groupMembers: Array<any>;
  public groupName: string;
  public memberList: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public profile: ProfileProvider, public alertCtrl: AlertController) {
    this.groupId = navParams.get('groupId');
    this.groupName = navParams.get('groupName');
    this.groupMembers = navParams.get('members');

    for(var i = 0; i<this.groupMembers.length;i++){
      this.memberList+= "◦  "+this.groupMembers[i] +"<br>";
    }
   

    this.currentChat = firebase
          .database()
          .ref(`/GroupChats/${this.groupId}/messages`);
    this.currentChatNode = firebase
          .database()
          .ref(`/GroupChats/${this.groupId}`);

  

    this.profile.getUserProfile().on('value', userProfileSnapshot => {
      this.user = userProfileSnapshot.val().firstName;
    });

    
  }

  ionViewDidLoad() {
    this.currentChat.on('value', usersListSnapshot => {
      this.messages= [];
      usersListSnapshot.forEach(snap => {
        this.messages.push({
          id: snap.key,
          from: snap.val().from,
          msg: snap.val().message
        });
        return false;
      });
    });
  }

  sendMessage(){
    if(this.newMsg == undefined || this.newMsg == ""){
      alert("Enter an message.");
      return; 
    }

   return this.currentChat.push({
      from: this.user,
      message: this.newMsg
      }).then(cont=>{
        this.newMsg="";
      });
  }

  delete(){
    return this.currentChatNode.remove().then(cont => {
      this.navCtrl.pop();
    });
  }

  members() {
    let alert = this.alertCtrl.create({
      title: 'Members',
      message: this.memberList,
      buttons: ['Back']
    });
    alert.present();
  }



}
