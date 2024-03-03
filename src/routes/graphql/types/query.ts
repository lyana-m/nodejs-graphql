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
      resolve: async (_, { id }: ArgsType, contex: PrismaClient) => {
        const post = await contex.post.findUnique({
          where: {
            id,
          },
        });

        if (!post) {
          return null;
        }

        return post;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      description: 'Users query',
      resolve: async (_, args, contex: PrismaClient) => {
        return await contex.user.findMany({
          include: { posts: true, profile: { include: { memberType: true } } },
        });
      },
    },
    user: {
      type: UserType,
      description: 'User by id query',
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }: ArgsType, contex: PrismaClient) => {
        const user = await contex.user.findUnique({
          where: {
            id,
          },
          include: { posts: true, profile: { include: { memberType: true } } },
        });

        console.log('user', user);

        if (!user) {
          return null;
        }

        return user;
      },
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      description: 'Profiles query',
      resolve: async (_, args, contex: PrismaClient) => {
        const profile = await contex.profile.findMany();

        if (!profile) {
          return null;
        }

        return profile;
      },
    },
    profile: {
      type: ProfileType,
      description: 'Profile by id query',
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }: ArgsType, contex: PrismaClient) => {
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
      resolve: async (_, { id }: ArgsType, contex: PrismaClient) => {
        return await contex.memberType.findUnique({
          where: {
            id,
          },
        });
      },
    },
  },
});
