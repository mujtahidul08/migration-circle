import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY =
  process.env.SECRET_KEY || 'aksjdkl2aj3djaklfji32dj2dj9ld92jd92j';

export function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(' ')[1]; // bearer token

  if (!token) {
    return res.status(401).json({ message: 'Access token missing or invalid' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as {
      id: number;
      username: string;
    };

    (req as any).user = decoded;
  
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

// import { NextFunction, Request, Response } from 'express';
// import jwt from 'jsonwebtoken';

// const SECRET_KEY =
//   process.env.SECRET_KEY || 'aksjdkl2aj3djaklfji32dj2dj9ld92jd92j';

// export function authentication(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   const token = req.headers.authorization?.split(' ')[1]; // bearer token

//   if (!token) {
//     return res.status(401).json({ message: 'Access token missing or invalid' });
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY) as {
//       id: number;
//       username: string;
//     };

//     if (!decoded.id || typeof decoded.id !== 'number') {
//       return res.status(400).json({ message: 'Invalid Author ID format.' });
//     }

//     console.log("Decoded Token:", decoded);

//     // Memastikan req.user ada dengan casting tipe
//     (req as any).user = decoded;
//     console.log("Decoded User ID:", (req as any).user.id);

//     next();
//   } catch (error) {
//     return res.status(403).json({ message: 'Invalid or expired token' });
//   }
// }
// import { NextFunction, Request, Response } from 'express';
// import jwt from 'jsonwebtoken';

// const SECRET_KEY =
//   process.env.SECRET_KEY || 'aksjdkl2aj3djaklfji32dj2dj9ld92jd92j';

// export function authentication(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   const token = req.headers.authorization?.split(' ')[1]; // bearer token

//   if (!token) {
//     return res.status(401).json({ message: 'Access token missing or invalid' });
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY) as {
//       id: number;
//       username: string;
//     };
//     if (!decoded.id || typeof decoded.id !== 'number') {
//       throw new Error('Token is missing a valid user ID');
//     }

//     console.log("Decoded Token:", decoded);
//     // Memastikan req.user ada dengan casting tipe
//     (req as any).user = decoded;
//     console.log("Decoded User ID:", (req as any).user.id);
    
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: 'Invalid or expired token' });
//   }
// }

// import { NextFunction, Request, Response } from 'express';
// import jwt from 'jsonwebtoken';

// const SECRET_KEY =
//   process.env.SECRET_KEY || 'aksjdkl2aj3djaklfji32dj2dj9ld92jd92j';

// export function authentication(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   const token = req.headers.authorization?.split(' ')[1]; // bearer token

//   if (!token) {
//     return res.status(401).json({ message: 'Access token missing or invalid' });
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY) as {
//       id: number;
//       username: string;
//     };

//     (req as any).user = decoded;

//     next();
//   } catch (error) {
//     return res.status(403).json({ message: 'Invalid or expired token' });
//   }
// }