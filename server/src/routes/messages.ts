import {Router} from 'express';
import {getMessages, sendMessage} from '../controllers/messages';
const router = Router();

router.get('/', getMessages);
router.post('/',sendMessage);


export default router;

