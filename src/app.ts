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
const firebase = initialFirebase();
export const firestore = firebase.firestore();
export const firebaseAuth = firebase.auth();
// routes
app.use('/api/user', userRouter);

export default app;
