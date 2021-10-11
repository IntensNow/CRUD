import createServer from "server";

const startServer = () => {
  const app = createServer();
  const port: number = 4000;
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};

startServer();
