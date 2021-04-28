import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import { sess } from './config/redis';
import { initialFirebase } from './config/firebase';
import router from './api/_index';

// Create Express server
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(morgan('dev'));

// redis - 세션 관리
app.use(session(sess));

// swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//apis
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// firebase connection & use firestore
export const firebase = initialFirebase();
export const firestore = firebase.firestore();
export const firebaseAuth = firebase.auth();

export default app;
