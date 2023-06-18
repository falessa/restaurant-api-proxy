import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { schema } from "./schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import expressPlayground from 'graphql-playground-middleware-express'

const PORT = process.env.PORT || 3001;
const app = express();
app.use("*", cors());
app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
app.use(compression());

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  }
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  
  app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

  const httpServer = createServer(app);
  httpServer.listen({ port: PORT }, (): void =>
    console.log(`🚀 GraphQL Server is running on http://localhost:${PORT}/graphql`)
  );
}

startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
