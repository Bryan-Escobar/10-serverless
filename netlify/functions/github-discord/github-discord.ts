import type { Handler,HandlerEvent,HandlerContext} from "@netlify/functions";

const onStar=(payload: any): string => {
    let message: string = '';
    const { action, starred_at, sender, repository } = payload;
    // console.log(`Starred at ${starred_at}`);
    // console.log(`starred by ${payload.sender.login}`)


    message = `User ${sender.login} ${action} star on  ${repository.full_name}`;

    return message;
}
const onIssue=(payload: any)=> {
    const { action, issue, sender, repository } = payload;
    if (action === 'opened') {
        return `User ${sender.login} opened issue ${issue.title} on ${repository.full_name} with title ${issue.title}`;
    }
    if (action === 'closed') {
        return`User ${sender.login} closed issue ${issue.title} on ${repository.full_name} with title ${issue.title}`;
        
    }

    if (action === 'reopened') {
        return `User ${sender.login} reopened issue ${issue.title} on ${repository.full_name} with title ${issue.title}`;
    }
    return `Unhandled action for the issue event ${action}`;
}


const notify=async(message:string)=>
{

        const body = {
            content: message,
            embeds:[
                {
                    image:{url:"https://media.giphy.com/media/3BuQWTrTUfi2UTzfRy/giphy.gif?cid=790b7611wvdf7q97mv3oi30yf7uuxk2pqcrd8jv5m34w79vb&ep=v1_gifs_search&rid=giphy.gif&ct=g"}
                }
            ]
        }
        const resp = await fetch(process.env.DISCORD_WEBHOOK_URL?? '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        })
        if(!resp.ok)
        {
            console.error(`Error sending message to discord ${resp.status} ${resp.statusText}`);
            return false;
        }
        return true;
    }


const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => 
  {
    // const payload = req.body;
    const payload = JSON.parse(event.body?? '{}');
    // const githubEvent = req.header('X-GitHub-Event') ?? 'unknown';
    const githubEvent = event.headers[ 'x-github-event'] ?? 'unknown';
    
    console.log(`Received event ${githubEvent}`);
    let message = '';
    console.log(payload);
    //OnStar y ONIssue son metodos que generan el mensaje adecuado y luego se lo pasan a .notify que hace que el bot de discord envie el mensaje
    switch (githubEvent) {
        case 'star':
            message = onStar(payload);
            break;
        case 'issues':
            message = onIssue(payload);
            break;
        default:
            message = `Event not supported ${githubEvent}`;
            break;
    }


    await notify(message);
    return{
      statusCode: 200,
      body:JSON.stringify({message: "Done"}),
      headers:{
        'Content-Type':'application/json'
      }
    }
  }
export {handler};