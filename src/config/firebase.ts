import * as admin from 'firebase-admin';
import { serviceAccount } from './firebaseServiceAccount';

export function initialFirebase() {
  const config = {
    credential: admin.credential.cert(serviceAccount),
  };
  const firebase = admin.initializeApp(config);
  console.log(
    `firebase initial: ${firebase.options.credential === config.credential}`
  );
  return firebase;
}
