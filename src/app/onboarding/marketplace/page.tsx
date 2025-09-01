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
  CircularProgress,
  Tabs,
  Tab,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/lib/axios";
import {
  marketplaceSchema,
  MarketplaceFormValues,
} from "./schema/marketplace-schema";

// ------------------- COMPONENT -------------------
export default function MarketplaceForm() {
  const router = useRouter();
  const [selected, setSelected] = useState<"pop" | "ctime" | "sales">("pop");

  const { control, handleSubmit } = useForm<MarketplaceFormValues>({
    resolver: zodResolver(marketplaceSchema),
    defaultValues: { marketplace: "", sortBy: selected },
  });

  const onSubmit = (data: MarketplaceFormValues) => {
    const payload = {
      url: data.marketplace,
      sort_by: data.sortBy || selected,
    };

    console.log("Payload siap dikirim:", payload);

    // Contoh kirim ke API
    api
      .post("/marketplace", payload)
      .then((res) => {
        console.log("Berhasil:", res.data);
        router.push("/onboarding/site");
      })
      .catch((err) => {
        console.error("Gagal:", err);
        console.log(err);
      });
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-4 shadow-xl">
        <CardHeader className="flex gap-4 bg-warning/10 p-4 rounded-lg mb-4">
          <Link href="/onboarding/socialmedia" className="items-end">
            <IconChevronLeft />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-warning">List Produk</h1>
            <p className="text-xs text-warning/60">Tambahkan produk anda</p>
          </div>
          <CircularProgress
            color="warning"
            showValueLabel
            size="lg"
            value={75}
            valueLabel="3/4"
            classNames={{ value: "font-semibold" }}
          />
          <Link href="/onboarding/site" className="items-end">
            <IconChevronRight />
          </Link>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="gap-4">
            <h1 className="text-sm font-semibold">Integrasi Marketplace</h1>

            <Controller
              name="marketplace"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <Input
                    {...field}
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
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />

            <div className="flex justify-end items-center gap-4">
              <p className="text-sm">Sort By</p>
              <Tabs
                radius="lg"
                aria-label="Tabs example"
                selectedKey={selected}
                onSelectionChange={(e) => {
                  setSelected(String(e) as "pop" | "ctime" | "sales");
                }}
              >
                <Tab key="pop" title="Populer" />
                <Tab key="ctime" title="Terbaru" />
                <Tab key="sales" title="Terlaris" />
              </Tabs>
            </div>

            <Divider orientation="horizontal" />
          </CardBody>

          <CardFooter className="flex flex-col gap-3">
            <Button color="warning" variant="shadow" fullWidth type="submit">
              Simpan & Lanjutkan
            </Button>
            <Button
              variant="bordered"
              fullWidth
              type="button"
              onClick={() => router.push("/dashboard")}
            >
              Skip
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
