import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { knex } from "@/database/knex";
import { z } from "zod";

class TablesSessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number({ message: "O Id da mesa é obrigatório! "})
      })

      const { table_id } = bodySchema.parse(request.body);

      const session = await knex<TableSessionRepository>("tables_sessions")
        .where({
          table_id
        })
        .orderBy(
          "opened_at", "desc"
        )
        .first();
      
      if(session && !session.closed_at) {
        throw new AppError("Essa mesa já está ocupada!");
      }

      await knex<TableSessionRepository>("tables_sessions").insert({
        table_id,
        opened_at: knex.fn.now()
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const sessions = await knex<TableSessionRepository>("tables_sessions")
        .orderBy("closed_at");

      return response.json(sessions);   
    } catch (error) {
      next(error)
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "Id precisa ser um número"})
        .parse(request.params.id);

      const session = await knex<TableSessionRepository>("tables_sessions")
        .where({ id })
        .first();

      if(!session) {
        throw new AppError("Sessão não encontrada!");
      }
      
      if(session.closed_at) {
        throw new AppError("Sessão já está fechada!");
      }

      await knex<TableSessionRepository>("tables_sessions")
        .update({ closed_at : knex.fn.now() })
        .where({ id })

      return response.json();
    } catch (error) {
      next(error);
    }
  }

}

export { TablesSessionsController };