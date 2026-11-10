import { Loader2 } from "lucide-react";

export function FullPageSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <Loader2 size={38} strokeWidth={2.2} className="animate-spin text-[#355982]" />
    </div>
  );
}

export default FullPageSpinner;
