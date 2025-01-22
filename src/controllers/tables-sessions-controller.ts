import { Request, Response, NextFunction } from "express";

class TablesSessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      return response.status(201).json({ message: "Created" })
    } catch (error) {
      next(error);
    }
  }
}

export { TablesSessionsController };