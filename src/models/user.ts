class User {
  email: string;
  nickname: string;
  photoPath?: string = 't';
  // code?: string = '';
  constructor(
    email: string,
    nickname: string,
    photoPath?: string
    // code?: string
  ) {
    this.email = email;
    this.nickname = nickname;
    this.photoPath = photoPath;
    // this.code = code;
  }
  userInfo() {
    const user = {
      nickname: this.nickname,
      photoPath: this.photoPath,
      // code: this.code,
    };
    return user;
  }
  setNickname(nickname: string) {
    this.nickname = nickname;
  }
}

export default User;
