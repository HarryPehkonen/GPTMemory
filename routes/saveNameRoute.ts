import { Router } from "../deps.ts";
import { saveNameToDatabase } from "../database/db.ts";

export const saveNameRoute = (router: Router) => {
  router.get('/save/', async (context) => {
    const name = context.request.url.searchParams.get("name");
    if (name) {
      try {
        await saveNameToDatabase(name);
        context.response.body = `Name ${name} saved successfully.`;
      } catch (error) {
        context.response.status = 500;
        context.response.body = "Error saving name to the database";
      }
    } else {
      context.response.status = 400;
      context.response.body = "Please provide a name.";
    }
  });
};

