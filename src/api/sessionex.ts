import express, { Request, Response } from 'express';
import * as yup from 'yup';
const userSchema = yup.object({
  email: yup.string().email().required(),
  nickname: yup.string().required(),
});

function checkSession(req: Request, res: Response) {
  if (req.session.userId) {
    const { email, nickname } = userSchema.validateSync(req.session.userId);
    console.log(`OK Session Valid...${email}- ${nickname}`);
    res.send(`session valid (current login)`);
  } else {
    console.log(`NOT Session is not valid...(${req.session.userId})`);
    res.send(`session is not valid (login please!)`);
  }
}
function login(req: Request, res: Response) {
  if (req.session.userId) {
    console.log(`OK Session Valid...${req.session.userId}`);
    res.send(`session valid (auto login)`);
  } else {
    req.session.userId = req.body.user;
    console.log(req.body.user);
    console.log(`session save success...(${req.session.userId})`);
    res.send(`session save success`);
  }
}

function logout(req: Request, res: Response) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send('session is not destroy');
    } else {
      console.log(`session destroy success`);
      res.send(`session is destroy (login please)`);
    }
  });
}

const router = express.Router();
router.get('/check', checkSession);
router.post('/login', login);
router.get('/logout', logout);
export { router as sessionRouter };
