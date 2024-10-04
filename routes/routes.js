import { Router } from "../deps.js";
import * as rmController from "./controllers/rmController.js";


const router = new Router();

router.get("/", rmController.viewMain);


export { router };