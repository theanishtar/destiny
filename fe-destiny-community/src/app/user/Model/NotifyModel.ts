export interface NotifyModel {
    avatar: string;
    fullname: string;
    fromUserId: number;
    content: string;
    postId: number;
    time: string;
    type: MessageType;
  }
  
  export enum MessageType {
    COMMENT, INTERESTED, FOLLOW
  }