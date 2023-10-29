import { Injectable } from '@angular/core';
import { ModalService } from '@app/user/service/modal.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
//Tương tác với bài viết
export class InteractPostsService {
  private deleleInterestedUrl = environment.baseUrl + 'v1/user/update/interested/post';
  constructor(
    public modalService: ModalService,
    private http: HttpClient,
  ) { }

  idPost: any
  sharePost(idPost, idUser) {
    this.idPost = this.modalService.idPostCmt;
    this.modalService.sendNotify(' ', idPost, idUser, 'SHARE');
  }


  // deleleInterestedApi(data: any): Observable<any> {
  //   console.log("data: " + data);
  //   return this.http.post(this.deleleInterestedUrl, data).pipe(
  //     tap(() => {
  //       console.log("Đã hủy quan tâm"); // Thay đổi thông điệp tùy ý
  //     }),
  //     catchError((error) => {
  //       console.error("Lỗi xảy ra khi hủy quan tâm:", error);
  //       throw error; // Ném lỗi để thông báo lên tầng gọi
  //     })
  //   );
  // }
  deleleInterestedApi(post_id: number): Observable<any> {
    return this.http.post(this.deleleInterestedUrl, post_id).pipe(
      catchError(error => {
        console.log("Error:", error);
        throw error; // Re-throw the error to propagate it further if needed
      })
    );
  }


  interestedPost(idPost, idUser) {
    this.idPost = this.modalService.idPostCmt;
    this.modalService.sendNotify(' ', idPost, idUser, 'INTERESTED');
  }








  private likedPosts: Set<string> = new Set<string>();

  toggleLike(postId: string): void {
    if (this.likedPosts.has(postId)) {
      this.likedPosts.delete(postId);
    } else {
      this.likedPosts.add(postId);
    }
  }

  isLiked(postId: string): boolean {
    return this.likedPosts.has(postId);
  }
}
