const { WebSocketServer } = require('ws');
const { User, Item } = require('../db/models');

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

wss.on('connection', (ws, request, wsMap) => {
  const { id } = request.session.user;

  wsMap.set(id, { ws, user: request.session.user });

  for (const [, wsClient] of wsMap) {
    wsClient.ws.send(
      JSON.stringify({
        type: 'friends/setFriendsOnline',
        payload: Array.from(wsMap.values()).map((el) => el.user),
      }),
    );
  }

  ws.on('message', async (data) => {
    const { type, payload } = JSON.parse(data);
    switch (type) {
      case 'UPDATE_STATUS': {
        const user = await User.findByPk(id);
        user.status = payload.status;
        await user.save();
        wsMap.set(id, { ws, user });

        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            JSON.stringify({
              type: 'friends/setFriendsOnline',
              payload: Array.from(wsMap.values()).map((el) => el.user),
            }),
          );
        }
        break;
      }
      case 'UPDATE_PRICE': {
        const { id, countBid,userId } = payload;
        const item = await Item.findByPk(id);
        item.price += countBid;
        item.lastUser_id = userId;
        await item.save();
        wsMap.set(id, { ws, item });

        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            
           
            JSON.stringify({
              type: 'sort/updateItemPrice',
              payload: item,
            }),
          );
        }
        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            
           
            JSON.stringify({
              type: 'top/updateItemPrice',
              payload: item,
            }),
          );
        }

        break;
      }
      default:
        break;
    }
  });

  ws.on('error', () => {
    wsMap.delete(id);
    for (const [, wsClient] of wsMap) {
      wsClient.ws.send(
        JSON.stringify({
          type: 'friends/setFriendsOnline',
          payload: Array.from(wsMap.values()).map((el) => el.user),
        }),
      );
    }
  });

  ws.on('close', () => {
    wsMap.delete(id);
    for (const [, wsClient] of wsMap) {
      wsClient.ws.send(
        JSON.stringify({
          type: 'friends/setFriendsOnline',
          payload: Array.from(wsMap.values()).map((el) => el.user),
        }),
      );
    }
  });
});

module.exports = wss;
