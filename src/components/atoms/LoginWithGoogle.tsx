import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { handleGoogleLogin } from "@/actions/handleGoogleLogin";

export default function LoginWithGoogle() {
  return (
    <form className="w-full max-w-xs mx-auto" action={handleGoogleLogin}>
      <Button
        type="submit"
        className="rounded-full w-full flex items-center justify-center gap-2 whitespace-normal leading-tight"
      >
        <FontAwesomeIcon icon={faGoogle} />
        Googleで続行
      </Button>
    </form>
  );
}
