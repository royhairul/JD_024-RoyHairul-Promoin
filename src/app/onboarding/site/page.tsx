"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
  cn,
  CircularProgress,
  addToast,
} from "@heroui/react";
import {
  IconChevronLeft,
  IconFolderSymlink,
  IconArrowNarrowDownDashed,
} from "@tabler/icons-react";
import NextImage from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteSchema, SiteFormValues } from "./schema/site-schema";
import { useRouter } from "next/navigation";
import { da } from "zod/v4/locales";

interface Platform {
  id: Int8Array;
  platform: string;
  url: string;
}

export const CustomRadio: React.FC<React.ComponentProps<typeof Radio>> = ({
  children,
  ...props
}) => (
  <Radio
    {...props}
    classNames={{
      base: cn(
        "flex flex-col m-0 items-end justify-start min-w-[200px]",
        "cursor-pointer rounded-lg gap-4 p-2 border-2 border-gray-200",
        "hover:bg-content2 data-[selected=true]:border-warning data-[selected=true]:bg-warning/10"
      ),
      labelWrapper: cn("m-0 px-2"),
    }}
  >
    {children}
  </Radio>
);

export default function SiteForm() {
  const router = useRouter();
  const { data: platforms = [], isLoading } = useQuery<Platform[]>({
    queryKey: ["platforms"],
    queryFn: async () => {
      const res = await api.get("/link");
      return res.data.data;
    },
  });

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SiteFormValues>({
    resolver: zodResolver(siteSchema),
    defaultValues: {
      cta_text: "",
      cta_link: "",
      template: "",
      platform: "",
      customPlatform: "",
    },
  });

  const selectedPlatform = watch("platform");

  // Handle selection change untuk platform
  const handlePlatformChange = (key: string) => {
    setValue("platform", key);

    if (key === "custom") {
      setValue("cta_link", ""); // reset jika custom
    } else {
      const platformObj = platforms.find((p) => String(p.id) === key);
      setValue("cta_link", platformObj?.url || "");
    }
  };

  // Handle change custom link
  const handleCustomLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("customPlatform", e.target.value);
    setValue("cta_link", e.target.value); // selalu update cta_link
  };

  // Handle template selection
  const handleTemplateChange = (value: string) => {
    setValue("template", value);
  };

  const onSubmit = async (data: SiteFormValues) => {
    console.log("Form Submitted:", data);
    try {
      const formData = {
        cta_text: data.cta_text,
        cta_link: data.cta_link,
        template: data.template,
      };
      const { data: res } = await api.post("/profile/site", formData);
      router.push("/onboarding/done");
    } catch (err) {
      console.log(err);
      addToast({
        title: "Site Setting Failed",
        description:
          typeof err === "object" && err !== null && "message" in err
            ? String((err as { message?: unknown }).message)
            : "Unknown error",
        color: "danger",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg p-4">
        <CardHeader className="flex gap-4 bg-warning/10 p-4 rounded-lg mb-4">
          <Link href="/onboarding/marketplace" className="items-end">
            <IconChevronLeft />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-warning">
              Setup Halaman Anda
            </h1>
            <p className="text-xs text-warning/60">Konfigurasi halaman utama</p>
          </div>
          <CircularProgress
            color="warning"
            showValueLabel
            size="lg"
            value={100}
            valueLabel="4/4"
            classNames={{ value: "font-semibold" }}
          />
        </CardHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit, (formErrors) =>
              console.log("Validation Errors:", formErrors)
            )(e);
          }}
        >
          <CardBody className="gap-4">
            {/* Teks CTA */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Teks CTA</label>
              <Input
                {...register("cta_text")}
                placeholder="contoh: Mulai Sekarang!"
                isInvalid={!!errors.cta_text}
                errorMessage={errors.cta_text?.message}
              />
            </div>

            {/* Pilihan Platform */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Link Utama (CTA)</label>
              <Controller
                control={control}
                name="cta_link"
                render={() => (
                  <Select
                    className="w-full"
                    label="Menuju ke"
                    endContent={<IconFolderSymlink />}
                    placeholder={isLoading ? "Loading..." : "Pilih platform"}
                    description="Tujuan link utama anda."
                    fullWidth
                    selectedKeys={[selectedPlatform]}
                    onSelectionChange={(keys) =>
                      handlePlatformChange(String(Array.from(keys)[0] ?? ""))
                    }
                    disabled={isLoading}
                  >
                    <>
                      {platforms.map((platform) => (
                        <SelectItem
                          key={String(platform.id)}
                          textValue={platform.url}
                        >
                          {platform.platform}
                        </SelectItem>
                      ))}
                      <SelectItem key="custom">Custom</SelectItem>
                    </>
                  </Select>
                )}
              />
            </div>

            {/* Input Link Custom */}
            {selectedPlatform === "custom" && (
              <div className="flex flex-col gap-2 -mt-4">
                <div className="self-center">
                  <IconArrowNarrowDownDashed className="text-warning/80" />
                </div>
                <label className="text-sm font-medium">Link Custom</label>
                <Input
                  value={watch("customPlatform")}
                  onChange={handleCustomLinkChange}
                  placeholder="Masukkan link atau username"
                  isInvalid={!!errors.customPlatform}
                  errorMessage={errors.customPlatform?.message}
                />
              </div>
            )}

            {/* Template */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Template</label>
              <Controller
                control={control}
                name="template"
                render={() => (
                  <RadioGroup
                    value={watch("template")}
                    onValueChange={handleTemplateChange}
                  >
                    <div className="flex gap-4 w-full h-max overflow-x-auto pb-4">
                      <CustomRadio value="template-1">
                        <NextImage
                          src="/templates/template-1.jpg"
                          alt="Template 1"
                          width={200}
                          height={100}
                          className="rounded-lg object-cover m-0"
                        />
                        <span className="text-sm font-medium">Template 1</span>
                      </CustomRadio>
                      <CustomRadio value="template-2">
                        <NextImage
                          src="/templates/template-1.jpg"
                          alt="Template 2"
                          width={200}
                          height={150}
                          className="rounded-lg object-cover"
                        />
                        <span className="text-sm font-medium">Template 2</span>
                      </CustomRadio>
                      <CustomRadio value="template-3">
                        <NextImage
                          src="/templates/template-1.jpg"
                          alt="Template 3"
                          width={200}
                          height={150}
                          className="rounded-lg object-cover"
                        />
                        <span className="text-sm font-medium">Template 3</span>
                      </CustomRadio>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
          </CardBody>

          <CardFooter className="flex justify-end">
            <Button color="warning" variant="shadow" fullWidth type="submit">
              Simpan & Lanjutkan
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
