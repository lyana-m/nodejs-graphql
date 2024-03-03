import { GraphQLList, GraphQLObjectType } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { PostType } from './post.js';
import { UserType } from './user.js';

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
    users: {
      type: new GraphQLList(UserType),
      description: 'Users query',
      resolve: async (_, args, contex: PrismaClient) => {
        return await contex.user.findMany();
      },
    }
  },
});
