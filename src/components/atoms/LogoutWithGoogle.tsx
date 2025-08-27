import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function SignInWithGoogle() {
  return (
    <form
      className="w-xs mx-auto"
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/auth/callback" });
      }}
    >
      <Button type="submit" className="rounded-full w-full">
        <FontAwesomeIcon icon={faGoogle} />
        Googleで続行
      </Button>
    </form>
  );
}
