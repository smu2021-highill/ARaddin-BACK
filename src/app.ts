import express from 'express';
import { initialFirebase } from './utils/firebase';
import { userRouter } from './controllers/user';

// Create Express server
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

// firebase connection & use firestore
export const firestore = initialFirebase().firestore();

// routes
app.use('/api/user', userRouter);

export default app;
