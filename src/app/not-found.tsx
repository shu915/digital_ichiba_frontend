import PageTitle from "@/components/atoms/PageTitle";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <PageTitle title="404 Not Found" />
        <p className="text-muted-foreground mt-2">
          お探しのページは削除または移動されました。
        </p>
      </div>
    </div>
  );
}
