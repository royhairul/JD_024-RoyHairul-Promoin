"use client";

import { useEffect, useState } from "react";
import { QRCode } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";
import { api } from "@/lib/axios";

export default function QrPage() {
  const [profile, setProfile] = useState<{ site_url?: string } | null>(null);
  const [slug, setSlug] = useState<String>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/me");
        console.log(res);
        setSlug(res.data.data.profile.slug);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const siteUrl = "https://promoin.my.id/" + slug;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-4 shadow-lg border border-gray-200">
        <CardHeader className="flex flex-col items-center">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={120}
            height={30}
            className="pt-6 pb-2"
          />
          <h1 className="text-2xl font-bold">Congratulations!</h1>
          <p className="text-sm">Website kamu sudah selesai 🎉</p>
        </CardHeader>

        <CardBody className="gap-4 flex items-center">
          {loading ? <p>Loading...</p> : <QRCode value={siteUrl} />}
        </CardBody>

        <CardFooter className="flex flex-col gap-3">
          {!loading && (
            <Link href={siteUrl} className="w-full">
              <Button variant="bordered" fullWidth>
                {siteUrl}
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
