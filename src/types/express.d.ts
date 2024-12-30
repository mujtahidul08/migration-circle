// src/types/express.d.ts

import { UserType } from "./user.dto";

declare global {
  namespace Express {
    interface Request {
      user?: UserType; // Tambahkan properti 'user' ke tipe Request
    }
  }
}
