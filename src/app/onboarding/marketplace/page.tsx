"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Link,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function MarketplaceForm() {
  const router = useRouter();

  const handleSave = () => {
    console.log("Marketplace links saved!");
    router.push("/dashboard"); // setelah selesai, redirect ke dashboard
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-4 shadow-xl">
        <CardHeader className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold">Marketplace Links 🛒</h1>
          <p className="text-sm text-gray-500">
            Masukkan link marketplace Anda untuk memudahkan integrasi
          </p>
        </CardHeader>

        <CardBody className="gap-4">
          <Input
            startContent={
              <div className="w-5 h-5 flex items-center justify-center">
                <Image
                  src="/icon/tokopedia.png"
                  alt="tokopedia"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
            }
            label="Tokopedia"
            placeholder="https://tokopedia.com/toko-anda"
            type="url"
          />

          <Input
            startContent={
              <div className="w-5 h-5 flex items-center justify-center">
                <Image
                  src="/icon/shopee.png"
                  alt="shopee"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
            }
            label="Shopee"
            placeholder="https://shopee.co.id/toko-anda"
            type="url"
          />
        </CardBody>

        <CardFooter className="flex flex-col gap-3">
          <Button color="primary" fullWidth onPress={handleSave}>
            Simpan & Lanjutkan
          </Button>
          <p className="text-sm text-gray-500 text-center">
            Bisa dilewati dan ditambahkan nanti di dashboard{" "}
            <Link href="/dashboard" size="sm" color="primary">
              Skip →
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
