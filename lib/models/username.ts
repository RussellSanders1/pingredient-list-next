
export interface UsernameI {
  uid: string;
}

export default class Username implements UsernameI {
  public uid: string;

  constructor(uid: string) {
    this.uid = uid;
  }
}