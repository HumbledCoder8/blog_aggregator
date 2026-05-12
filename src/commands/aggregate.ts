import {fetchFeed} from "src/lib/rss";





export async function handlerAgg(cmdName:string, ...args:string[]){


    const feed = "https://www.wagslane.dev/index.xml";
    
    const result = await fetchFeed(feed);


    console.log(JSON.stringify(result, null, 2));


}