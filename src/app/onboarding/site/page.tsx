"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Avatar,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
  cn,
} from "@heroui/react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconBrandShopee,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandFacebook,
} from "@tabler/icons-react";
import NextImage from "next/image";
import Link from "next/link";

interface Platform {
  key: string;
  label: string;
  icon: JSX.Element;
}

export const CustomRadio: React.FC<React.ComponentProps<typeof Radio>> = ({
  children,
  ...props
}) => {
  return (
    <Radio
      {...props}
      classNames={{
        base: cn(
          "flex flex-col m-0 items-center justify-between min-w-[200px]",
          "cursor-pointer rounded-lg gap-4 p-4 border-2 border-gray-200",
          "hover:bg-content2 data-[selected=true]:border-primary data-[selected=true]:bg-primary/10"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

const platforms: Platform[] = [
  {
    key: "shopee",
    label: "Shopee",
    icon: <IconBrandShopee className="w-6 h-6 text-amber-500" />,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: <IconBrandWhatsapp className="w-6 h-6 text-green-500" />,
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: <IconBrandYoutube className="w-6 h-6 text-red-500" />,
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: <IconBrandInstagram className="w-6 h-6 text-pink-500" />,
  },
  {
    key: "tiktok",
    label: "TikTok",
    icon: <IconBrandTiktok className="w-6 h-6 text-black" />,
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: <IconBrandFacebook className="w-6 h-6 text-blue-600" />,
  },
  {
    key: "custom",
    label: "Tambahkan Platform Lain",
    icon: <IconPlus className="w-6 h-6" />,
  },
];

export default function SiteForm() {
  const [name, setName] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [customPlatform, setCustomPlatform] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const handleSelectionChange = (keys: Set<string>) => {
    setSelectedPlatform(Array.from(keys)[0] || "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !link) {
      alert("Nama dan link wajib diisi!");
      return;
    }

    const platformToSave =
      selectedPlatform === "custom" ? customPlatform : selectedPlatform;

    console.log("Profile Data:", {
      name,
      platform: platformToSave,
      link,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg p-4">
        <CardHeader className="flex gap-4 bg-primary/10 p-4 rounded-lg mb-4">
          <Link href="/onboarding/profile">
            <IconChevronLeft />
          </Link>
          <Avatar name="4" color="primary" className="font-bold opacity-80" />
          <div className="flex-1">
            <h1 className="text-lg font-bold">Setup Page</h1>
            <p className="text-sm">Setup halaman anda</p>
          </div>
          <Link href="/onboarding/socialmedia">
            <IconChevronRight />
          </Link>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardBody className="gap-4">
            {/* Nama Halaman */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Nama Halaman / Link Utama
              </label>
              <Input
                placeholder="Masukkan nama halaman"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Pilihan Platform */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Pilih Platform</label>
              <Select
                placeholder="Pilih platform"
                value={selectedPlatform}
                onSelectionChange={handleSelectionChange}
                className="max-w-xs"
              >
                {platforms.map((p) => (
                  <SelectItem
                    key={p.key}
                    textValue={p.key}
                    startContent={p.icon}
                  >
                    {p.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Input custom platform */}
            {selectedPlatform === "custom" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Nama Platform</label>
                <Input
                  placeholder="Masukkan nama platform sendiri"
                  value={customPlatform}
                  onChange={(e) => setCustomPlatform(e.target.value)}
                />
              </div>
            )}

            {/* Input Link */}
            {selectedPlatform && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Link / Username</label>
                <Input
                  placeholder="Masukkan link atau username"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            )}

            {/* Template */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Template</label>
              <RadioGroup>
                <div className="flex gap-4 w-full h-max overflow-x-auto pb-4">
                  <CustomRadio value="template-1">
                    <NextImage
                      src="/templates/template-1.jpg"
                      alt="Template 1"
                      width={200}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                    <span className="text-sm font-medium mt-2">Template 1</span>
                  </CustomRadio>
                  <CustomRadio value="template-2">
                    <NextImage
                      src="/images/template2.png"
                      alt="Template 2"
                      width={200}
                      height={150}
                      className="rounded-lg object-cover"
                    />
                    <span className="text-sm font-medium mt-2">Template 2</span>
                  </CustomRadio>
                  <CustomRadio value="template-3">
                    <NextImage
                      src="/images/template3.png"
                      alt="Template 3"
                      width={200}
                      height={150}
                      className="rounded-lg object-cover"
                    />
                    <span className="text-sm font-medium mt-2">Template 3</span>
                  </CustomRadio>
                </div>
              </RadioGroup>
            </div>
          </CardBody>

          <CardFooter className="flex justify-end">
            <Button type="submit" color="primary" disabled={!name || !link}>
              Save Profile
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
