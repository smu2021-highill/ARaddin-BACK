import { firestore } from '../app';
import * as UserModel from '../models/user';

async function registerUser(user: UserModel.User) {
	const userDetail: UserModel.UserDetail = user.userDetail;
	const userRef = firestore.collection(UserModel.collection);
	return await userRef.doc(user.username).set(userDetail);
}

async function deleteUser(username: string) {
	const userRef = firestore.collection(UserModel.collection);
	await userRef
		.doc(username)
		.delete()
		.then((result) => {
			console.log(`Document deleted at: ${result.writeTime.toDate()}`);
		});
}

export { registerUser, deleteUser };
