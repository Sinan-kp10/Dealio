import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import socket from "../../../services/socket.service";

interface CallTokenResponse {
  roomName: string;
  token: string;
  serverUrl: string;
}

interface SocketResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

interface IncomingCallPayload {
  chatId: string;
  callerId: string;
  callerName: string;
  callerAvatarUrl: string | null;
}

interface CallEventPayload {
  chatId: string;
}

export type VideoCallState =
  | { status: "idle" }
  | {
      status: "calling";
      chatId: string;
      participantName: string;
      participantAvatarUrl: string | null;
      token: string;
      serverUrl: string;
    }
  | {
      status: "incoming";
      chatId: string;
      callerId: string;
      participantName: string;
      participantAvatarUrl: string | null;
    }
  | {
      status: "active";
      chatId: string;
      participantName: string;
      participantAvatarUrl: string | null;
      token: string;
      serverUrl: string;
    };

export interface StartCallParams {
  chatId: string;
  participantName: string;
  participantAvatarUrl: string | null;
  callerName: string;
  callerAvatarUrl?: string | null;
}

export function useVideoCall() {
  const [callState, setCallState] = useState<VideoCallState>({ status: "idle" });

  useEffect(() => {
    const handleIncoming = (payload: IncomingCallPayload) => {
      setCallState((prev) => {
        if (prev.status !== "idle") return prev;
        return {
          status: "incoming",
          chatId: payload.chatId,
          callerId: payload.callerId,
          participantName: payload.callerName,
          participantAvatarUrl: payload.callerAvatarUrl,
        };
      });
    };

    const handleAccepted = ({ chatId }: CallEventPayload) => {
      setCallState((prev) => {
        if (prev.status !== "calling" || prev.chatId !== chatId) return prev;
        return {
          status: "active",
          chatId: prev.chatId,
          participantName: prev.participantName,
          participantAvatarUrl: prev.participantAvatarUrl,
          token: prev.token,
          serverUrl: prev.serverUrl,
        };
      });
    };

    const handleDeclined = ({ chatId }: CallEventPayload) => {
      setCallState((prev) => {
        if (prev.status === "idle" || prev.chatId !== chatId) return prev;
        toast.info("Call was declined.");
        return { status: "idle" };
      });
    };

    const handleReset = ({ chatId }: CallEventPayload) => {
      setCallState((prev) => {
        if (prev.status === "idle" || prev.chatId !== chatId) return prev;
        return { status: "idle" };
      });
    };

    socket.on("call:incoming", handleIncoming);
    socket.on("call:accepted", handleAccepted);
    socket.on("call:declined", handleDeclined);
    socket.on("call:missed", handleReset);
    socket.on("call:cancelled", handleReset);
    socket.on("call:ended", handleReset);

    return () => {
      socket.off("call:incoming", handleIncoming);
      socket.off("call:accepted", handleAccepted);
      socket.off("call:declined", handleDeclined);
      socket.off("call:missed", handleReset);
      socket.off("call:cancelled", handleReset);
      socket.off("call:ended", handleReset);
    };
  }, []);

  const startCall = useCallback(
    ({
      chatId,
      participantName,
      participantAvatarUrl,
      callerName,
      callerAvatarUrl,
    }: StartCallParams) => {
      if (!socket.connected) {
        toast.error("Socket disconnected. Please try again.");
        return;
      }

      socket.emit(
        "call:initiate",
        { chatId, callerName, callerAvatarUrl: callerAvatarUrl ?? null },
        (response: SocketResponse<CallTokenResponse>) => {
          if (response.success && response.data) {
            setCallState({
              status: "calling",
              chatId,
              participantName,
              participantAvatarUrl,
              token: response.data.token,
              serverUrl: response.data.serverUrl,
            });
          } else {
            toast.error(response.error || "Unable to start video call.");
          }
        }
      );
    },
    []
  );

  const acceptCall = useCallback(
    (calleeName: string) => {
      if (callState.status !== "incoming") return;

      const { chatId, participantName, participantAvatarUrl } = callState;
      socket.emit(
        "call:accept",
        { chatId, calleeName },
        (response: SocketResponse<CallTokenResponse>) => {
          if (response.success && response.data) {
            setCallState({
              status: "active",
              chatId,
              participantName,
              participantAvatarUrl,
              token: response.data.token,
              serverUrl: response.data.serverUrl,
            });
          } else {
            toast.error(response.error || "Call is no longer active.");
            setCallState({ status: "idle" });
          }
        }
      );
    },
    [callState]
  );

  const declineCall = useCallback(() => {
    if (callState.status !== "incoming") return;
    socket.emit("call:decline", callState.chatId);
    setCallState({ status: "idle" });
  }, [callState]);

  const cancelCall = useCallback(() => {
    if (callState.status !== "calling") return;
    socket.emit("call:cancel", callState.chatId);
    setCallState({ status: "idle" });
  }, [callState]);

  const endCall = useCallback(() => {
    if (callState.status !== "active") return;
    socket.emit("call:end", callState.chatId);
    setCallState({ status: "idle" });
  }, [callState]);

  return {
    callState,
    startCall,
    acceptCall,
    declineCall,
    cancelCall,
    endCall,
  };
}
