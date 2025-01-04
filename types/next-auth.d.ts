// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendUser = DefaultSession["user"] & {
  id: string;
  address: string;
  image: string;
  name: string;
  email: string;
  role: string;
  isOAuth: boolean;
  firstLogin: boolean;
  acceptsTerms: boolean;
  acceptsNotifications: boolean;
  role: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendUser;
  }
}
