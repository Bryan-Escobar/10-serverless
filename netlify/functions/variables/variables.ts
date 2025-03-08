import type { Handler,HandlerEvent,HandlerContext} from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => 
  {
    console.log("hola mundo desde netlify desde variables")
    const myImportantVariable=process.env.MY_IMPORTANT_VARIABLE;
    if(!myImportantVariable)
    {
        // // throw new Error("MY_IMPORTANT_VARIABLE is not set"); NO RECOMENDABLE, pues muestra el stacktrace que tiene informacion del servidor, algo que no queremos
        throw "MY_IMPORTANT_VARIABLE is not set";
    }
    return{
      statusCode: 200,
      body:JSON.stringify(myImportantVariable),
      headers:{
        'Content-Type':'application/json'
      }
    }
  }
export {handler};