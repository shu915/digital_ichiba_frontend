import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import SignInWithGoogle from "../atoms/LogoutWithGoogle";

export default function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger className="text-white font-bold cursor-pointer">
        ログイン
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            ログイン
          </DialogTitle>
          <DialogDescription className="text-center text-red-500">
            初回登録もこちらから
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <SignInWithGoogle />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
