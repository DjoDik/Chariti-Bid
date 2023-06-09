const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const indexRouter = require('./routes/indexRouter');
const sortRouter = require('./routes/sortRouter');
const userRouter = require('./routes/userRouter');
const userItemRouter = require('./routes/userItemRouter');

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

app.use('/', indexRouter);
app.use('/sort', sortRouter);
app.use('/user', userRouter);
app.use('/useritem', userItemRouter)
app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
