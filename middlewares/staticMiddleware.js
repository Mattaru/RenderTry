import { send } from "../deps.js";


const staticMiddleware = async (context, next) => {
    const css = context.request.url.pathname.startsWith("/css");
    const js = context.request.url.pathname.startsWith("/js");
  
    if (css || js) {
      await send(context, context.request.url.pathname, {
        root: `${Deno.cwd()}/static`,
      });
    } else {
      await next();
    }
};


export {
    staticMiddleware
};