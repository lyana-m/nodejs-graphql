import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { CreatePostInput, NewPost, PostType } from './post.js';
import { CreateUserInput, NewUser, UserType } from './user.js';
import { CreateProfileInput, NewProfile, ProfileType } from './profile.js';
import { ArgsType, MutationArgsType } from './common.js';
import { UUIDType } from './uuid.js';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: {
      type: PostType,
      args: { dto: { type: CreatePostInput } },
      resolve: (_, { dto }: MutationArgsType<NewPost>, contex: PrismaClient) => {
        return contex.post.create({ data: dto });
      },
    },
    createUser: {
      type: UserType,
      args: { dto: { type: CreateUserInput } },
      resolve: (_, { dto }: MutationArgsType<NewUser>, contex: PrismaClient) => {
        return contex.user.create({ data: dto });
      },
    },
    createProfile: {
      type: ProfileType,
      args: { dto: { type: CreateProfileInput } },
      resolve: (_, { dto }: MutationArgsType<NewProfile>, contex: PrismaClient) => {
        return contex.profile.create({ data: dto });
      },
    },
    deletePost: {
      type: new GraphQLNonNull(UUIDType),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }: ArgsType, contex) => {
        const post = await contex.post.delete({ where: { id } });

        return post.id;
      },
    },
    deleteUser: {
      type: new GraphQLNonNull(UUIDType),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }: ArgsType, contex) => {
        const user = await contex.user.delete({ where: { id } });

        return user.id;
      },
    },
    deleteProfile: {
      type: new GraphQLNonNull(UUIDType),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }: ArgsType, contex) => {
        const profile = await contex.profile.delete({ where: { id } });

        return profile.id;
      },
    },
  },
});
