const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const apiRouter = require('./routes/apiRouter');
const FileStore = require('session-file-store')(session);

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET ?? 'test',
    resave: true,
    store: new FileStore(),
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 12,
      httpOnly: true,
    },
  }),
);
app.use((req, res, next) => {
  res.locals.path = req.originalUrl;
  res.locals.user = req.session?.user;
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
