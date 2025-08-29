"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { IconBook2, IconSparkles } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="sm:px-8 px-4 min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center py-4">
        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={120}
          height={24}
          className="my-8"
        />

        <div className="flex gap-4">
          <Link href={"/register"}>
            <Button variant="bordered">Register</Button>
          </Link>
          <Link href={"/login"}>
            <Button
              variant="shadow"
              color="primary"
              className="font-medium px-8"
            >
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold tracking-tighter max-w-2xl mx-auto">
          Welcome to Promoin
        </h1>

        <p className="my-5 text-sm font-normal max-w-2xl mx-auto opacity-70">
          Platform link-in-bio mendukung promosi bisnis dan kreator. Tidak hanya
          menampilkan link, Promoin otomatis mengupdate produk & konten terbaru,
          terintegrasi dengan marketplace dan sosial media anda.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-2xl mx-auto">
          <Button
            startContent={<IconSparkles />}
            color="primary"
            variant="shadow"
            className="font-medium py-2 px-6"
          >
            Mulai Sekarang
          </Button>
          <Button
            endContent={<IconBook2 />}
            variant="bordered"
            className="px-6"
          >
            Baca Panduan
          </Button>
        </div>
      </main>
    </div>
  );
}
