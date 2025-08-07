import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response , NextFunction} from "express"



export interface AuthenticatedRequest extends Request {
    user?: {
        id: string,
        firstName: string,
        lastName: string,
        email: string
    }
}

export const  authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        if (typeof decoded === 'object' && 'id' in decoded) {
            req.user = decoded.id; 
            return next();
        } else {
            return res.status(401).json({ message: 'Invalid token payload' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}