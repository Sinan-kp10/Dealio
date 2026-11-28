import { useEffect, useRef, useState } from "react";
import {
  isTrackReference,
  LiveKitRoom,
  RoomAudioRenderer,
  useLocalParticipant,
  useMediaDeviceSelect,
  useTracks,
  VideoTrack,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { ChevronUp, Mic, MicOff, PhoneOff, Video, VideoOff } from "lucide-react";
import { toast } from "react-toastify";
import { useClickOutside } from "../../../hook/useClickOutside";
import type { VideoCallState } from "../hooks/useVideoCall";

interface VideoCallModalProps {
  callState: VideoCallState;
  onEndCall: () => void;
}

interface VideoStageProps {
  participantName: string;
  participantAvatarUrl: string | null;
  onEndCall: () => void;
}

const formatElapsedTime = (totalSeconds: number): string => {
  const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const secs = String(totalSeconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
};

function VideoStage({
  participantName,
  participantAvatarUrl,
  onEndCall,
}: VideoStageProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [openMenu, setOpenMenu] = useState<"mic" | "camera" | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  useClickOutside(controlsRef, () => setOpenMenu(null));

  const { localParticipant, isMicrophoneEnabled, isCameraEnabled } = useLocalParticipant();
  const micSelect = useMediaDeviceSelect({ kind: "audioinput" });
  const cameraSelect = useMediaDeviceSelect({ kind: "videoinput" });

  const tracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: false }],
    { onlySubscribed: false }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const remoteTrack = tracks.find(
    (track) => isTrackReference(track) && !track.participant.isLocal
  );
  const localTrack = tracks.find(
    (track) => isTrackReference(track) && track.participant.isLocal
  );

  const isRemoteVideoActive = Boolean(
    remoteTrack && isTrackReference(remoteTrack) && !remoteTrack.publication.isMuted
  );

  const handleToggleMic = () => {
    void localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
  };

  const handleToggleCamera = () => {
    void localParticipant.setCameraEnabled(!isCameraEnabled);
  };

  return (
    <div className="relative flex-1 min-h-0 w-full h-full bg-slate-950 overflow-hidden select-none">
      {isRemoteVideoActive && remoteTrack && isTrackReference(remoteTrack) ? (
        <VideoTrack
          trackRef={remoteTrack}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="relative mb-4">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#2f5581] text-white flex items-center justify-center overflow-hidden shadow-xl ring-4 ring-white/10">
              {participantAvatarUrl ? (
                <img
                  src={participantAvatarUrl}
                  alt={participantName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                </svg>
              )}
            </div>
            <span className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 text-slate-300 flex items-center justify-center shadow-md">
              <VideoOff size={15} />
            </span>
          </div>
          <p className="text-base sm:text-lg font-semibold text-white m-0">
            {participantName}
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 m-0">
            {remoteTrack ? "Camera is off" : "Connecting video..."}
          </p>
        </div>
      )}

      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between gap-3 pointer-events-none">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/10 max-w-[70%]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-white truncate">
            {participantName}
          </span>
        </div>

        <div className="px-3 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/10 text-xs font-mono font-medium text-slate-200">
          {formatElapsedTime(elapsedSeconds)}
        </div>
      </div>

      <div className="absolute bottom-24 right-4 sm:bottom-28 sm:right-6 w-32 h-44 sm:w-48 sm:h-36 md:w-64 md:h-48 lg:w-72 lg:h-52 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/25 bg-slate-900 flex items-center justify-center">
        {localTrack && isTrackReference(localTrack) && isCameraEnabled ? (
          <VideoTrack
            trackRef={localTrack}
            className="w-full h-full object-cover -scale-x-100"
          />
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-slate-400 p-2 text-center">
            <VideoOff size={22} />
            <span className="text-xs font-medium">Camera off</span>
          </div>
        )}
      </div>

      <div
        ref={controlsRef}
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2.5 sm:gap-3.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-2xl"
      >
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={handleToggleMic}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              isMicrophoneEnabled
                ? "bg-white/15 hover:bg-white/25 text-white"
                : "bg-white text-slate-900"
            }`}
            aria-label={isMicrophoneEnabled ? "Mute microphone" : "Unmute microphone"}
          >
            {isMicrophoneEnabled ? <Mic size={20} /> : <MicOff size={20} />}
          </button>

          {micSelect.devices.length > 1 && (
            <button
              type="button"
              onClick={() => setOpenMenu((prev) => (prev === "mic" ? null : "mic"))}
              className="ml-0.5 p-1 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Select microphone"
            >
              <ChevronUp size={14} />
            </button>
          )}

          {openMenu === "mic" && (
            <div className="absolute bottom-14 left-0 w-56 sm:w-64 p-1.5 bg-slate-900 border border-white/15 rounded-2xl shadow-2xl z-30">
              <p className="px-2.5 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider m-0">
                Microphone
              </p>
              {micSelect.devices.map((device) => (
                <button
                  key={device.deviceId}
                  type="button"
                  onClick={() => {
                    void micSelect.setActiveMediaDevice(device.deviceId);
                    setOpenMenu(null);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-xl text-xs truncate transition-colors cursor-pointer ${
                    device.deviceId === micSelect.activeDeviceId
                      ? "bg-[#2f5581] text-white font-semibold"
                      : "text-slate-200 hover:bg-white/10"
                  }`}
                >
                  {device.label || "Microphone"}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex items-center">
          <button
            type="button"
            onClick={handleToggleCamera}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              isCameraEnabled
                ? "bg-white/15 hover:bg-white/25 text-white"
                : "bg-white text-slate-900"
            }`}
            aria-label={isCameraEnabled ? "Turn camera off" : "Turn camera on"}
          >
            {isCameraEnabled ? <Video size={20} /> : <VideoOff size={20} />}
          </button>

          {cameraSelect.devices.length > 1 && (
            <button
              type="button"
              onClick={() => setOpenMenu((prev) => (prev === "camera" ? null : "camera"))}
              className="ml-0.5 p-1 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Select camera"
            >
              <ChevronUp size={14} />
            </button>
          )}

          {openMenu === "camera" && (
            <div className="absolute bottom-14 left-0 w-56 sm:w-64 p-1.5 bg-slate-900 border border-white/15 rounded-2xl shadow-2xl z-30">
              <p className="px-2.5 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider m-0">
                Camera
              </p>
              {cameraSelect.devices.map((device) => (
                <button
                  key={device.deviceId}
                  type="button"
                  onClick={() => {
                    void cameraSelect.setActiveMediaDevice(device.deviceId);
                    setOpenMenu(null);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-xl text-xs truncate transition-colors cursor-pointer ${
                    device.deviceId === cameraSelect.activeDeviceId
                      ? "bg-[#2f5581] text-white font-semibold"
                      : "text-slate-200 hover:bg-white/10"
                  }`}
                >
                  {device.label || "Camera"}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onEndCall}
          className="w-12 h-11 sm:w-14 sm:h-12 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer active:scale-95"
          aria-label="End call"
        >
          <PhoneOff size={20} />
        </button>
      </div>
    </div>
  );
}

export function VideoCallModal({ callState, onEndCall }: VideoCallModalProps) {
  if (callState.status !== "active") {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-label={`Video call with ${callState.participantName}`}
    >
      <LiveKitRoom
        serverUrl={callState.serverUrl}
        token={callState.token}
        connect={true}
        video={true}
        audio={true}
        onError={(error) => {
          toast.error(error.message || "Video call connection failed.");
        }}
        className="flex-1 min-h-0 flex flex-col"
      >
        <VideoStage
          participantName={callState.participantName}
          participantAvatarUrl={callState.participantAvatarUrl}
          onEndCall={onEndCall}
        />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
}

export default VideoCallModal;
