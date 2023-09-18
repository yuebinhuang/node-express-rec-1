import { Router, getExpressRouter } from "./framework/router";

import { WebSession } from "./app";
import { WebSessionDoc } from "./concepts/websession";

class Routes {
  @Router.post("/login")
  async logIn(session: WebSessionDoc, username: string) {
    WebSession.start(session, username);
    return { msg: "Logged in!", user: username };
  }

  @Router.post("/logout")
  async logOut(session: WebSessionDoc) {
    WebSession.end(session);
    return { msg: "Logged out!" };
  }

  // If we had more concepts working, we'd add routes for those here too!
}

export default getExpressRouter(new Routes());
