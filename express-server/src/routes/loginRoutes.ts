import { Router, Request, Response, NextFunction } from 'express';

// To fix unsatisfying express types file
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not permitted');
}

const loginRouter = Router();

loginRouter.get('/', (req: Request, res: Response) => {
  if (req.session) {
    const isLoggedIn = req.session.loggedIn;

    if (isLoggedIn) {
      res.send(`
        <div>
          <h1>Hi There!</h1>
          <div>You are logged in</div>
          <a href="/logout">Logout</a>
        </div>
      `);
    } else {
      res.send(`
        <div>
          <div>You are not logged in</div>
          <a href="/login">Login</a>
        </div>
      `)
    }
  }
});

loginRouter.get('/login', (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  `)
});

loginRouter.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  const isAuthenticated = email === 'test@mail.com' && password === '333';

  if (email && password && isAuthenticated) {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});

loginRouter.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
})

loginRouter.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route!');
})

export { loginRouter };