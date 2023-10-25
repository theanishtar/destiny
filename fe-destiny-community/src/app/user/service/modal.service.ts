import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal
<<<<<<< HEAD
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
=======

>>>>>>> status-online
@Injectable({
  providedIn: 'root'
})
export class ModalService {
<<<<<<< HEAD
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
  checkNotify: boolean = false;
  socket?: WebSocket;
  stompClient?: Stomp.Client;

  constructor(
    private http: HttpClient,
    private postService: PostService,
    private cookieService: CookieService,
    private messageService: MessageService
  ) {
    // this.listNotify = modalService.listNotify;

  }


  /* ============Comment============= */
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
    console.log("id: " + idPost)
    this.openModalComment(idPost).subscribe(() => {
      this.listComment = this.getDataCmt();
      this.images = this.listComment.list_post_images;
      this.listCmt = this.listComment.list_comment;

    })
  }

  /* ============Add comment============= */
  removeNotify() {
    this.checkNotify = false
  }
  count: number = 1; //gia tri key
  connectToComment(userId) {
    localStorage.setItem("chatUserId", userId);
    this.socket = new SockJS(environment.baseUrl + 'notify');
    this.stompClient = Stomp.over(this.socket!);
    this.stompClient.connect({}, (frame) => {
      this.stompClient?.subscribe("/topic/notification/" + userId, (response) => {
        let data = JSON.parse(response.body);
        this.checkNotify = true;
        this.listNotify.set(this.count, data);
        this.mapTime.set(this.count, new Date().toISOString());
        this.count++;
        this.callApiLoadCmt(data.postId);
      });
      this.stompClient?.subscribe("/topic/success-notification/" + userId, (response) => {
        this.callApiLoadCmt(this.idPostCmt);
      });

      setInterval(() => {
        if (this.listNotify != null) {
          for (let [key, value] of this.mapTime) {
            let v = this.listNotify.get(key);
            let notify: NotifyModel = {
              avatar: v!.avatar,
              fullname: v!.fullname,
              fromUserId: v!.fromUserId,
              content: v!.content,
              postId: v!.postId,
              time: this.messageService.customTime(value),
              type: v!.type
            }
            this.listNotify.set(key, notify);
          }
        }
      }, 60000);
    });


  }
  sendNotify(content, type) {
    let toUserId = this.idUser;
    let avatar = this.cookieService.get("avatar");
    let fullname = this.cookieService.get("full_name");
    let fromUserId = localStorage.getItem("chatUserId");
    this.stompClient?.send("/app/notify/" + toUserId, {}, JSON.stringify({
      avatar: avatar,
      fullname: fullname,
      fromUserId: fromUserId,
      content: content,
      postId: this.idPostCmt,
      time: 'Vừa xong',
      type: type,
    }))
  }

  /* ============Reply Comment============= */
  loadReply(data: any): Observable<any> {
    return this.http.post(this.loadDataReplyUrl, data).pipe(
      tap((response) => {
        this.setDataReplyCmt(response);
      }),
    );
  }
  checkHideSeeMore = new Map<string, Boolean>();
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
            ' dataset="first-comment" style="display: block; position: relative; margin-bottom: 2rem;padding-left: 3rem;"> ' +
            '<div class="comment__card" style="padding: 0px;min-width: 100%;"> ' +
            '<div class="box-top" style="display: flex;justify-content: space-between;align-items: center;"> ' +
            ' <div class="Profile" style="display: flex;align-items: center;"> ' +
            '<div class="profile-image" style="width: 40px;height: 40px;overflow: hidden;border-radius: 50%;margin-right: 10px;"> ' +
            '<img src="' + rep[9] + '" style="width: 100%;height: 100%;object-fit: cover;object-position: center;display: block;vertical-align: middle;"/> ' +
            '</div> ' +
            '<div class="Name" style="display: flex;flex-direction: column;margin-left: 10px;"> ' +
            '<strong style="color: black;font-size: 15px;font-weight: bolder;font-family: Helvetica, Arial, sans-serif">' + rep[7] + '</strong> ' +
            '<span style="color: gray;margin-top: 2px;font-size: 12px;font-family: Helvetica, Arial, sans-serif">@' + rep[8] + '</span> ' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<p style="font-size: 15px;margin-bottom: 1rem;line-height: 1.4;padding-left: 3.5rem;margin: 0;font-family: Helvetica, Arial, sans-serif"><a href="#" style="text-decoration: none;color: black;font-weight: bolder;">' +
            rep[7] + '</a>' + ' ' + rep[5] +
            '</p>' +
            '</div>' +
            '</div>'
          )
        }
        this.checkHideSeeMore.set(cmtId, false);
      }
    })
  }

  /* ============Images============= */
  openModalSeeMoreImg(idPost) {
    this.isOpenSeeMoreImg.next(true);
    this.postService.loadPostNewsFeed().subscribe(() => {
      this.listPosts = this.postService.getDataPostNf();
      this.listPost = this.listPosts.post;
      const targetPost = this.listPost.find(post => post.post_id === idPost);

      if (targetPost) {
        // Assuming postImages is an array of objects, not strings
        this.imagesSeeMore = targetPost.postImages.map(image => image.link_image);
      } else {
        console.log("Post not found");
      }
    });
  }


  /* ============Template============= */
  private isOpenCreatePost = new BehaviorSubject<boolean>(false);
  isOpenCreatePost$ = this.isOpenCreatePost.asObservable();

=======
  private isOpenCreatePost = new BehaviorSubject<boolean>(false);
  isOpenCreatePost$ = this.isOpenCreatePost.asObservable();

  private isOpenComment = new BehaviorSubject<boolean>(false);
  isOpenComment$ = this.isOpenComment.asObservable();

>>>>>>> status-online
  openModalCreatePost() {
    this.isOpenCreatePost.next(true);
  }

  closeModalCreatePost() {
    this.isOpenCreatePost.next(false);
  }
<<<<<<< HEAD

  private isOpenComment = new BehaviorSubject<boolean>(false);
  isOpenComment$ = this.isOpenComment.asObservable();
=======
  openModalComment() {
    this.isOpenComment.next(true);
  }
>>>>>>> status-online

  closeModalComment() {
    this.isOpenComment.next(false);
  }
<<<<<<< HEAD

  private isOpenSeeMoreImg = new BehaviorSubject<boolean>(false);
  isOpenSeeMoreImg$ = this.isOpenSeeMoreImg.asObservable();

  closeModalSeeMoreImg() {
    this.isOpenSeeMoreImg.next(false);
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
=======
  
  constructor() { }
>>>>>>> status-online
}
