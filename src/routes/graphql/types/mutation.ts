import { GraphQLObjectType } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { CreatePostInput, NewPost, PostType } from './post.js';
import { CreateUserInput, NewUser, UserType } from './user.js';
import { CreateProfileInput, NewProfile, ProfileType } from './profile.js';
import { MutationArgsType } from './common.js';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: {
      type: PostType,
      args: { dto: { type: CreatePostInput } },
      resolve: (_, { dto }: MutationArgsType<NewPost>, contex: PrismaClient) =>
        contex.post.create({ data: dto }),
    },
    createUser: {
      type: UserType,
      args: { dto: { type: CreateUserInput } },
      resolve: (_, { dto }: MutationArgsType<NewUser>, contex: PrismaClient) =>
        contex.user.create({ data: dto }),
    },
    createProfile: {
      type: ProfileType,
      args: { dto: { type: CreateProfileInput } },
      resolve: (_, { dto }: MutationArgsType<NewProfile>, contex: PrismaClient) =>
        contex.profile.create({ data: dto }),
    },
  },
});
