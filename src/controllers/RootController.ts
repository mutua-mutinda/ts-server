import { Request, Response, NextFunction } from "express";
import { get, controller, use, bodyValidator } from "./decorators";

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("Dead End");
}

@controller("")
class RootController {
  @get("/")
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
          <div>
          <div>You're logged in</div> <br>
          <a href="/auth/logout"><u>log out</u></a>
          </div>
          `);
    } else {
      res.send(`
          <div>
          <div>You're not logged in</div> <br>
          <a href="/auth/login"><u>log in</u></a>
          </div>`);
    }
  }

  @get("/protected")
  @use(requireAuth)
  getProtected(req: Request, res: Response, next: NextFunction) {
    res.send(`
    <div>
    <div>Welcome to the protected route</div> <br>
    <div>Have some Matcha tea</div>
    <img style="height:70px; width:70px;" src="https://images.japancentre.com/recipes/pics/16/main/matcha-latte.jpg?1469572822"</img>
    </div>
    `);
  }
}
