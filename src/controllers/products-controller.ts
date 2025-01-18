import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const product = await knex("products")
        .select()
        .where("id", `${id}`);

      return response.json(product);
    } catch (error) {
      next(error);
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query;
      const products = await knex("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("name");

      return response.json(products)
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