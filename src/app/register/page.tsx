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
import { useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handler register dengan backend
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        {
          fullName,
          email,
          password,
        },
        { withCredentials: true } // jika backend pakai cookie
      );

      console.log("Register success:", data);
      router.push("/dashboard"); // redirect setelah register
    } catch (error: any) {
      console.error(
        "Register error:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    // Redirect ke endpoint backend yang handle Google OAuth
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-4 shadow-lg border border-gray-200">
        <CardHeader className="mt-4 flex flex-col items-start">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={120}
            height={90}
            className="pt-6 pb-2"
          />
          <h1 className="text-2xl font-bold tracking-tight">
            Buat Akun Baru ✨
          </h1>
          <p className="text-sm py-2 opacity-50">
            Mulai promosikan sekarang juga!
          </p>
        </CardHeader>

        <CardBody className="gap-4">
          <Input
            isRequired
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            isRequired
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            isRequired
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            isRequired
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </CardBody>

        <CardFooter className="flex flex-col gap-3">
          <Button
            color="warning"
            fullWidth
            onPress={handleRegister}
            isLoading={loading}
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
              color="warning"
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
