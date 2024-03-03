import { GraphQLList, GraphQLObjectType } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { PostType } from './post.js';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      description: 'Posts query',
      resolve: async (_, args, contex: PrismaClient) => {
        return await contex.post.findMany();
      },
    },
  },
});
