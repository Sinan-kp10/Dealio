import { PhoneOff, Video } from "lucide-react";
import type { VideoCallState } from "../hooks/useVideoCall";

interface IncomingCallModalProps {
  callState: VideoCallState;
  onAccept: () => void;
  onDecline: () => void;
  onCancel: () => void;
}

export function IncomingCallModal({callState,onAccept,onDecline,onCancel}: IncomingCallModalProps) {
  if (callState.status !== "incoming" && callState.status !== "calling") {
    return null;
  }

  const isIncoming = callState.status === "incoming";

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-label={isIncoming ? "Incoming video call" : "Outgoing video call"}
    >
      <div className="w-full max-w-xs sm:max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-6 sm:p-8 flex flex-col items-center text-center">
        <div className="relative mb-5">
          <div className="w-20 h-20 rounded-full bg-[#2f5581] text-white flex items-center justify-center overflow-hidden shadow-md ring-4 ring-[#2f5581]/15">
            {callState.participantAvatarUrl ? (
              <img
                src={callState.participantAvatarUrl}
                alt={callState.participantName}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
              </svg>
            )}
          </div>
          <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#2f5581] text-white flex items-center justify-center shadow-sm border-2 border-white">
            <Video size={14} />
          </span>
        </div>

        <h3 className="text-lg font-bold text-[#0e2238] truncate max-w-full m-0">
          {callState.participantName}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 mb-7 m-0 animate-pulse">
          {isIncoming ? "Incoming video call..." : "Ringing..."}
        </p>

        {isIncoming ? (
          <div className="flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={onDecline}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
              aria-label="Decline call"
            >
              <span className="w-13 h-13 rounded-full bg-rose-500 group-hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition-transform group-active:scale-95">
                <PhoneOff size={20} />
              </span>
              <span className="text-xs font-medium text-slate-600">Decline</span>
            </button>

            <button
              type="button"
              onClick={onAccept}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
              aria-label="Accept call"
            >
              <span className="w-13 h-13 rounded-full bg-emerald-500 group-hover:bg-emerald-600 text-white flex items-center justify-center shadow-md transition-transform group-active:scale-95">
                <Video size={20} />
              </span>
              <span className="text-xs font-medium text-slate-600">Accept</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onCancel}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
            aria-label="Cancel call"
          >
            <span className="w-13 h-13 rounded-full bg-rose-500 group-hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition-transform group-active:scale-95">
              <PhoneOff size={20} />
            </span>
            <span className="text-xs font-medium text-slate-600">Cancel</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default IncomingCallModal;
