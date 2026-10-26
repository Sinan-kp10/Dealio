export function FullPageSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_50%_0%,#f7faff_0%,#edf3f9_100%)]">
      <div className="w-12 h-12 animate-spin rounded-full border-4 border-[#355982]/20 border-t-[#355982]" />
    </div>
  );
}

export default FullPageSpinner;
