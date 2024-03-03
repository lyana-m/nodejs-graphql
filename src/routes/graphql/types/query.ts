import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { PostType } from './post.js';
import { UserType } from './user.js';
import { ProfileType } from './profile.js';
import { MemberType, MemberTypeIdEnum } from './memberType.js';
import { UUIDType } from './uuid.js';

type ArgsType = {
  id: string;
};

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
    post: {
      type: PostType,
      description: 'Post by id query',
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, {id}: ArgsType, contex: PrismaClient) => {
        return await contex.post.findUnique({
          where: {
            id,
          },
        });
      },
    },
    users: {
      type: new GraphQLList(UserType),
      description: 'Users query',
      resolve: async (_, args, contex: PrismaClient) => {
        return await contex.user.findMany();
      },
    },
    user: {
      type: UserType,
      description: 'User by id query',
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, {id}: ArgsType, contex: PrismaClient) => {
        return await contex.user.findUnique({
          where: {
            id,
          },
        });
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
    profile: {
      type: ProfileType,
      description: 'Profile by id query',
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, {id}: ArgsType, contex: PrismaClient) => {
        return await contex.profile.findUnique({
          where: {
            id,
          },
        });
      },
    },
    memberTypes: {
      type: new GraphQLList(MemberType),
      description: 'MemberTypes query',
      resolve: async (_, args, contex: PrismaClient) => {
        return await contex.memberType.findMany();
      },
    },
    memberType: {
      type: MemberType,
      description: 'MemberType by id query',
      args: { id: { type: new GraphQLNonNull(MemberTypeIdEnum) } },
      resolve: async (_, {id}: ArgsType, contex: PrismaClient) => {
        return await contex.memberType.findUnique({
          where: {
            id,
          },
        });
      },
    },
  },
});
