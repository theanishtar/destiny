export interface NotifyModel {
    avatar: string;
    fullname: string;
    fromUserId: number;
    content: string;
    postId: number;
    time: string;
    type: MessageType;
    following_status: boolean;
  }
  
  export enum MessageType {
    COMMENT, REPCOMMENT , INTERESTED, FOLLOW, SHARE
  }
  // export enum MessageType {
  //   COMMENT = 'COMMENT', 
  //   INTERESTED = 'INTERESTED',
  //   FOLLOW = 'FOLLOW',
  //   SHARE = 'SHARE'
  // }