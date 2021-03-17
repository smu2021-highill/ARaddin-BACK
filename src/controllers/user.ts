import express, { Request, Response } from 'express';
import * as yup from 'yup';
import { User } from '../models/user';
import { registerUser, deleteUser } from '../services/user';

const router = express.Router();

const signUpSchema = yup.object().shape({
	username: yup.string().required(),
	userDetail: yup.object().shape({
		photos: yup.array().of(yup.string()).max(3).required(),
		code: yup.string().default(''),
	}),
});

async function signUp(req: Request, res: Response) {
	const schema = await signUpSchema.validateSync(req.body);
	const user: User = schema;
	registerUser(user);
	res.status(201).json({ username: user.username });
}

const dropOutSchema = yup.object().shape({
	username: yup.string().required(),
});

async function dropOut(req: Request, res: Response) {
	const schema = await dropOutSchema.validateSync(req.body);
	deleteUser(schema.username);
	res.status(204);
}

router.post('/', signUp);
router.delete('/', dropOut);

export { router as userRouter };
