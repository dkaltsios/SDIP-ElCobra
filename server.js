import express from "express";

export default function runServer(handlers) {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json());

  app.get("/", (request, res) => {
    res.send(handlers.info());
  });

  app.post("/start", (request, res) => {
    handlers.start(request.body);
    res.send("ok");
  });

  app.post("/move", (request, res) => {
    res.send(handlers.move(request.body));
  });

  app.post("/end", (request, res) => {
    handlers.end(request.body);
    res.send("ok");
  });

  app.use(function (request, res, next) {
    res.set("Server", "battlesnake/replit/starter-snake-javascript");
    next();
  });

  const host = "0.0.0.0";
  const port = process.env.PORT || 8000;

  app.listen(port, host, () => {
    console.log(`Running Battlesnake at http://${host}:${port}...`);
  });
}
