import Game from './game';

class Room {
  code: string;
  master: GameUser;
  users: Array<GameUser>;
  setting: Setting = {
    goal: 10,
    timeLimit: 10,
    place: Place.UP,
  };
  //   game: Game;

  constructor(
    code: string,
    master: GameUser,
    users: Array<GameUser>,
    setting?: Setting
  ) {
    this.code = code;
    this.master = master;
    this.users = users;
    this.setting = setting
      ? setting
      : { goal: 10, timeLimit: 10, place: Place.UP };
  }
  roomInfo() {
    const room = {
      master: this.master,
      users: this.users,
      setting: this.setting,
    };
    return room;
  }
  setInitialSetting() {
    this.setting = {
      goal: 10,
      timeLimit: 10,
      place: Place.UP,
    };
  }
}

export interface Setting {
  goal: number; // 목표 보물 개수
  timeLimit: number; // 제한시간
  place: Place; // 게임 공간
}

export interface GameUser {
  email: string;
  nickname: string;
}

export enum Place {
  UP,
  DOWN,
}

export default Room;
