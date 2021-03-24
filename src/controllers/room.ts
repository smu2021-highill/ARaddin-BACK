import express, { Request, Response } from 'express';
import * as yup from 'yup';
import { createRoom, getRoom } from '../services/room';
const router = express.Router();

/** 방만들기 */
const initialRoomScheme = yup.object().shape({
	email: yup.string().email().required(),
});
async function initialRoom(req: Request, res: Response) {
	const { email } = initialRoomScheme.validateSync(req.body);
	const room = await createRoom(email);
	if (room) {
		return res.status(201).json({ code: room, info: await getRoom(room) });
	} else {
		return res.status(400).json({ code: '', info: '' });
	}
}

/** 초대코드로 방 입장 */
const sendRoomInfoScheme = yup.string().required();
async function sendRoomInfo(req: Request, res: Response) {
	const code = sendRoomInfoScheme.validateSync(req.query.code);
	const room = await getRoom(code);
	if (room) {
		return res.status(200).json({ code: code, info: room });
	}
	return res.status(400).json({ code: '', info: '' });
}

router.post('/', initialRoom);
router.get('/', sendRoomInfo);

export { router as roomRouter };
