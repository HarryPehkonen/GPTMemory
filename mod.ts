import { Application, Router } from "./deps.ts";
import { rootRoute } from "./routes/rootRoute.ts";
import { saveNameRoute } from "./routes/saveNameRoute.ts";

const app = new Application();
const router = new Router();

// set CSP header
app.use(async(context: Context, next) => {
  // context.response.headers.set("Content-Security-Policy", "default-src 'self'; img-src http://*; child-src 'none';");
  // context.response.headers.set("Content-Security-Policy-Report-Only",  "default-src http:; report-uri /csp-violation-report-endpoint/");

  // context.response.headers.set("Content-Security-Policy", "default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http:");
  context.response.headers.set("Content-Security-Policy", "default-src 'self' http:; style-src 'self' 'unsafe-inline'; font-src 'self' http:; script-src 'self' 'unsafe-inline' 'unsafe-eval'");

  await next();
});

rootRoute(router);
saveNameRoute(router);

app.use(router.routes());
app.use(router.allowedMethods());
app.use((context: Context) => {
  context.response.type = "text/html; charset=utf-8";
  context.response.status = 404;
  context.response.body = "<h1>404!  Page not found.</h1>";
});

await app.listen({ port: 8000 });

