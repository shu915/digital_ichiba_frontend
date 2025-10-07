import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { handleGoogleLogin } from "@/actions/handleGoogleLogin";

export default function LoginWithGoogle() {
  return (
    <form className="w-xs mx-auto" action={handleGoogleLogin}>
      <Button type="submit" className="rounded-full w-full">
        <FontAwesomeIcon icon={faGoogle} />
        Googleで続行
      </Button>
    </form>
  );
}
