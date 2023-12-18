export interface UserModel {
  type: MessageType;
  user_id: number;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  messageUnRead: number;
  lastMessage: string;
  online: string;
  isFriend: boolean;
  typeMessage:string;
  recall:boolean
}

export enum MessageType {
  JOIN = 'JOIN',
  LEAVE = 'LEAVE'
}
