import SignInOAuthButtons from "@/components/SignInOAuthButtons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Music className="text-emerald-500 size-8" />
            <CardTitle className="text-2xl font-bold text-white">
              Tunes
            </CardTitle>
          </div>
          <p className="text-zinc-400">
            Sign up to start listening to your favorite music
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignInOAuthButtons />
          <p className="text-xs text-zinc-500 text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
