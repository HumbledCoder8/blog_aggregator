import { readConfig } from "./config";
import { setUser } from "./config";
import { CommandsRegistry,registerCommand, runCommand } from "./commands/commands";
import { handlerLogin, handlerRegister, handlerGetUsers } from "./commands/users";
import { handlerReset } from "./commands/reset"
import { handlerAgg } from "./commands/aggregate";

async function main(){

    const registry: CommandsRegistry = {};
    
    registerCommand(registry,"login", handlerLogin);
    registerCommand(registry, "register",handlerRegister);
    registerCommand(registry, "reset", handlerReset);
    registerCommand(registry, "users", handlerGetUsers);
    registerCommand(registry, "agg", handlerAgg);

    const args = process.argv.slice(2);

    if (args.length < 1){
        console.error("error: no arguements provided!");
        process.exit(1);

    }

    const command = args[0];
    const cmdArgs = args.slice(1);

    try{
       await runCommand(registry,command,...cmdArgs);
    }

    catch (error){
        console.error(`${error} `);
        process.exit(1);
    }

    

    
    process.exit(0);
   

}


main();