"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Link,
  Divider,
} from "@heroui/react";
import { IconBrandGoogle, IconBrandGoogleFilled } from "@tabler/icons-react";

export default function Login() {
  const handleGoogleLogin = () => {
    // TODO: Integrasi dengan next-auth / Supabase / Firebase
    console.log("Sign in with Google clicked");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-4 shadow-xl">
        <CardHeader className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold">Welcome Back 👋</h1>
          <p className="text-sm">Login to your account</p>
        </CardHeader>

        <CardBody className="gap-4">
          <Input
            isRequired
            label="Email"
            placeholder="Enter your email"
            type="email"
          />
          <Input
            isRequired
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          <div className="flex justify-end text-sm">
            <Link href="#" size="sm" color="primary">
              Forgot password?
            </Link>
          </div>
        </CardBody>

        <CardFooter className="flex flex-col gap-3">
          <Button color="primary" fullWidth>
            Login
          </Button>

          <div className="flex items-center gap-2 w-full">
            <Divider className="flex-1" />
            <span className="text-xs text-gray-400">Or</span>
            <Divider className="flex-1" />
          </div>

          <Button
            fullWidth
            variant="bordered"
            startContent={<IconBrandGoogleFilled size={20} />}
            onPress={handleGoogleLogin}
          >
            Sign in with Google
          </Button>

          <p className="text-sm py-2 text-gray-500">
            Don’t have an account?{" "}
            <Link
              href="/register"
              size="sm"
              color="primary"
              className="font-medium"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
