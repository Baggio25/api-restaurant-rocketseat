import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppError";

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
      const { name, price } = request.body;

      return response.status(201).json({ name, price });      
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };