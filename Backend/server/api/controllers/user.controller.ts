import { Response, Request, NextFunction } from "express";
import { sendErr } from "../../utils/sendError";
import { User } from '../models';


export class UserController{


    // Function to authenticate user
    async authenticate(req: Request, res: Response, next: NextFunction){
        try {
            
            const { username, password } = req.body;

            // Authenticate
            const user: any = await User.find({
                $and: [
                    { username: username },
                    { password: password }
                ]
            });
            // Send Status 200 response if found
            if (user.length>0){
                return res.status(200).json({
                    message: "Successfully Authenticated!"
                });
            }

            else{
                return res.status(403).json({
                    message: "Unauthorised!"
                });
            }
        } catch (error) {
            sendErr(res, new Error(error), 'Internal Server Error!', 500);
        }
    }


    // Function to add user
    async add(username: string, password: string){
        var user: any;
        try {
            user = await User.find({
                $and: [
                    { username: username },
                    { password: password }
                ]
            });
            if (user.length==0){
                console.log("here")
                user = await User.create({
                    username: username,
                    password: password
                });
                return user;
            }
        } catch (error) {
            return 500;
        }
    }

}