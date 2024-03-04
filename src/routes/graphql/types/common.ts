export type ArgsType = {
  id: string;
};

export type MutationArgsType<T> = {
  dto: T;
};

export type SubscriptionArgsType = {
  userId: string;
  authorId: string;
}
