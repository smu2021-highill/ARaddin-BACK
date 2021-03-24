import { firestore, firebaseAuth } from '../app';
import { User, collection } from '../models/user';

//회원 정보 등록
async function createUser(email: string, user: User) {
	const userRef = firestore.collection(collection);
	return await userRef.doc(email).set(user);
}

async function readUser(email: string) {
	const userRef = firestore.collection(collection);
	const user = await userRef.doc(email).get();
	return user.createTime === undefined ? null : user.data();
}

// 회원 정보 삭제
async function deleteUser(email: string) {
	const userRef = firestore.collection(collection);
	const user = await userRef.doc(email).delete();
	return !user ? null : user;
}

// 닉네임 수정
async function updateNickname(email: string, nickname: string) {
	const userRef = firestore.collection(collection);
	const user = await userRef.doc(email).update({ nickname: nickname });
	console.log(user);
	return !user ? false : true;
}

// firebase token 검증
async function verifyUser(token: string) {
	const userInfo = await firebaseAuth.getUser(token); //verifyIdToken(token);
	try {
		const email = userInfo.email;
		return email ? email : null;
	} catch (err) {
		console.log(err);
	}
}

export { createUser, readUser, deleteUser, updateNickname, verifyUser };
