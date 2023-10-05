import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//Tương tác với bài viết
export class InteractPostsService {
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
