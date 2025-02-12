export interface IPost {
  _id: string;
  title: string;
  body: string;
  picture: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
}

export type AuthType = "login" | "register";
