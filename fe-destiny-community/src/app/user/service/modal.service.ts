import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal
import { environment } from '../../../environments/environment'
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  private removeComment = environment.baseUrl + 'v1/user/comment/remove';
  private searchUrl = environment.baseUrl + 'v1/user/find/user';
  private searchPostUrl = environment.baseUrl + 'v1/user/frind/post';
  private checkNotifyUrl = environment.baseUrl + 'v1/user/update/notify/';

  public listComment: any;
  public images: string[];
  public imagesTemp: string[] = [];
  public listCmt: string[]
  public listReplyComment: any;
  public listReplyCmt: string[];
  public imagesSeeMore: string[] = [];
  public imagesSeeAll: string[] = [];
  public listSearch: any[] = [];

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
  checkedUsers: any[] = [];
  checkUserCalled: boolean = false;
  mapMention = new Map<number, string>();
  checkBadword: boolean = false;
  public darkMode: any;
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

  copyLink(id_post: any): void {
    // Get the link text
    const linkToCopy = environment.baseUrlFe + 'detail-post?id=' + id_post;

    // Create a temporary text area
    const textArea = document.createElement('textarea');
    textArea.value = linkToCopy;

    // Append the text area to the DOM
    document.body.appendChild(textArea);

    // Select the text and copy to clipboard
    textArea.select();
    document.execCommand('copy');

    // Remove the temporary text area
    document.body.removeChild(textArea);

    new toast({
      title: 'Thông báo!',
      message: 'Đã sao chép',
      type: 'success',
      duration: 3000,
    });
  }

  /* ============Comment============= */
  imgShare(images: any) {
    this.imagesTemp = images;
  }

  isLoadingCmt: boolean = true;
  openModalComment(data: any): Observable<any> {
    return this.http.post(this.loadDataComment, data).pipe(
      tap((response) => {
        this.setDataCmt(response);
      }),
    );
  }

  loadComment(idPost, idUser) {
    this.isLoadingCmt = true;
    this.isOpenComment.next(true);
    this.idPostCmt = idPost;
    this.idUser = idUser
    this.callApiLoadCmt(idPost);
  }
  callApiLoadCmt(idPost) {
    // this.isLoadingCmt = true;
    // console.log("id: " + idPost)
    this.openModalComment(idPost).subscribe(() => {
      this.listComment = this.getDataCmt();
      if (this.listComment.list_post_images.length > 0) {
        this.images = this.listComment.list_post_images;
      } else if (this.listComment.list_post_images.length == 0) {
        this.images = [];
      }
      else {
        this.images = this.imagesTemp;
      }
      this.listCmt = this.listComment.list_comment;
      this.isLoadingCmt = false;
    })
  }


  /* ============Add comment============= */
  checkNotifyApi() {
    let idUser = localStorage.getItem("chatUserId");
    let url = this.checkNotifyUrl + idUser;
    return this.http.get(url).subscribe(
      (response) => {
        console.log("API Response:", response);
      },
      (error) => {
        console.error("API Error:", error);
      }
    );
  }


  removeNotify() {
    this.checkNotifyApi();
    this.checkNotify = false;
  }

  connectToComment(userId) {
    localStorage.setItem("chatUserId", userId);
    this.socket = new SockJS(environment.baseUrl + 'notify');
    this.stompClient = Stomp.over(this.socket!);
    this.stompClient.connect({}, (frame) => {
      // Nhận thông báo được gửi qua
      this.stompClient?.subscribe("/topic/notification/" + userId, (response) => {
        let data = JSON.parse(response.body);
        this.checkNotify = true;

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
            following_status: k!.following_status,
            status: k!.status
          }
          // console.warn("k!.type: " + k!.type);
          this.listNotify.set(this.count, notify);
          this.mapTime.set(this.count, k!.time);
          this.count++;
        }

        if (this.repCmtId > 0)
          this.callApiLoadCmt(data.postId);
      });

      // Gửi thông báo thành công
      this.stompClient?.subscribe("/topic/success-notification", (response) => {
        let data = JSON.parse(response.body);
        if (data[1] == 'COMMENT' || data[1] == 'MENTION') {
          // console.warn("===========");
          this.listCmt = [...data[0], ...this.listCmt];
        } else {
          for (let i = 0; i < this.listCmt.length; i++) {
            if (this.listCmt[i][0] == data[2]) {
              this.listCmt.splice(i, 1, ...data[0]);
              // this.listCmt.splice(i,1);
              // this.listCmt[i] = data[0];
              break;
            }
          }
          this.loadDataReply(data[3], data[2]);
        }
      });

      this.stompClient?.subscribe("/topic/remove/comment", (response) => {
        let data = JSON.parse(response.body);
        for (let i = 0; i < this.listCmt.length; i++) {
          if (this.listCmt[i][0] == data) {
            this.listCmt.splice(i, 1);
            document.querySelectorAll(".rep-" + data).forEach((e) => {
              e.remove();
            });
            break;
          }
        }
      });

      // Gửi thông báo lỗi
      this.stompClient?.subscribe("/topic/error-notification/" + userId, (response) => {
        let status = JSON.parse(response.body);
        if (status) {
          this.checkBadword = true;
          setTimeout(() => {
            this.checkBadword = false;
          }, 4000);
        }
      });

      // Kênh gợi ý theo dõi khi đăng ký
      this.stompClient?.subscribe("/topic/loaddata/suggest-post/" + userId, (response) => {
        this.updateDataPost();
      });

      // Kênh load thông báo
      this.stompClient?.subscribe("/topic/loaddata/notification/" + userId, (response) => {

        let data = JSON.parse(response.body);
        // console.warn("data: " + data.length)
        for (let k of data) {
          let notify: NotifyModel = {
            avatar: k!.avatar,
            fullname: k!.fullname,
            fromUserId: k!.fromUserId,
            content: k!.content,
            postId: k!.postId,
            time: this.messageService.customTime(k!.time, 1),
            type: k!.type,
            following_status: k!.following_status,
            status: k!.status
          }
          if (k!.status == false)
            this.checkNotify = true;
          // console.warn("k!.type: " + k!.type);
          this.listNotify.set(this.count, notify);
          this.mapTime.set(this.count, k!.time);
          this.count++;
        }

        this.isLoading = false;
      })

      // Kênh đổi token khi đổi email
      this.stompClient?.subscribe("/topic/changetoken/" + userId, (response) => {
        let data = JSON.parse(response.body);
        localStorage.setItem('token', data.token);
        localStorage.setItem(
          'refreshToken',
          data.refreshToken
        );
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
              status: v!.status
            }
            this.listNotify.set(key, notify);
          }
        }
      }, 60000);

      this.stompClient?.subscribe("/topic/notify/user/ban/" + userId, (response) => {
        this.messageService.logoutUser(userId);
        new toast({
          title: 'Tài khoản đã bị khóa!',
          message: 'Vui lòng liên hệ quản trị viên để mở khóa',
          type: 'warning',
          duration: 5000,
        });
      });
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
      mapMention: Object.fromEntries(this.mapMention.entries()) //Chuyển đổi một mảng các cặp key-value thành một đối tượng.
    }));
    this.mapMention.clear();
    // cập nhật số liệu cmt và share
    let comment = document.getElementById("cmt-" + post_id);
    let share = document.getElementById("share-" + post_id);
    if (type == 'COMMENT' && comment) {
      let count: string | undefined;
      count = '' + comment.textContent?.trim();
      let num = parseInt(count) + 1;
      comment!.innerText = num + ' Bình luận';
    }
    if (type == 'SHARE' && share) {
      let count: string | undefined;
      count = '' + share.textContent?.trim();
      let num = parseInt(count) + 1;
      share!.innerText = num + ' Chia sẻ';
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
  /* ============Reply Comment============= */
  loadReply(data: any): Observable<any> {
    return this.http.post(this.loadDataReplyUrl, data).pipe(
      tap((response) => {
        this.setDataReplyCmt(response);
      }),
    );
  }

  loadDataReply(idPost, cmtId) {
    this.checkHideSeeMore.set(cmtId, false);
    // this.isOpenComment.next(true);
    var data = {
      idPost: idPost,
      cmtId: cmtId
    }
    this.loadReply(data).subscribe(() => {
      this.listReplyComment = this.getDataReplyCmt();
      this.listReplyCmt = this.listReplyComment.list_comment;
      this.$reply = $('#first-reply-' + cmtId);
      let temp = '';
      let nameRep = '';
      if (this.$reply) {
        for (let rep of this.listReplyCmt) {

          if (rep[10] != null) {
            let user = JSON.parse(rep[11]);
            let list = this.getCheckedUsers(rep[10]);
            nameRep = '<a href="profile?id=' + user[0].mentioned_user_id + '" style="text-decoration: none;color: black;font-weight: bolder;">' +
              user[0].fullname + '</a>'

            let i = 0;
            temp = '';
            for (let k of list) {
              if (list.length > 1) {
                temp += '<a href="profile?id=' + k.mentioned_user_id + '" style="text-decoration: none;color: black;font-weight: bolder;">' +
                  k.fullname + '</a> '
              } else {
                temp = '<a href="profile?id=' + k.mentioned_user_id + '" style="text-decoration: none;color: black;font-weight: bolder;">' +
                  k.fullname + '</a>'
              }
              i++;
            }
          } else {
            let user = JSON.parse(rep[11]);
            nameRep = '<a href="profile?id=' + user[0].mentioned_user_id + '" style="text-decoration: none;color: black;font-weight: bolder;">' +
              user[0].fullname + '</a>'

            temp = '';
          }
          this.$reply.append('<div class="comment__container oppen rep-' + cmtId + '"' +
            ' dataset="first-comment" style="display: block; position: relative; margin-bottom: 1rem;margin-top: 1rem;padding-left: 3rem;"> ' +
            '<div class="comment__card" style="padding: 0px;min-width: 100%;"> ' +
            '<div class="box-top" style="display: flex;justify-content: space-between;align-items: center;"> ' +
            ' <div class="Profile" style="display: flex;align-items: center;"> ' +
            '<div class="profile-image" style="width: 40px;height: 40px;overflow: hidden;border-radius: 50%;margin-right: 10px;"> ' +
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
            '<span>' + nameRep + ' ' + temp + '</span>'
            + ' ' + rep[5] +
            '</p>' +
            '</div>' +
            '</div>'
          )
        }
        // this.checkHideSeeMore.set(cmtId, false);
      }
    })
  }
  // this.getContent(rep[10], rep[5])
  getContent(fullname: any, content: any) {
    return content.substring(fullname.length, content.length).trim();
  }

  getCheckedUsers(value: string) {
    try {
      const jsonArray = JSON.parse(value);
      return jsonArray;
    } catch (error) {
      console.error('Error parsing JSON array:', error);
      return [];
    }
  }

  convertToJson(value: string): any[] {
    try {
      if (!this.checkUserCalled) {
        const jsonArray = JSON.parse(value);
        this.checkUserCalled = true;
        return jsonArray;
      } else {
        console.warn("jsonArray has already been parsed.");
        this.checkUserCalled = false;
      }
    } catch (error) {
      console.error('Error parsing JSON array:', error);
    }
    // Trả về một mảng rỗng mặc định nếu có lỗi hoặc nếu hàm đã được gọi trước đó
    return [];
  }

  /* ============remove comment============= */
  removeCmtApi(commentId: any): Observable<any> {
    const params = new HttpParams().set('commentId', commentId.toString());
    return this.http.post(this.removeComment, params);
  }

  removeCmt(idCmt) {
    let id = parseInt(idCmt, 10);
    this.removeCmtApi(id).subscribe();
  }
  /* ============Images============= */
  checkImg: boolean = true
  checkImgSeeAll: boolean = true
  openModalSeeMoreImg(list: any) {
    this.isOpenSeeMoreImg.next(true);
    this.imagesSeeMore = list;
    this.checkImg = false;
  }

  async openModalSeeAllImg(list: any[]) {
    this.isOpenSeeAllImg.next(true);
    this.imagesSeeAll = list;
    this.checkImgSeeAll = false;
  }

  /* ============Search============= */
  async searchApi(id: number, fullname: string): Promise<any> {
    const params = new HttpParams().set('id', id.toString()).set('fullname', fullname);

    try {
      const response = await this.http.post(this.searchUrl, params).toPromise();
      this.setSearchData(response);
      return response;
    } catch (error) {
      console.error('Error in searchApi:', error);
      throw error; // Rethrow the error for the calling code to handle
    }
  }

  async searchPostApi(keyword: any, type: any): Promise<any> {
    const params = new HttpParams().set('keyword', keyword.toString()).set('type', type);

    try {
      const response = await this.http.post(this.searchPostUrl, params).toPromise();
      // this.setSearchData(response);
      return response;
    } catch (error) {
      console.error('Error in searchPostApi:', error);
      throw error; // Rethrow the error for the calling code to handle
    }
  }


  private selectedHashtag: string = '';

  getSelectedHashtag(): string {
    return this.selectedHashtag;
  }

  selectHashtag(hashTag: string): void {
    this.selectedHashtag = hashTag;
  }
  /* ============Template============= */
  delay(ms: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

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
    this.checkImg = true;
    this.isOpenSeeMoreImg.next(false);
  }

  private isOpenSeeAllImg = new BehaviorSubject<boolean>(false);
  isOpenSeeAllImg$ = this.isOpenSeeAllImg.asObservable();

  closeModalSeeAllImg() {
    this.checkImgSeeAll = true;
    this.isOpenSeeAllImg.next(false);
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

  getSearchData(): any {
    return this.listSearch;
  }
  setSearchData(data: any): void {
    this.listSearch = data;
  }
}
