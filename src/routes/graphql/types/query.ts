import { GraphQLList, GraphQLObjectType } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { PostType } from './post.js';
import { UserType } from './user.js';
import { ProfileType } from './profile.js';
import { MemberType } from './memberType.js';

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
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      description: 'Profiles query',
      resolve: async (_, args, contex: PrismaClient) => {
        console.log('here');
        return await contex.profile.findMany();
      },
    },
    memberTypes: {
      type: new GraphQLList(MemberType),
      description: 'MemberTypes query',
      resolve: async (_, args, contex: PrismaClient) => {
        return await contex.memberType.findMany();
      },
    },
  },
});
