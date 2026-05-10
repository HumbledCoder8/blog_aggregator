import { deleteUsers } from "src/lib/db/queries/users";

export async function handlerReset(cmdName:string){

    await deleteUsers();
    console.log("Users have been deleted from the table");

}