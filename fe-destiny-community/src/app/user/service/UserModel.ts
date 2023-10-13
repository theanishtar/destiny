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
  hide: boolean;
  status: boolean;
}

export enum MessageType {
  JOIN = 'JOIN',
  LEAVE = 'LEAVE'
}
