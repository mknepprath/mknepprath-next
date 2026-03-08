import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { Socket } from 'net';

export interface NextApiResponseServerIO extends NextApiResponse {
  socket: Socket & {
    server: any & {
      io: SocketIOServer;
    };
  };
}