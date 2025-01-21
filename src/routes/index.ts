import { Router } from "express";
import { productsRoutes } from "./products-routes";
import { tableRoutes } from "./tables-routes";

const routes = Router();
routes.use("/products", productsRoutes);
routes.use("/tables", tableRoutes);

export { routes };