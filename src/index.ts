import { readConfig } from "./config";
import { setUser } from "./config";


function main(){
    setUser("solar");
    console.log(readConfig());

}


main();