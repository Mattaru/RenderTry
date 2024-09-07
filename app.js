import { configure, renderFile } from "./deps.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response("-", {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const addData = async (request) => {
  const formData = await request.formData();
  const sender = formData.get("sender");
  const message = formData.get("message");
  await messageService.addItem(sender, message);

  return redirectTo("/");
};

const deleteData = async (request) => {
  const path = new URL(request.url).pathname;
  const id = path.split("/")[2];
  await messageService.deleteItem(id);

  return redirectTo("/");
};

const listData = async (request) => {
  const data = {
    messages: await messageService.getSortedLastFives(),
  };

  return new Response(await renderFile("index.eta", data), responseDetails);
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  
  
  if (request.method === "GET" && url.pathname === "/") return await listData(request);
  else if (request.method === "POST" && url.pathname === "/") return await addData(request);
  else if (request.method === "POST" && url.pathname.includes("/delete/")) return await deleteData(request);
  else return redirectTo("/");
};

Deno.serve({ port: 7777 }, handleRequest);