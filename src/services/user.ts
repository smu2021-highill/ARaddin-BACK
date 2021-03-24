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
	if (!user.exists) {
		console.log(`${email} doesn't exist.`);
		return null;
	} else {
		console.log(`${email} login`);
		return user.data();
	}
}

// 회원 정보 삭제
async function deleteUser(email: string) {
	const userRef = firestore.collection(collection);
	const user = await userRef
		.doc(email)
		.delete()
		.then((result) => {
			console.log(`Document deleted at: ${result.writeTime.toDate()}`);
		});
}

// 닉네임 수정
async function updateNickname(email: string, nickname: string) {
	const userRef = firestore.collection(collection);
	const user = await userRef.doc(email).update({ nickname: nickname });
	// 	.then((result) => {
	// 	return result.writeTime.toDate;
	// }).catch(() => {
	// 	return null;
	// })
	return !user ? true : false;
}

// firebase token 검증
async function verifyUser(token: string) {
	const userInfo = await firebaseAuth.verifyIdToken(token);
	try {
		const email = userInfo.email;
		console.log(email);
		return email;
	} catch (err) {
		console.error(`firebase: ${err}`);
	}
}

export { createUser, readUser, deleteUser, updateNickname, verifyUser };
