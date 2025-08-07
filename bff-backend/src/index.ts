import express from 'express';
import cors from 'cors';
import { Response, Request } from 'express';
import { authRouter } from './auth/auth.routes';


const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
})



app.use('/api/auth', authRouter)



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


export default app;