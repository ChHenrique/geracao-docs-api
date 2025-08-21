import 'express'
import { IUserJWT } from 'src/interfaces/user.interface'

declare module 'express' {
    interface Request {
        user: IUserJWT
    }
}