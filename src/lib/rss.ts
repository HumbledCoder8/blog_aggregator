import { channel } from "diagnostics_channel";
import {XMLParser} from "fast-xml-parser";
import { PassThrough } from "stream";

type RSSItem = {
  title: string,
  link: string,
  description: string,
  pubDate: string
};


export async function fetchFeed(feedURL: string){

    const response = await fetch(feedURL, {
        headers: { 
            "User-Agent": "gator"
        }
    });

    if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`);
    }

    const xml = await response.text();
    const parser = new XMLParser({
        "processEntities": false
    });

    //created parser is used for parsing the xml, and turning it into a JS object.
    const feedXml = parser.parse(xml);
    const feed = feedXml.rss;



    if(!feed.channel){

       
        throw new Error(`Channel field doesn't exist
            feed: ${feed.channel}`);
    }

    if(!feed.channel.title || !feed.channel.link || !feed.channel.description){
        throw new Error(`Required field is missing`);
    }

    const {title,link,description} = feed.channel;

        //this might bug
    let items: RSSItem[] = [];

    if(Array.isArray(feed.channel.item)){
        items = feed.channel.item;
    }

    else if (feed.channel.item){
        items[0] = feed.channel.item;
    }

    const results: RSSItem[] = [];

    for(const item of items){

        if(!item.title || !item.link || !item.description || !item.pubDate){
            continue;
        }
        results.push(
            {
                title: item.title,
                link: item.link,
                description: item.description,
                pubDate: item.pubDate
            }
        );
    }

    const output = {
        channel: {
            title,
            link,
            description,
            item:results
        },

    };
    return output;


}
