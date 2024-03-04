import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { ChangePostInput, CreatePostInput, NewPost, PostType } from './post.js';
import { ChangeUserInput, CreateUserInput, NewUser, UserType } from './user.js';
import {
  ChangeProfileInput,
  CreateProfileInput,
  NewProfile,
  ProfileType,
} from './profile.js';
import { ArgsType, MutationArgsType, SubscriptionArgsType } from './common.js';
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
      resolve: async (_, { id }: ArgsType, contex: PrismaClient) => {
        const post = await contex.post.delete({ where: { id } });

        return post.id;
      },
    },
    deleteUser: {
      type: new GraphQLNonNull(UUIDType),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }: ArgsType, contex: PrismaClient) => {
        const user = await contex.user.delete({ where: { id } });

        return user.id;
      },
    },
    deleteProfile: {
      type: new GraphQLNonNull(UUIDType),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }: ArgsType, contex: PrismaClient) => {
        const profile = await contex.profile.delete({ where: { id } });

        return profile.id;
      },
    },
    changePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInput) },
      },
      resolve: (
        _,
        { id, dto }: ArgsType & MutationArgsType<NewPost>,
        contex: PrismaClient,
      ) => {
        return contex.post.update({ where: { id }, data: dto });
      },
    },
    changeUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: (
        _,
        { id, dto }: ArgsType & MutationArgsType<NewUser>,
        contex: PrismaClient,
      ) => {
        return contex.user.update({ where: { id }, data: dto });
      },
    },
    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: (
        _,
        { id, dto }: ArgsType & MutationArgsType<NewProfile>,
        contex: PrismaClient,
      ) => {
        return contex.profile.update({ where: { id }, data: dto });
      },
    },
    subscribeTo: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        _,
        { userId, authorId }: SubscriptionArgsType,
        contex: PrismaClient,
      ) => {
        await contex.subscribersOnAuthors.create({
          data: {
            subscriberId: userId,
            authorId: authorId,
          },
        });

        return await contex.user.findUnique({
          where: {
            id: userId,
          },
        });
      },
    },
    unsubscribeFrom: {
      type: GraphQLString,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        _,
        { userId, authorId }: SubscriptionArgsType,
        contex: PrismaClient,
      ) => {
        await contex.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId,
              authorId: authorId,
            },
          },
        });

        return 'You are successfully unsubscribed';
      },
    },
  },
});
