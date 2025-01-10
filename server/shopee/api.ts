import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import crypto from "crypto";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://affiliate.shopee.com.br/graphql", // Replace with the correct GraphQL endpoint
    headers: {
      Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Add your access token here
    },
  }),
  cache: new InMemoryCache(),
});

const generateAuthHeader = (
  appId: string,
  secret: string,
  payload: string,
  timestamp: number
): string => {
  const signature = crypto
    .createHash("sha256")
    .update(`${appId}${timestamp}${payload}${secret}`)
    .digest("hex");

  return `SHA256 Credential=${appId}, Timestamp=${timestamp}, Signature=${signature}`;
};

export default generateAuthHeader;
