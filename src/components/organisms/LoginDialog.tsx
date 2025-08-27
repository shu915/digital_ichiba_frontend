import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignInWithGoogle from "../atoms/SignInWithGoogle";

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
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <SignInWithGoogle />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
