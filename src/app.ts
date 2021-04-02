import express from 'express';
import morgan from 'morgan';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import debug from 'debug';
import { initialFirebase } from './utils/firebase';
import { userRouter } from './controllers/user';
import { roomRouter } from './controllers/room';

// Create Express server
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(morgan('dev'));
const debugLog: debug.IDebugger = debug('app');

const loggerOptions: expressWinston.LoggerOptions = {
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.json(),
		winston.format.prettyPrint(),
		winston.format.colorize({ all: true })
	),
};

if (process.env.DEBUG) {
	process.on('unhandledRejection', function (reason) {
		debugLog('Unhandled Rejection:', reason);
		process.exit(1);
	});
} else {
	loggerOptions.meta = false; // when not debugging, make terse
}

app.use(expressWinston.logger(loggerOptions));

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
