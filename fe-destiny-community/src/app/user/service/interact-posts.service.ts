import { Injectable } from '@angular/core';
import { ModalService } from '@app/user/service/modal.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import '../../../assets/toast/main.js';
declare var toast: any;
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
    this.modalService.sendNotify(' ', idPost, idUser, 'SHARE', this.modalService.repCmtId);
    new toast({
      title: 'Thành công!',
      message: 'Chia sẻ thành công',
      type: 'success',
      duration: 1500,
    });
  }

  async deleleInterestedApi(post_id: number): Promise<any> {
    try {
      const response = await this.http.post(this.deleleInterestedUrl, post_id).toPromise();
      return response;
    } catch (error) {
      console.log("Error:", error);
      throw error; // Re-throw the error to propagate it further if needed
    }
  }

  interestedPost(idPost, idUser) {
    this.idPost = this.modalService.idPostCmt;
    this.modalService.sendNotify(' ', idPost, idUser, 'INTERESTED', this.modalService.repCmtId);
  }
}
