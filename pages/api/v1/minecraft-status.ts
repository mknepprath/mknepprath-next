import { Client, PacketWriter, State } from "mcproto";
import { NextApiRequest, NextApiResponse } from "next";

export interface Status {
  online: boolean;
  version: {
    name: string;
    protocol: number;
  };
  players: {
    max: number;
    online: number;
  };
  description: string;
  favicon?: string;
  ping?: number;
}

export interface StatusOptions {
  /** @default true */
  checkPing?: boolean;
  /** @default 5000 // ms */
  timeout?: number;
  /** @default 736 // 1.16.1 */
  protocol?: number;
}

const defaultOptions: Partial<StatusOptions> = {
  checkPing: true,
  timeout: 5000,
  protocol: 736,
};

export default async function getStatus(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { host, port } = req.query;

  const client = await Client.connect(host as string, port ? +port : 0, {
    connectTimeout: defaultOptions.timeout,
    timeout: defaultOptions.timeout,
  }).catch((err) => console.error("connection error", err.stack));

  if (!client) {
    res.status(404);
    res.end(
      JSON.stringify({
        online: false,
        version: {
          name: "",
          protocol: 0,
        },
        players: {
          max: 0,
          online: 0,
        },
        description: "",
      })
    );
  } else {
    client.send(
      new PacketWriter(0x0)
        .writeVarInt(defaultOptions.protocol!)
        .writeString(host as string)
        .writeUInt16(client.socket.remotePort!)
        .writeVarInt(State.Status)
    );

    client.send(new PacketWriter(0x0));

    const status: Status = (await client.nextPacket()).readJSON();

    status.online = true;

    if (defaultOptions.checkPing) {
      client.send(new PacketWriter(0x1).write(Buffer.alloc(8)));
      const start = Date.now();

      await client.nextPacket(0x1);
      status.ping = Date.now() - start;
    }

    client.end();

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (process.env.NODE_ENV !== "development")
      res.setHeader("Cache-Control", "max-age=86400");
    res.end(JSON.stringify(status));
  }
}
