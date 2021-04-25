import express, { Request, Response } from 'express';
import * as yup from 'yup';
import {
  checkFirebase,
  createUser,
  getUser,
  modifyNickname,
} from '../service/user';

const signUpSchema = yup.object({
  token: yup.string().required(),
  nickname: yup.string().required(),
});
async function signUp(req: Request, res: Response) {
  const { token, nickname } = signUpSchema.validateSync(req.body);
  //사진 등록도 넣기
  const email = await checkFirebase(token);
  const user = await createUser(email, nickname);
  req.session.user = user;
  return user ? res.status(201).json({ user: user }) : res.status(400);
}

const loginSchema = yup.object({
  token: yup.string().required(),
});
async function login(req: Request, res: Response) {
  const sess = req.session.user;
  console.log(`${sess.email}`);
  let user;
  if (!sess) {
    const { token } = loginSchema.validateSync(req.body);
    const email = await checkFirebase(token);
    user = await getUser(email);
    req.session.user = user;
  } else {
    user = sess;
    console.log(`auto login`);
  }
  return user
    ? res.status(200).json({ user: user })
    : res.status(400).json({ user: null });
}

const modifyUserSchema = yup.object({
  token: yup.string().notRequired(),
  nickname: yup.string().required(),
});

async function modifyUser(req: Request, res: Response) {
  const sess = req.session.user;
  const { token, nickname } = modifyUserSchema.validateSync(req.body);
  let isModified;
  if (!sess) {
    const email = await checkFirebase(token);
    isModified = await modifyNickname(email, nickname);
  } else {
    isModified = await modifyNickname(sess.email, nickname);
  }
  return isModified
    ? res.status(200).json({ user: sess.email })
    : res.status(400).json({ error: `bad request` });
}

// TODO: 탈퇴 구현하기
function dropOut(req: Request, res: Response) {}
const deleteAccountScheme = yup.object().shape({
  email: yup.string().email().required(),
});
// async function deleteAccount(req: Request, res: Response) {
// 	const { email } = await deleteAccountScheme.validateSync(req.body);
// 	return deleteUser(email)
// 		? res.status(204).json({ result: true })
// 		: res.status(404).json({ result: false });
// }

const router = express.Router();
router.post('/', signUp);
router.post('/login', login);
router.put('/', modifyUser);
router.delete('/', dropOut);

export { router as userRouter };
