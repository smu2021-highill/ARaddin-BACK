import * as RoomDao from '../dao/room';
import Room, { GameUser, Setting, Place } from '../models/room';

function getRandomCode() {
  const code =
    Math.random().toString(36).substring(7, 10) +
    Math.random().toString(36).substring(2, 5);
  return code;
}

async function initialRoom(master: GameUser) {
  // 6자리 랜덤 코드
  const code = getRandomCode();
  const room = await RoomDao.find(code);
  if (!room) {
    //방 없음 -> 존재
    const newRoom = new Room(code, master, [master]);
    // newRoom.setInitialSetting();
    const result = RoomDao.insert(newRoom);
    return newRoom;
  } else {
    //방 존재
    return room;
  }
}

async function modifyRoomSetting(
  code: string,
  goal: number,
  timeLimit: number,
  place: Place
) {
  const setting: Setting = {
    goal: goal,
    timeLimit: timeLimit,
    place: place,
  };
  const room = await RoomDao.update(code, setting, null);
  return room;
}

async function getRoom(code: string, email: string, nickname: string) {
  const user = { email: email, nickname: nickname };
  const room = await RoomDao.find(code);

  room.users = room.users.filter(
    (u) => u.email !== user.email && u.nickname !== user.nickname
  );
  room.users = room.users.concat(user);
  const result = await RoomDao.update(code, null, room.users);
  return result;
}

async function exitRoom(code: string, email: string, nickname: string) {
  const user = { email: email, nickname: nickname };
  const room = await RoomDao.find(code);
  room.users = room.users.filter((exitUser) => exitUser.email !== user.email);
  if (room.master.email === user.email) {
    room.master = room.users[0];
  }
  const result = RoomDao.update(code, null, room.users, room.master);
  return result;
}

export { initialRoom, modifyRoomSetting, getRoom, exitRoom };
