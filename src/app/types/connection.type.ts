export enum Connection {
  NEW_MESSAGE = 'newMessage',
  SUBSCRIBE_TO_CONVERSATION = 'subscribeToConversation',
  RECEIVE_SUBSCRIBE_CONVERSATION = 'receiveSubscribeConversation',
  RECEIVE_MESSAGE= "receiveMessage",
  CONNECT_ROOM = 'connectRoom',
  JOIN_ROOM = 'joinRoom',
  CONNECT_ADMIN = 'connectAdmin',
  SEND_USER_REPLY = 'sendAdminReply',
  DISCONNECT_ADMIN = 'disconnectAdmin',
  CREATE_CONVERSATION = 'createConversation',
  END_CHAT = 'endChat',
}
