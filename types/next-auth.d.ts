import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    googleId?: string;
  }

  interface Session {
    user: {
      googleId?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    googleId?: string;
    picture?: string;
  }
}