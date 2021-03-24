import { firestore, firebaseAuth } from '../app';
import { collection, Room } from '../models/room';

async function createRoom(email: string) {
	const roomRef = firestore.collection(collection);
	// 6자리 랜덤 코드
	const code =
		Math.random().toString(36).substring(7, 10) +
		Math.random().toString(36).substring(2, 5);
	// const code = 'zya3w5';
	const room = await roomRef.doc(code).get();
	if (room.createTime !== undefined) {
		console.log(`existed`);
		return null;
	} else {
		console.log('not existed');
		const roomInit: Room = {
			master: email,
			users: [email],
			setting: { treasureCount: 10, timeLimit: 10, place: 0 },
		};
		const result = await roomRef.doc(code).set(roomInit);
		return code;
	}
}
async function getRoom(code: string) {
	const roomRef = firestore.collection(collection);
	const room = await roomRef.doc(code).get();
	if (room.createTime !== undefined) {
		// 방 존재
		return room.data();
	} else {
		//방 없음
		return null;
	}
}

export { createRoom, getRoom };
