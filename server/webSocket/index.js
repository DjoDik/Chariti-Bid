const { WebSocketServer } = require('ws');
const { Chat, Item, FotoGalery,User } = require('../db/models');

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
      case 'SEND_MESSAGE': {
       
        const {item_id,userId,body} = payload
        console.log(payload)
        await Chat.create({ item_id,user_id:userId,body});
        const messages =  await Item.findAll({
          where: {
            lastUser_id: id,
            sellStatus: true,
          },
          include: [
            {
              model: Chat,
            },
            {
              model: User,
              as: 'Users',
            },
          ],
        });
        const mess = JSON.parse(JSON.stringify(messages)).map((el) => ({
          name: el.Users.map((user) => user.name),
          id: el.Users.map((user) => user.id),
          message: el.Chats.body,
          msId: el.Chats.id
        }));
        wsMap.set(id, { ws, mess });

        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            JSON.stringify({
              type: 'chat/updateMessage',
              payload: Array.from(wsMap.values()).map((el) => el.message),
            }),
          );
        }
        break;
      }
      case 'UPDATE_PRICE': {
        const { id, countBid, userId } = payload;
        console.log('countBid', countBid);
        const item = await Item.findByPk(id, {
          include: { model: FotoGalery },
        });
        if (countBid === 0 && item.lastUser_id !== null) {
          return
         
        }
        if (countBid === 0 && item.lastUser_id === null) {
          item.lastUser_id = userId;
          await item.save();
        }
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
