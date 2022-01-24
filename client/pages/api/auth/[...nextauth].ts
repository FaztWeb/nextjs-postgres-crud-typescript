// all global configuration for the Next Auth

import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'utils/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_USER_ID,
      clientSecret: process.env.GITHUB_USER_SECRET,
    }),
  ],
});
