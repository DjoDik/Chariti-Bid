/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const http = require('http');
const FileStore = require('session-file-store')(session);
const wss = require('./webSocket');
const indexRouter = require('./routes/indexRouter');
const sortRouter = require('./routes/sortRouter');
const userRouter = require('./routes/userRouter');
const userItemRouter = require('./routes/userItemRouter');
const apiRouter = require('./routes/apiRouter');
const itemRouter = require('./routes/itemRouter');
const photoRouter = require('./routes/photoRouter');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));

const sessionParser = session({
  name: 'sid_socket',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
});
app.use(sessionParser);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('uploads'));

app.use((req, res, next) => {
  res.locals.path = req.originalUrl;
  res.locals.user = req.session?.user;
  next();
});

app.use('/', indexRouter);
app.use('/sort', sortRouter);
app.use('/user', userRouter);
app.use('/useritem', userItemRouter);
app.use('/api', apiRouter);
app.use('/api/item', itemRouter)
app.use('/add', photoRouter);
const server = http.createServer(app);

const map = new Map();

server.on('upgrade', (request, socket, head) => {
  console.log('Parsing session from request...');

  sessionParser(request, {}, () => {
    if (!request.session.user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    console.log('Session is parsed!');

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request, map);
    });
  });
});

server.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));




