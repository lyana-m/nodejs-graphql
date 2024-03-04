import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';
import { ArgsType } from './common.js';
import { PrismaClient } from '@prisma/client';

export const UserType: GraphQLObjectType<{
  id: string;
  name: string;
  balance: number;
}> = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: { type: ProfileType },
    posts: { type: new GraphQLList(PostType) },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (source: ArgsType, _, contex: PrismaClient) => {
        const authors = (
          await contex.subscribersOnAuthors.findMany({
            where: { subscriberId: source.id },
            include: { author: true },
          })
        ).map((a) => a.author);

        return authors;
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (source: ArgsType, _, contex: PrismaClient) => {
        const subscribers = (
          await contex.subscribersOnAuthors.findMany({
            where: { authorId: source.id },
            include: { subscriber: true },
          })
        ).map((s) => s.subscriber);

        return subscribers;
      },
    },
  }),
});

export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

export type NewUser = {
  name: string;
  balance: number;
};
