

export type CommandHandler = (cmdName:string, ...args:string[]) => Promise<void>;

export type CommandsRegistry = Record<string,CommandHandler>;




export async function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler){

        registry[cmdName] = handler;
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]){
    const handler = registry[cmdName];

    if(handler === undefined){
        throw new Error("command not found.");
    }

    await handler(cmdName,...args);

}