import User from '../models_/user';
import * as UserDao from '../dao/user';
import { firebaseAuth } from '../app';

// firebase token 검증
export async function checkFirebase(token: string) {
  const userInfo = await firebaseAuth.getUser(token); //verifyIdToken(token);
  try {
    const email = userInfo.email;
    return email ? email : null;
  } catch (err) {
    console.log(err);
  }
}

export function createUser(email: string, nickname: string) {
  const user = new User(email, nickname, '/test'); //사진 경로도 추후에 추가
  return UserDao.insert(user) ? UserDao.find(email) : null;
}

export function getUser(email: string) {
  return UserDao.find(email);
}

export function modifyNickname(email: string, nickname: string) {
  const user = new User(email, nickname);
  return UserDao.update(user);
}

//delete
