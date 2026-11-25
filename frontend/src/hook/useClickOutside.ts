import { useEffect, useRef, type RefObject } from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onClickOutside: () => void
) {
  const handlerRef = useRef(onClickOutside);

  useEffect(() => {
    handlerRef.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handlerRef.current();
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [ref]);
}
