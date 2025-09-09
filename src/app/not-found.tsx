import { Quicksand } from "next/font/google";
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h2 className={`text-6xl font-bold ${quicksand.className}`}>404 Not Found</h2>
        <p className="text-muted-foreground mt-4">
          お探しのページは削除または移動されました。
        </p>
      </div>
    </div>
  );
}
