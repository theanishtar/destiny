import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import '../../../assets/toast/main.js';
declare var toast: any;
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import * as Handlebars from 'handlebars';
import { UserModel } from './UserModel.js';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private loadDataChat = environment.baseUrl + 'v1/user/registrationchat';
  private sender: any[] = []
  private listFriends: any[] = []

  socket?: WebSocket;
  stompClient?: Stomp.Client;
  selectedUser = null;
  $chatHistory: any;
  // newMessages = new Map();
  mapUser = new Map<string, UserModel[]>();
  newMessage = new Map<string, { message: string, avatar: string }>();
  checkConnected: boolean = false;
  isOriginal: boolean = true;
  // users: UserModel[];
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  /* ============List chat============= */
  loadDataSender() {
    return this.http.get<any>(this.loadDataChat).pipe(
      tap((response) => {
        this.sender = JSON.parse(JSON.stringify(response));
        this.setSender(this.sender);
      }),
    );
  }


  connectToChat(userId) {
    localStorage.setItem("chatUserId", userId);
    this.socket = new SockJS(environment.baseUrl + 'chat');
    this.stompClient = Stomp.over(this.socket!);
    this.stompClient.connect({}, (frame) => {
      // console.log('connected to: ' + frame);
      this.stompClient!.subscribe("/topic/messages/" + userId, (response) => {
        let data = JSON.parse(response.body);
        if (this.selectedUser == data.fromLogin && this.isOriginal == false) {
          this.render(data.message, data.fromLogin, data.avatar);
        } else {
          this.newMessage.set(data.fromLogin, { message: data.message, avatar: data.avatar });
          let textLastMess = document.getElementById('last-message-' + data.fromLogin);
          textLastMess!.innerText = data.message;
        }

      });
      this.stompClient!.subscribe("/topic/public", (response) => {
        let data = JSON.parse(response.body);

        this.listFriends = data;
        this.setFriend(data);
        let usersTemplateHTML = "";
        let userId = localStorage.getItem("chatUserId");

      });
      this.stompClient!.send("/app/fetchAllUsers");
    });
  }
  sendMsg(from, text, img) {
    this.stompClient!.send("/app/chat/" + this.selectedUser, {}, JSON.stringify({
      fromLogin: from,
      message: text,
      avatar: img
    }));
  }

  render(message, userName, img) {
    setTimeout(() => {
      this.$chatHistory = $('.chat-widget-conversation');
      this.scrollToBottom();
      this.$chatHistory.append(
        '<div class="chat-widget-speaker left" style="padding: 0 26px 0 36px; display: flex; flex-flow: column; position: relative; margin-bottom: 1rem !important;">' +
        '<a class="user-avatar small user-status-avatar no-border no-outline avatar-mess" href="profile" style="position: absolute;left: -10px;top: -8px; width: 40px;height: 44px; display: block;"> ' +
        '<div class="hexagon-container" style="width: 35px; height: 38px; position: relative; margin: 0 auto;background: white;clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); "> ' +
        '<div class="hexagon user-avatar-content" style="top: 6px;left: 5px;position: absolute;z-index: 3;width: 40px;height: 44px;overflow: hidden;">  ' +
        '<div class="hexagon-image" ' +
        'style="background-image: url(' + img + '); width: 20px; height: 23px;position: relative; z-index: 3;background-size: cover;clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);left: 4%;top: 2%;"></div>' +
        '</div>' +
        '<div class="hexagon user-avatar-border" style="position: absolute;top: 0;left: 0;z-index: 1;">' +
        '<div style="position: absolute; top: 0; left: 0; z-index: 1; content: \'\'; width: 32px; height: 36px; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); left: 1px; top: 0px; background-image: linear-gradient(to right, #41efff, #615dfa); display: block;"></div>' +
        '<div class="hexagon-border"></div>' +
        '</div>' +
        '<div class="hexagon user-avatar-progress-border" style="margin-left: 11%;margin-top: 10.3%; width: 26px;height: 29px;top: 0;left: 0;z-index: 2;position: absolute;background: white;clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);">' +
        '  <div class="user-avatar-progress" style="top: 0;left: 0;z-index: 3;position: absolute;"></div>' +
        '</div>' +
        '</div>' +
        '</a>' +
        '<p class="chat-widget-speaker-message" style="border-top-left-radius: 0; display: inline-block;padding: 12px;border-radius: 10px;background-color: #f5f5fa;font-size: 0.875rem;font-weight: 600; line-height: 1.1428571429em;width: fit-content;color: #3e3f5e;font-family: Helvetica, Arial, sans-serif;margin: 0;">' +
        message +
        '</p>' +
        '<p class="chat-widget-speaker-timestamp" style="margin-top: 12px !important;color: #adafca;font-size: 0.75rem;font-weight: 500;font-family: Helvetica, Arial, sans-serif;line-height: 1em;margin: 0;">'
        + this.getCurrentTime() + '</p>' +
        '</div>	'
      );
      this.scrollToBottom();
    }, 1500);
  }

  scrollToBottom() {
    this.$chatHistory = $('.chat-widget-conversation');
    this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
  }

  getCurrentTime() {
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
  }


  // Getter - Setter
  getSender(): any[] {
    return this.sender;
  }
  setSender(data: any[]): void {
    this.sender = data;
  }

  getFriend(): any[] {
    return this.listFriends;
  }
  setFriend(data: any[]): void {
    this.listFriends = data;
  }

  getCheckConnected(): boolean {
    return this.checkConnected;
  }
  setCheckConnected(data: boolean): void {
    this.checkConnected = data;
  }
}
