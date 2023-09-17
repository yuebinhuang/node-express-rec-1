import { SessionData } from "express-session";
import { NotAllowedError, UnauthenticatedError } from "./errors";

export type WebSessionDoc = SessionData;

// This allows us to overload express session data type.
declare module "express-session" {
  export interface SessionData {
    // This will not be our final implementation! Starting next week, we will have a User concept with a
    // more rigorous implementation than a string representing the username.
    user?: string;
  }
}

export default class WebSessionConcept {
  setUser(session: WebSessionDoc, username: string | undefined) {
    session.user = username;
  }

  getUser(session: WebSessionDoc) {
    this.isLoggedIn(session);
    return session.user!;
  }

  isLoggedIn(session: WebSessionDoc) {
    if (session.user === undefined) {
      throw new UnauthenticatedError("Not logged in!");
    }
  }

  isLoggedOut(session: WebSessionDoc) {
    if (session.user !== undefined) {
      throw new NotAllowedError("Must be logged out!");
    }
  }
}
