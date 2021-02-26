import { Request,Response} from 'express';
import Message from '../entity/Message';

const sendMessage = async (req: Request , res: Response)=>
{
    const {from,to,body, subject} = req.body;
    
    if(from === '' || to === '' || body === '' || subject === '')
    {
        return res.status(500).json(
            {
                success: false,
                message: 'internal server error'
            }
        );
    }

    try {
        const message = new Message({ messageBody: body, from:from, to:to, subject:subject});
        await message.save();

        return res.status(201).json(
            {
                success: true,
                data: message
            }
        );
    } catch (error) {
        
        return res.status(500).json(
            {
                success: false,
                message: 'internal server error'
            }
        );
    }
    
}

const getMessages = async (req: Request , res: Response) =>
{
    try 
    {
        const messages = await Message.find({
            order: { createdAt: 'DESC' }
        });

        return res.status(201).json(
            {
                success: true,
                data: messages
            });
    } 
    catch (error) 
    {
        return res.status(500).json(
            {
                success: false,
                message: 'internal server error'
            }
        );
    }
}

export {getMessages,sendMessage};