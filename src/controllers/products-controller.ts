import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json({ message: "OK" })
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string({ required_error: "Nome é obrigatório" }).trim(),
        price: z.number({ required_error: "Preço é obritatório" }).nonnegative({ message: "Preço não pode ser negativo "})
      });

      const { name, price } = bodySchema.parse(request.body);

      await knex<ProductRepository>("products").insert({ name, price });

      return response.status(201).json();      
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };