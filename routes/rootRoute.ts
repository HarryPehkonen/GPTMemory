import { Router } from "../deps.ts";
import { getAllNamesFromDatabase } from "../database/db.ts";

export const rootRoute = (router: Router) => {
  router.get('/', async (context) => {
    try {
      const names = await getAllNamesFromDatabase();
      context.response.body = { names };
    } catch (error) {
      context.response.status = 500;
      context.response.body = "Error retrieving names from the database";
    }
  });
};

