import { Router, getExpressRouter } from "./framework/router";

import { WebSession } from "./app";
import { WebSessionDoc } from "./concepts/websession";

class Routes {
  @Router.post("/login")
  async logIn(session: WebSessionDoc, username: string) {
    // TODO: Make sure the user is logged out before allowing someone to log in.
    // Hint: Take a look at how the logOut function makes sure the user is logged
    // in before allowing a log out action.
    WebSession.setUser(session, username);
    return { msg: "Logged in!", user: username };
  }

  @Router.post("/logout")
  async logOut(session: WebSessionDoc) {
    // We make sure the user is logged in before allowing a log out action.
    // isLoggedIn throws an error if the user is not loged in.
    WebSession.isLoggedIn(session);
    WebSession.setUser(session, undefined);
    return { msg: "Logged out!" };
  }

  // If we had more concepts working, we'd add routes for those here too!
}

export default getExpressRouter(new Routes());
