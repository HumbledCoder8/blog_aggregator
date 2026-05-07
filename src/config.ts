import fs from "fs";
import os from "os";
import path from "path";

type Config = {
    dbUrl: string,
    currentUserName?: string
}

export function setUser(currentUserName:string):void{
    const config = readConfig();
    config.currentUserName = currentUserName;
    writeConfig(config);
}

export function readConfig():Config{
    
    const filePath = getConfigFilePath();
    const data = fs.readFileSync(filePath, "utf-8");
    // data is now a string of the file's contents
    const rawConfig = JSON.parse(data);
    // rawConfig is now a JavaScript object
    return validateConfig(rawConfig);

}

function getConfigFilePath():string{
    const homeDir = os.homedir();
    const fullPath = path.join(homeDir, ".gatorconfig.json");
    return fullPath;
}

function validateConfig(rawConfig: any): Config{
    if (!rawConfig.db_url || typeof rawConfig.db_url != "string" ){
        throw new Error("dbUrl is required.");
    }

    if (!rawConfig.current_user_name || typeof rawConfig.current_user_name != "string" ){
        throw new Error("current username is required.");
        
    }

    const config: Config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name
    }

    return config;
}

function writeConfig(cfg: Config): void{
    const filepath = getConfigFilePath();

    const rawConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName,
    };

    const data = JSON.stringify(rawConfig,null,2);
    fs.writeFileSync(filepath,data);
}