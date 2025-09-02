export default function Loading() {
  return (
    <div className="grid min-h-[100svh] w-full place-items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
        <span className="text-sm text-gray-500">読み込み中...</span>
      </div>
    </div>
  );
}
