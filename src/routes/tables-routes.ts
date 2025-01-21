
import { Router } from "express";
import { TablesController } from "@/controllers/tables-controller";

const tableRoutes = Router();
const tablesController = new TablesController();

tableRoutes.get("/", tablesController.show);

export { tableRoutes };