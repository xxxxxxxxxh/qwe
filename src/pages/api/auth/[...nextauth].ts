import type { User } from '@/interfaces';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { registerUser, logoutUser } from '@/server';

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
      authorization: {
        params: { scope: 'identify guilds.join', prompt: 'none' }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = {
          ...profile,
          accessToken: account?.access_token
        };
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user && token.user) {
        const user = await registerUser(token.user as User);
        if (!user) await logoutUser();
        session.user = {
          ...user
        };
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: 'jwt',
    maxAge: 604800
  },
  pages: {
    signIn: '/login',
    error: '/'
  }
};

export default NextAuth(authOptions);
