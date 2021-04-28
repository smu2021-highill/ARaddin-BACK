import Room, { Setting, GameUser } from '../models/room';
import { firestore } from '../app';

const collection = `rooms`;

async function insert(room: Room) {
  const ref = firestore.collection(collection);
  const info = room.roomInfo();
  const doc = await ref.doc(room.code).set(info);
  return (await ref.doc(room.code).get()).data();
  // return doc.writeTime.toDate().getMinutes() === new Date().getMinutes();
}

async function update(
  code: string,
  setting?: Setting,
  users?: GameUser[],
  master?: GameUser
) {
  const ref = firestore.collection(collection);
  const obj: any = {}; //timestamp: new Date()
  if (setting) {
    obj.setting = setting;
  }
  if (users) {
    obj.users = users;
  }
  if (master) {
    obj.master = master;
    obj.users = users;
  }
  const doc = await ref.doc(code).update(obj);
  console.log((await ref.doc(code).get()).data());
  return !!doc.writeTime.toDate() ? (await ref.doc(code).get()).data() : null;
}

async function find(code: string) {
  const ref = firestore.collection(collection);
  const doc = await ref.doc(code).get();
  if (!doc.exists) {
    return null; //방 없음
  }
  const data = await doc.data();
  const room = new Room(code, data.master, data.users, data.setting);
  return room;
}

function deleteRoom() {
  const ref = firestore.collection(collection);
}

export { insert, update, find };

// class RoomDao {
//   ref: FirebaseFirestore.CollectionReference;
//   constructor() {
//     this.ref = firebase.collection(collection);
//   }
//   async insert(code: string, master: GameUser) {
//     const room = new Room(code, master, [master]);
//     const doc = await this.ref.doc(room.code).set(room.roomInfo);
//     return doc.writeTime === FirebaseFirestore.Timestamp.now();
//   }
//   async updateSetting(code: string, setting: Setting) {
//     const doc = await this.ref.doc(code).update({ setting: setting });
//     return doc.writeTime === FirebaseFirestore.Timestamp.now();
//   }
//   async updateUsers(code: string, users: Array<GameUser>) {
//     const doc = await this.ref.doc(code).update({ users: users });
//     return doc.writeTime === FirebaseFirestore.Timestamp.now();
//   }

//   async find(code: string) {
//     const doc = await this.ref.doc(code).get();
//     if (!doc.exists) {
//       return null; //방 없음
//     }
//     const data = await doc.data();
//     const room = new Room(code, data.master, data.setting, data.users);
//     return room;
//   }

//   deleteRoom() {}
// }

// export default new RoomDao();
