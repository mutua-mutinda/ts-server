import { Request, Response, NextFunction } from "express";
import { get, controller, post, bodyValidator } from "./decorators";

@controller("/auth")
class LoginController {
  @get("/login")
  getLogin(req: Request, res: Response): void {
    res.send(`
          <form method="POST">
          <div>
          <div>
              <label> Email</label>
              <input name="email"/>
          </div> <br>
          <div>
              <label> Password</label>
              <input name="password" type="password" required/>
          </div> <br>
          <button>Submit</button>
          </div>
          </form>
        `);
  }

  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email === "m@m.com" && password === "incorrect") {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.send("Invalid user");
    }
  }

  @get("/logout")
  getLogout(req: Request, res: Response) {
    req.session = null;
    res.redirect("/");

    // if ((req.session = { loggedIn: false })) {
    //   res.redirect("/");
    // }
  }
}
