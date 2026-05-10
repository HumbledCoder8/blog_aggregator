import { setUser, readConfig } from "src/config";
import { createUser, getUser, getUsers} from "src/lib/db/queries/users";


export async function handlerLogin(cmdName:string, ...args:string[]){

    if (args.length === 0){
        throw new Error("username is required.");
    }

    const user = await getUser(args[0]);

    if(user === undefined){
        throw new Error("user doesn't exist");
    }

    setUser(args[0]);

    console.log("User has been set.");

}
export async function handlerRegister(cmdName:string, ...args:string[]){

     if (args.length === 0){
        throw new Error("username is required.");
    }

    const user = await getUser(args[0]);

    if(user != undefined){
        throw new Error("user already exists");
    }

    const createdUser = await createUser(args[0]);
    setUser(createdUser.name);


    console.log(`New user has been set: `);
    console.log(createdUser);

}

export async function handlerGetUsers(cmdName:string){
    const users = await getUsers();

    const current =  readConfig().currentUserName;


    for(const user of users){

        if (current === user.name){
            console.log(`* ${user.name} (current)`);

        }

        else{
            console.log(`* ${user.name}`);
        }

        
    }
}