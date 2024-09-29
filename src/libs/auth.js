import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { connectDB } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(await connectDB()),
  providers: [Github],
});
