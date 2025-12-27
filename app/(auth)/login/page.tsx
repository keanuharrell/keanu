"use client";

import { GoogleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth/auth-client";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/studio",
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Sign in to access the studio</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={handleGoogleLogin}
        >
          <HugeiconsIcon icon={GoogleIcon} className="size-5" />
          Continue with Google
        </Button>
      </CardContent>
    </Card>
  );
}
