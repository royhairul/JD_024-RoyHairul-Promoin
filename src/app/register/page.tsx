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
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const handleRegister = () => {
    // TODO: taruh logic register (call API, validate, dll.)
    router.push("/dashboard");
  };

  const handleGoogleRegister = () => {
    // TODO: integrasi ke Google OAuth (next-auth / supabase / firebase)
    console.log("Sign up with Google clicked");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-4 shadow-xl">
        <CardHeader className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold">Create Account ✨</h1>
          <p className="text-sm text-gray-500">Register to get started</p>
        </CardHeader>

        <CardBody className="gap-4">
          <Input
            isRequired
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
          />
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
          <Input
            isRequired
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
          />
        </CardBody>

        <CardFooter className="flex flex-col gap-3">
          <Button
            color="primary"
            fullWidth
            onPress={handleRegister}
            className="font-medium"
          >
            Sign Up
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
            onPress={handleGoogleRegister}
          >
            Sign up with Google
          </Button>

          <p className="text-sm text-gray-500 py-2">
            Already have an account?{" "}
            <Link
              href="/login"
              size="sm"
              color="primary"
              className="font-medium"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
