import { AccessToken } from "livekit-server-sdk";
import { env } from "../../../../config/env.js";

export interface LiveKitTokenParams {
  roomName: string;
  participantIdentity: string;
  participantName: string;
}

export interface LiveKitTokenResult {
  token: string;
  serverUrl: string;
}

export class LiveKitService {
  generateRoomToken = async ({roomName,participantIdentity,participantName}: LiveKitTokenParams): Promise<LiveKitTokenResult> => {
    const accessToken = new AccessToken(
      env.livekit.apiKey,
      env.livekit.apiSecret,
      {
        identity: participantIdentity,
        name: participantName,
        ttl: "1h",
      }
    );

    accessToken.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    const token = await accessToken.toJwt();

    return {
      token,
      serverUrl: env.livekit.url,
    };
  };
}
