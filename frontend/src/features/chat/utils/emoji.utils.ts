const EMOJI_ONLY_REGEX = /^(?:\p{Extended_Pictographic}|\u200D|\uFE0F|\s)+$/u;

export const isEmojiOnlyMessage = (content: string | null): boolean => {
  if (!content) return false;

  const trimmed = content.trim();
  if (!trimmed || !EMOJI_ONLY_REGEX.test(trimmed)) return false;

  const emojis = trimmed.replace(/\s+/g, "").match(/\p{Extended_Pictographic}/gu) ?? [];
  return emojis.length >= 1 && emojis.length <= 3;
};
