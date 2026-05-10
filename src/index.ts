import { readConfig } from "./config";
import { setUser } from "./config";
import { CommandsRegistry,registerCommand, runCommand } from "./commands/commands";
import { handlerLogin } from "./commands/users";

function main(){
    //setUser("solar");
    //console.log(readConfig());

    const registry: CommandsRegistry = {};
    
    registerCommand(registry,"login", handlerLogin);

    const args = process.argv.slice(2);

    if (args.length < 1){
        console.error("error: no arguements provided!");
        process.exit(1);

    }

    const command = args[0];
    const cmdArgs = args.slice(1);

    try{
        runCommand(registry,command,...cmdArgs);
    }

    catch (error){
        console.error(`${error} `);
        process.exit(1);
    }

    

    
    
   

}


main();