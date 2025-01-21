import { Router } from "express";
import { ProductController } from "@/controllers/products-controller";

const productsRoutes = Router();
const productsController = new ProductController();

productsRoutes.get("/:id", productsController.index);
productsRoutes.get("/", productsController.show);
productsRoutes.post("/", productsController.create);
productsRoutes.put("/:id", productsController.update);
productsRoutes.delete("/:id", productsController.remove);

export { productsRoutes };