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
  addToast,
} from "@heroui/react";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { api } from "@/lib/axios";
import { loginSchema } from "./schema/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase-client";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const { data: res } = await api.post("/auth/login", data);
      localStorage.setItem("accessToken", res.data.session.access_token);
      router.push("/onboarding/profile");
    } catch (err) {
      addToast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:3000/onboarding/profile",
        },
      });
    } catch (err) {
      console.error("Error signing google:", err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-4 shadow-lg border border-gray-200">
        <CardHeader className="flex flex-col items-start">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={120}
            height={90}
            className="pt-6 pb-2"
          />
          <h1 className="text-2xl font-bold">Welcome Back 👋</h1>
          <p className="text-sm">Login to your account</p>
        </CardHeader>

        <CardBody className="gap-4">
          <Input
            isRequired
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email")}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <Input
            isRequired
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register("password")}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
          />

          <div className="flex justify-end text-sm">
            <Link href="#" size="sm" color="warning">
              Forgot password?
            </Link>
          </div>
        </CardBody>

        <CardFooter className="flex flex-col gap-3">
          <Button
            color="warning"
            variant="shadow"
            fullWidth
            onPress={() => handleSubmit(onSubmit)()}
            isLoading={loading}
            isDisabled={loading}
          >
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
              color="warning"
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
