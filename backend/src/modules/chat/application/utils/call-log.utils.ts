import type { CallLogStatus } from "../dto/message.dto.js";

const formatCallDuration = (totalSeconds: number): string => {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;

  if (mins === 0) return `${secs}s`;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
};

export const formatCallContent = (status: CallLogStatus,durationSeconds?: number): string => {
  if (status === "COMPLETED") {
    const durationText = formatCallDuration(durationSeconds ?? 0);
    return `Video call · ${durationText}`;
  }
  if (status === "DECLINED") {
    return "Declined video call";
  }
  return "Missed video call";
};
