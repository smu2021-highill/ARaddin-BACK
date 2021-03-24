import express from 'express';
import { initialFirebase } from './utils/firebase';
import { userRouter } from './controllers/user';
import { roomRouter } from './controllers/room';

// Create Express server
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

// firebase connection & use firestore
const firebase = initialFirebase();
export const firestore = firebase.firestore();
export const firebaseAuth = firebase.auth();
// routes
app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);

export default app;
