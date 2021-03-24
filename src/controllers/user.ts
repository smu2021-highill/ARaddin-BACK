import express, { Request, Response } from 'express';
import * as yup from 'yup';
import {
	verifyUser,
	createUser,
	readUser,
	deleteUser,
	updateNickname,
} from '../services/user';

const router = express.Router();

/** 회원가입 */
const signUpScheme = yup.object().shape({
	email: yup.string().email().required(),
	nickname: yup.string(),
	photo: yup.string().required(),
});

async function signUp(req: Request, res: Response) {
	const { email, nickname, photo } = await signUpScheme.validateSync(req.body);
	const user = { nickname: nickname, photo: photo, code: '' };
	createUser(email, user);
	return res.status(201).json({ username: user.nickname });
}

const loginScheme = yup.string().required();
async function login(req: Request, res: Response) {
	const token = loginScheme.validateSync(req.body);
	const email = await verifyUser(token);
	return readUser(email);
}

const deleteAccountScheme = yup.string().email().required();
async function deleteAccount(req: Request, res: Response) {
	const email = await deleteAccountScheme.validateSync(req.body);
	deleteUser(email); //성공,실패 잘 나누기
	return res.status(204);
}

const modifyScheme = yup.object().shape({
	email: yup.string().email().required(),
	nickname: yup.string().required(),
});
async function modifyUser(req: Request, res: Response) {
	const { email, nickname } = await modifyScheme.validateSync(req.body);
	return (await updateNickname(email, nickname))
		? res.send(204)
		: res.send(400);
}

router.get('/login');
router.post('/', signUp);
router.put('/', modifyUser);
router.delete('/', deleteAccount);

export { router as userRouter };
