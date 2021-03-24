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
	const newUser = createUser(email, user);
	if (!newUser) {
		return res.status(400).json({ nickname: '' });
	}
	return res.status(201).json({ nickname: user.nickname });
}

/** 로그인 */
const loginScheme = yup.object().shape({
	token: yup.string().required(),
});
async function login(req: Request, res: Response) {
	const { token } = loginScheme.validateSync(req.body);
	const email = await verifyUser(token);
	if (!email) {
		console.error(`firebase err`);
		return res.status(400).json({ email: '' });
	}
	const user = await readUser(email);
	if (user !== null) {
		console.log(`${email} login`);
		return res.status(200).json(user);
	} else {
		// 	// 고치기
		console.log(`${email} doesn't exist. 로그인 실패`);
		return res.status(400).json({ email: '' });
	}
}

/** 회원탈퇴 */
const deleteAccountScheme = yup.object().shape({
	email: yup.string().email().required(),
});
async function deleteAccount(req: Request, res: Response) {
	const { email } = await deleteAccountScheme.validateSync(req.body);
	return deleteUser(email)
		? res.status(204).json({ result: true })
		: res.status(404).json({ result: false });
}

/** 닉네임 수정 */
const modifyScheme = yup.object().shape({
	email: yup.string().email().required(),
	nickname: yup.string().required(),
});
async function modifyUser(req: Request, res: Response) {
	const { email, nickname } = await modifyScheme.validateSync(req.body);
	return (await updateNickname(email, nickname))
		? res.status(200).json({ nickname: nickname })
		: res.status(400).json({ nickname: '' });
}

router.post('/login', login);
router.post('/', signUp);
router.put('/', modifyUser);
router.delete('/', deleteAccount);

export { router as userRouter };
