export const SOCKET_INIT = 'SOCKET_INIT';
export type WsInitType = {
  type: typeof SOCKET_INIT;
};

export const SOCKET_CONNECT = 'SOCKET_CONNECT';
export type WsConnectType = {
  type: typeof SOCKET_CONNECT;
};

export const SOCKET_CLOSE = 'SOCKET_CLOSE';
export type WsCloseType = {
  type: typeof SOCKET_CLOSE;
};

export const UPDATE_STATUS = 'UPDATE_STATUS';
export type WsUpdateStatusType = {
  type: typeof UPDATE_STATUS;
};
export const UPDATE_PRICE = 'UPDATE_PRICE';
export type UpdatePriceType = {
  type: typeof UPDATE_PRICE;
  data: {
    itemId: number;
    newPrice: number;
  };
};
export const SEND_MESSAGE = 'SEND_MESSAGE';
export type SendMessageType = {
  type: typeof SEND_MESSAGE;
  payload: {
    message: string;
    recipient: string;
  };
};

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export type ReceiveMessageType = {
  type: typeof RECEIVE_MESSAGE;
  payload: {
    message: string;
    sender: string;
  };
};

export type WsActionTypes = 
  | WsInitType 
  | WsConnectType 
  | WsUpdateStatusType 
  | WsCloseType 
  | UpdatePriceType
  | SendMessageType
  | ReceiveMessageType;
