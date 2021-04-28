import express, { Request, Response } from 'express';
import * as yup from 'yup';
import {
  initialRoom,
  modifyRoomSetting,
  getRoom,
  exitRoom,
} from '../service/room';
import { Place } from '../models/room';

const userSchema = yup.object({
  email: yup.string().email().required(),
  nickname: yup.string().required(),
});
async function createRoom(req: Request, res: Response) {
  const { email, nickname } = userSchema.validateSync(req.session.user);
  const master = { email: email, nickname: nickname };
  const room = await initialRoom(master);
  return res.status(201).json({ room: room });
}

const codeSchema = yup.string().required();
const changeSettingSchema = yup.object({
  goal: yup.number().required(),
  timeLimit: yup.number().required(),
  place: yup.mixed<Place>().required(),
});
async function changeSetting(req: Request, res: Response) {
  const code = codeSchema.validateSync(req.query.code);
  const { goal, timeLimit, place } = changeSettingSchema.validateSync(req.body);
  const room = await modifyRoomSetting(code, goal, timeLimit, place);
  return !!room
    ? res.status(200).json({ setting: room })
    : res.status(400).json({ setting: null });
}

async function enterRoom(req: Request, res: Response) {
  const code = codeSchema.validateSync(req.query.code);
  const { email, nickname } = userSchema.validateSync(req.session.user);

  const room = await getRoom(code, email, nickname);
  return res.json({ room: room });
}

async function leaveRoom(req: Request, res: Response) {
  const code = codeSchema.validateSync(req.query.code);
  const { email, nickname } = userSchema.validateSync(req.session.user);

  return (await exitRoom(code, email, nickname))
    ? res.status(204)
    : res.status(400).json({ leave: false });
}

const router = express.Router();
router.post('/', createRoom);
router.put('/', changeSetting);
router.get('/', enterRoom);
router.delete('/', leaveRoom);

export { router as roomRouter };
