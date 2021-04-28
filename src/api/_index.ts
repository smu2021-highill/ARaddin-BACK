import { Router } from 'express';
import { roomRouter } from './room';
import { userRouter } from './user';
import { sessionRouter } from './sessionex';

const router = Router();

router.use('/room', roomRouter);
router.use('/user', userRouter);
router.use('/sess', sessionRouter);

export default router;
