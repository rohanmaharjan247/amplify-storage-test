import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
  test: a.string(),
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
});
