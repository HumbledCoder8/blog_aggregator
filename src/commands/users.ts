import { setUser } from "src/config";

export function handlerLogin(cmdName:string, ...args:string[]){

    if (args.length === 0){
        throw new Error("username is required.");
    }

    setUser(args[0]);

    console.log("User has been set.");

}