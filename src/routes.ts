
import { Router, getExpressRouter } from "./framework/router";

import { WebSession } from "./app";
import { WebSessionDoc } from "./concepts/websession";

class Routes {
  @Router.post("/login")
  async logIn(session: WebSessionDoc, username: string) {
    // This is an example of "middleware". We make sure the user is logged out before allowing
    // someone to log in again. isLoggedOut throws an error if the user is not logged out.
    WebSession.isLoggedOut(session);
    WebSession.setUser(session, username);
    return { msg: "Logged in!", user: username };
  }

  @Router.post("/logout")
  async logOut(session: WebSessionDoc) {
    // We make sure the user is logged in before allowing them to log out.
    WebSession.isLoggedIn(session);
    WebSession.setUser(session, undefined);
    return { msg: "Logged out!" };
  }
}

export default getExpressRouter(new Routes());
