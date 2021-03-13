import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { resolvers } from "@generated/type-graphql";
import { buildSchema } from "type-graphql";
import { PrismaClient } from "@prisma/client";

(async () => {
  const schema = await buildSchema({
    resolvers,
    validate: false,
  });

  const prisma = new PrismaClient();

  const server = new ApolloServer({
    schema,
    context: () => ({ prisma }),
  });

  server.listen().then(({ url }) => {
    console.log(`Prisma server ready at ${url}`);
  });
})();
