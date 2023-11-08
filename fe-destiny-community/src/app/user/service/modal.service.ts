import { Injectable,EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal
import { environment } from '../../../environments/environment'
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from './post.service';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from './message.service';
import { NotifyModel } from '../Model/NotifyModel';
import { ProfileService } from './profile.service';
import { FollowsService } from './follows.service';

import '../../../assets/toast/main.js';
declare var toast: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private loadDataComment = environment.baseUrl + 'v1/user/load/comment';
  private loadDataReplyUrl = environment.baseUrl + 'v1/user/load/comment/reply';

  public listComment: any;
  public images: string[]
  public listCmt: string[]
  public listReplyComment: any;
  public listReplyCmt: string[];
  public imagesSeeMore: string[] = [];
  listPosts: any;
  listPost: any;
  $reply: any;
  $notify: any;
  $contentCommnet: any;
  idPostCmt: any;
  idUser: any
  mapTime = new Map<number, string>();
  listNotify = new Map<number, NotifyModel>();
  listNotifyTemp = new Map<number, NotifyModel>();
  checkNotify: boolean = false;
  socket?: WebSocket;
  stompClient?: Stomp.Client;
  repCmtId: any = 0;
  isLoading: boolean = true;
  count: number = 1; //gia tri key
  checkHideSeeMore = new Map<string, Boolean>();
  currentPage: number = 1;
  
  // listSuggested: any[] = [];
  // listTop5User: any[] = [];
  // listTop5Post: any[] = [];
  // check: boolean = true;
  // checkData1: boolean = false;
  // checkData2: boolean = false;
  // checkData3: boolean = false;
  // checkData4: boolean = false;
  dataUpdatedPost = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private postService: PostService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private profileService: ProfileService,
    private followsService: FollowsService
  ) {
  }


  /* ============Comment============= */
  isLoadingCmt: boolean = true;
  openModalComment(data: any): Observable<any> {
    return this.http.post(this.loadDataComment, data).pipe(
      tap((response) => {
        this.setDataCmt(response);
      }),
    );
  }

  loadComment(idPost, idUser) {
    this.isOpenComment.next(true);
    this.idPostCmt = idPost;
    this.idUser = idUser
    this.callApiLoadCmt(idPost);
  }
  callApiLoadCmt(idPost) {
    // console.log("id: " + idPost)
    this.openModalComment(idPost).subscribe(() => {
      this.listComment = this.getDataCmt();
      this.images = this.listComment.list_post_images;
      this.listCmt = this.listComment.list_comment;
      this.isLoadingCmt = false;
    })
  }

  /* ============Add comment============= */
  removeNotify() {
    this.checkNotify = false
  }
  
  connectToComment(userId) {
    localStorage.setItem("chatUserId", userId);
    this.socket = new SockJS(environment.baseUrl + 'notify');
    this.stompClient = Stomp.over(this.socket!);
    this.stompClient.connect({}, (frame) => {
      this.stompClient?.subscribe("/topic/notification/" + userId, (response) => {
        let data = JSON.parse(response.body);
        this.checkNotify = true;
        // this.listNotify.set(this.count, data);
        // this.mapTime.set(this.count, new Date().toISOString());
        // this.count++;
        
        //Đẩy lại thông báo lên lại
        this.listNotify.clear();
        this.mapTime.clear();
        this.count = 0;
        for (let k of data) {
          let notify: NotifyModel = {
            avatar: k!.avatar,
            fullname: k!.fullname,
            fromUserId: k!.fromUserId,
            content: k!.content,
            postId: k!.postId,
            time: this.messageService.customTime(k!.time, 1),
            type: k!.type,
            following_status: k!.following_status
          }
          this.listNotify.set(this.count, notify);
          this.mapTime.set(this.count, k!.time);
          this.count++;
        }

        if (this.repCmtId > 0)
          this.callApiLoadCmt(data.postId);
      });
      this.stompClient?.subscribe("/topic/success-notification", (response) => {
        let id = JSON.parse(response.body);
        this.callApiLoadCmt(id);
      });
      this.stompClient?.subscribe("/topic/loaddata/suggest-post/"+ userId, (response) => {
        this.updateDataPost();
      });
      this.stompClient?.subscribe("/topic/loaddata/notification/" + userId, (response) => {
        let data = JSON.parse(response.body);
        for (let k of data) {
          let notify: NotifyModel = {
            avatar: k!.avatar,
            fullname: k!.fullname,
            fromUserId: k!.fromUserId,
            content: k!.content,
            postId: k!.postId,
            time: this.messageService.customTime(k!.time, 1),
            type: k!.type,
            following_status: k!.following_status
          }
          this.listNotify.set(this.count, notify);
          this.mapTime.set(this.count, k!.time);
          this.count++;

        }
        
        this.isLoading = false;
      })

      this.stompClient?.subscribe("/topic/changetoken/" + userId, (response) => {
        let data = JSON.parse(response.body);
        localStorage.setItem('token', data.token);
        new toast({
          title: 'Thông báo!',
          message: 'Email đã được thay đổi',
          type: 'success',
          duration: 3000,
        })
      });

      setInterval(() => {
        if (this.listNotify != null) {
          for (let [key, value] of this.mapTime) {
            // console.log(value)
            let v = this.listNotify.get(key);
            let notify: NotifyModel = {
              avatar: v!.avatar,
              fullname: v!.fullname,
              fromUserId: v!.fromUserId,
              content: v!.content,
              postId: v!.postId,
              time: this.messageService.customTime(value, 1),
              type: v!.type,
              following_status: v!.following_status,
            }
            this.listNotify.set(key, notify);
          }
        }
      }, 60000);

      this.stompClient?.send('/app/load/notification/' + userId);

    });
  }
  
  sendNotify(content, post_id, toUser, type, idCmt) {
    let toUserId = toUser;
    let avatar = this.cookieService.get("avatar");
    let fullname = this.cookieService.get("full_name");
    let fromUserId = localStorage.getItem("chatUserId");
    this.stompClient?.send("/app/notify/" + toUserId, {}, JSON.stringify({
      avatar: avatar,
      fullname: fullname,
      fromUserId: fromUserId,
      content: content,
      postId: post_id,
      replyId: idCmt,
      time: 'Vừa xong',
      type: type,
    }));
    let comment = document.getElementById("cmt-"+post_id);
    let share = document.getElementById("share-"+post_id);
    if(type == 'COMMENT' && comment){
      let count: string | undefined;
      count = '' + comment.textContent?.trim();
      let num = parseInt(count) + 1;
      comment!.innerText = num+' Bình luận';
    }
    if(type == 'SHARE' && share){
      let count: string | undefined;
      count = '' + share.textContent?.trim();
      let num = parseInt(count) + 1;
      share!.innerText = num+' Chia sẻ';
    }
  }

  sendNotifyFollow(idUser: any[]) {
    let avatar = this.cookieService.get("avatar");
    let fullname = this.cookieService.get("full_name");
    let fromUserId = localStorage.getItem("chatUserId");
    this.stompClient?.send("/app/notifyfollowregister", {}, JSON.stringify({
      avatar: avatar,
      fullname: fullname,
      fromUserId: fromUserId,
      content: ' ',
      postId: 0,
      replyId: 0,
      time: 'Vừa xong',
      type: 'FOLLOW',
      follow_id: idUser
    }));
    
  }
  // Hàm cập nhật dữ liệu
  updateDataPost() {
    // Thực hiện cập nhật dữ liệu ở đây.
    // Sau khi cập nhật xong, thông báo sự kiện.
    this.dataUpdatedPost.emit();
  }

  // async loadDataSuggest() {
  //   if (!Array.isArray(this.listSuggested) || this.listSuggested.length === 0) {
  //     // Gọi API chỉ khi dữ liệu chưa tồn tại.
  //     await new Promise<void>((resolve) => {
  //       this.followsService.loadDataSuggest().subscribe(() => {
  //         this.listSuggested = this.followsService.getDataSuggested();
  //         this.check = false;
  //         resolve();
  //       });
  //     });
  //   } else {
  //     // Sử dụng dữ liệu đã lưu trữ.
  //     this.listSuggested = this.followsService.getDataSuggested();
  //     this.check = false;
  //     if (Array.isArray(this.listSuggested) && this.listSuggested.length === 0) {
  //       this.checkData1 = true;
  //       this.check = false;
  //     }
  //   }
  // }

  // // currentPage: number = 1;
  // async loadPosts() {
  //   let body_news = document.getElementById('body-news')!;
  //   body_news.style.display = 'none';
  //   try {
  //     this.listTop5User = await this.postService.loadTop5User();
  //     this.listTop5Post = await this.postService.loadTop5Post();
  //     await this.loadDataSuggest();
  //     this.postService.loadPostNewsFeed(this.currentPage).subscribe((data: any) => {
  //       this.listPosts = data; // Lưu dữ liệu ban đầu vào mảng
  //       setTimeout(() => {
  //         this.isLoading = false;
  //         body_news.style.display = 'grid';
  //       }, 1000);
  //     });
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }
  /* ============Reply Comment============= */
  loadReply(data: any): Observable<any> {
    return this.http.post(this.loadDataReplyUrl, data).pipe(
      tap((response) => {
        this.setDataReplyCmt(response);
      }),
    );
  }
  
  loadDataReply(idPost, cmtId) {
    this.isOpenComment.next(true);
    var data = {
      idPost: idPost,
      cmtId: cmtId
    }
    this.loadReply(data).subscribe(() => {
      this.listReplyComment = this.getDataReplyCmt();
      this.listReplyCmt = this.listReplyComment.list_comment;
      this.$reply = $('#first-reply-' + cmtId);
      if (this.$reply) {
        for (let rep of this.listReplyCmt) {
          this.$reply.append('<div class="comment__container oppen rep-' + cmtId + '"' +
            ' dataset="first-comment" style="display: block; position: relative; margin-bottom: 1rem;margin-top: 1rem;padding-left: 3rem;"> ' +
            '<div class="comment__card" style="padding: 0px;min-width: 100%;"> ' +
            '<div class="box-top" style="display: flex;justify-content: space-between;align-items: center;"> ' +
            ' <div class="Profile" style="display: flex;align-items: center;"> ' +
            '<div class="profile-image" style="width: 40px;height: 40px;overflow: hidden;border-radius: 50%;margin-right: 10px;"> ' +
            // '<img src="' + rep[9] + '" style="width: 100%;height: 100%;object-fit: cover;object-position: center;display: block;vertical-align: middle;"/> ' +
            '<a class="user-avatar small user-status-avatar no-border no-outline avatar-mess" href="profile"> ' +
        '<div class="hexagon-container" style="width: 35px; height: 38px; position: relative; margin: 0 auto;background: white;clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); "> ' +
        '<div class="hexagon user-avatar-content" style="top: 6px;left: 5px;position: absolute;z-index: 3;width: 40px;height: 44px;overflow: hidden;">  ' +
        '<div class="hexagon-image" ' +
        'style="background-image: url(' +
        rep[9] +
        '); width: 20px; height: 23px;position: relative; z-index: 3;background-size: cover;clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);left: 4%;top: 2%;"></div>' +
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
            '</div> ' +
            '<div class="Name" style="display: flex;flex-direction: column;margin-left: 10px;"> ' +
            '<strong style="color: black;font-size: 15px;font-weight: bolder;font-family: Helvetica, Arial, sans-serif">' + rep[7] + '</strong> ' +
            '<span style="color: gray;margin-top: 2px;font-size: 12px;font-family: Helvetica, Arial, sans-serif">@' + rep[8] + '</span> ' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<p style="font-size: 15px;margin-bottom: 1rem;line-height: 2.4;padding-left: 3.9rem;margin: 0;font-family: Helvetica, Arial, sans-serif">' +
            '<a href="#" style="text-decoration: none;color: black;font-weight: bolder;">' +
            rep[10] + '</a>' + ' ' + this.getContent(rep[10], rep[5]) +
            '</p>' +
            '</div>' +
            '</div>'
          )
        }
        this.checkHideSeeMore.set(cmtId, false);
      }
    })
  }

  getContent(fullname: any, content: any) {
    return content.substring(fullname.length, content.length).trim();
  }

  /* ============Images============= */
  
  async openModalSeeMoreImg(idPost) {
    this.isOpenSeeMoreImg.next(true);
    // this.listPosts = await this.postService.loadPostNewsFeed();
    this.postService.loadPostNewsFeed(this.currentPage).subscribe((data: any) => {
      this.listPosts = data; // Lưu dữ liệu ban đầu vào mảng
      this.currentPage++; // Tăng trang hiện tại
      const targetPost = this.listPosts.find(post => post.post_id === idPost);
      if (targetPost) {
        this.imagesSeeMore = targetPost.images.map(image => image);
      } else {
        console.log("Post not found");
      }
    });
  }

  openModalSeeMoreImgPr(idPost) {
    let dataPost = {
      toProfile: localStorage.getItem("idSelected"),
      page: this.currentPage
    }
    this.isOpenSeeMoreImg.next(true);
    this.profileService.loadDataTimelinePost(dataPost).subscribe((data: any) => {
      this.listPosts = data; // Lưu dữ liệu ban đầu vào mảng
      this.currentPage++; // Tăng trang hiện tại
      const targetPost = this.listPosts.find(post => post.post_id === idPost);
      if (targetPost) {
        this.imagesSeeMore = targetPost.images.map(image => image);
      } else {
        console.log("Post not found");
      }
    });
  }

  /* ============Template============= */
  private isOpenCreatePost = new BehaviorSubject<boolean>(false);
  isOpenCreatePost$ = this.isOpenCreatePost.asObservable();

  openModalCreatePost() {
    this.isOpenCreatePost.next(true);
  }

  closeModalCreatePost() {
    this.isOpenCreatePost.next(false);
  }

  private isOpenComment = new BehaviorSubject<boolean>(false);
  isOpenComment$ = this.isOpenComment.asObservable();

  closeModalComment() {
    this.isOpenComment.next(false);
  }

  private isOpenSeeMoreImg = new BehaviorSubject<boolean>(false);
  isOpenSeeMoreImg$ = this.isOpenSeeMoreImg.asObservable();

  closeModalSeeMoreImg() {
    this.isOpenSeeMoreImg.next(false);
  }

  private isOpenSuggest = new BehaviorSubject<boolean>(false);
  isOpenSuggest$ = this.isOpenSuggest.asObservable();

  openModalSuggest() {
    this.isOpenSuggest.next(true);
  }

  closeModalSuggest() {
    this.isOpenSuggest.next(false);
  }

  /* ============Getter - Setter============= */
  getDataCmt(): any {
    return this.listComment;
  }
  setDataCmt(data: any): void {
    this.listComment = data;
  }

  getDataReplyCmt(): any {
    return this.listReplyComment;
  }
  setDataReplyCmt(data: any): void {
    this.listReplyComment = data;
  }
}
