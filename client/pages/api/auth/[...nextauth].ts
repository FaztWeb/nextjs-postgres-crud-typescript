// all global configuration for the Next Auth
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        console.log('FROM SIGN IN : ');
        console.log(user, account, profile, email, credentials);
        return true;
      },
      async redirect({ url, baseUrl }) {
        return baseUrl;
      },
      async session({ session, token, user }) {
        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        console.log('FROM JWT : ');
        console.log(user, account, profile, isNewUser);
        return token;
      },
    },
    events: {
      async updateUser({ user }) {
        console.log('UPDATED USER');
        console.log(user);
      },
      async signIn(message) {
        console.log('UPDATED SIGN IN');
        console.log(message);
      },
      async signOut(message) {
        /* on signout */
        console.log('USER SIGN OUT', message.session, message.token);
        console.log(message);
      },
      async createUser(message) {
        /* user created */
        // console.log(message);
      },

      async linkAccount(message) {
        /* account (e.g. Twitter) linked to a user */
        // console.log(message);
      },
      async session(message) {
        /* session is active */
        // console.log(message);
      },
    },
    secret: process.env.AUTH_SECRET,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    debug: true,
  });
