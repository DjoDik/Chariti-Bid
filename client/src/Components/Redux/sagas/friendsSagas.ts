import type { ActionPattern } from 'redux-saga/effects';
import { take, put, call, takeEvery, fork } from 'redux-saga/effects';
import type { EventChannel } from 'redux-saga';
import { eventChannel, END } from 'redux-saga';
import { SEND_MESSAGE, SOCKET_CLOSE, SOCKET_CONNECT, SOCKET_INIT, UPDATE_PRICE, UPDATE_STATUS } from '../../types/wsTypes';
import type { WsActionTypes } from '../../types/wsTypes';

function createSocketChannel(socket: WebSocket): EventChannel<WsActionTypes> {
  return eventChannel((emit) => {
    socket.onopen = () => {
      emit({ type: SOCKET_CONNECT });
    };

    socket.onerror = function (error) {
      emit({ type: SOCKET_CLOSE });
    };

    socket.onmessage = function (event: MessageEvent<string>) {
      const receivedData = JSON.parse(event.data) as WsActionTypes;
      emit(receivedData);
    };

    socket.onclose = function (event) {
      emit({ type: SOCKET_CLOSE });
    };

    return () => {
      console.log('Socket off');
      emit(END);
    };
  });
}

function* updatePrice(socket: WebSocket): Generator {
  while (true) {
    const message = yield take(UPDATE_PRICE);
    socket.send(JSON.stringify(message));
  }
}
function* updateMessage(socket: WebSocket): Generator {
  while (true) {
    const message = yield take(SEND_MESSAGE);
    socket.send(JSON.stringify(message));
  }
}
function* friendsListWorker(): Generator<unknown, void, WsActionTypes> {
  const socket = new WebSocket(import.meta.env.VITE_WS_URL);
  const socketChannel = yield call(createSocketChannel, socket);

  yield fork(updatePrice, socket);
  yield fork(updateMessage, socket);
  while (true) {
    try {
      const backAction = yield take(socketChannel as unknown as ActionPattern<WsActionTypes>);
      yield put(backAction);
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

export default function* initWebSocketWatcher(): Generator {
  yield takeEvery(SOCKET_INIT, friendsListWorker);
  // yield takeEvery(UPDATE_PRICE, updatePrice);
}
