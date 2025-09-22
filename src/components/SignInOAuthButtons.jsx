import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <div>
      <Button
        variant={"secondary"}
        onClick={signInWithGoogle}
        className="w-full text-white border-zinc-200 h-11"
      >
        Sign In with Google
      </Button>
    </div>
  );
};
export default SignInOAuthButtons;
