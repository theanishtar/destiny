import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal
import { environment } from '../../../environments/environment'
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from './post.service';

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

  constructor(
    private http: HttpClient,
    private postService: PostService
  ) { }


  /* ============Comment============= */
  openModalComment(data: any): Observable<any> {
    return this.http.post(this.loadDataComment, data).pipe(
      tap((response) => {
        this.setDataCmt(response);
      }),
    );
  }

  loadComment(idPost) {
    this.isOpenComment.next(true);
    this.openModalComment(idPost).subscribe(() => {
      this.listComment = this.getDataCmt();
      this.images = this.listComment.list_post_images;
      this.listCmt = this.listComment.list_comment;
    })
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
