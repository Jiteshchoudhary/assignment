import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { LoginUserDto } from '../dtos/Login.dto';
import { AuthController } from '../controllers/auth.controllers';
import { SignupDto } from '../dtos/Signup.dto';
const authController = new AuthController();

const router = Router();
router.post('/login', validate(LoginUserDto), authController.login);
router.post('/signup', validate(SignupDto), authController.signup);
export default router;