import { firestore } from '../app';
import User from '../models/user';

const collection = `users`;

async function insert(user: User) {
  const ref = firestore.collection(collection);
  const info = user.userInfo();
  const doc = await ref.doc(user.email).set(info);
  return doc.writeTime.toDate() === new Date();
}

async function update(user: User) {
  const ref = firestore.collection(collection);
  const doc = await ref.doc(user.email).update({ nickname: user.nickname });
  return !!doc.writeTime.toDate();
}

async function find(email: string) {
  const ref = firestore.collection(collection);
  const doc = await ref.doc(email).get();
  if (!doc.exists) {
    return null; //사용자 없음
  }
  const data = await doc.data();
  const user = new User(email, data.nickname, data.photoPath);
  return user;
}

async function deleteUser(email: string) {
  const ref = firestore.collection(collection);
  const doc = await ref.doc(email).delete();
  return doc.writeTime.toDate() === new Date();
}

export { insert, update, find, deleteUser };
