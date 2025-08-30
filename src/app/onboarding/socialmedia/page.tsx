"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Link,
  Avatar,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  IconBrandInstagramFilled,
  IconBrandMeta,
  IconBrandTiktokFilled,
  IconBrandYoutubeFilled,
  IconChevronLeft,
  IconChevronRight,
  IconLink,
  IconPlus,
} from "@tabler/icons-react";

export default function SocialMediaForm() {
  const router = useRouter();
  const [socials, setSocials] = useState([
    {
      id: 1,
      label: "Instagram",
      placeholder: "https://instagram.com/username",
      icon: <IconBrandInstagramFilled />,
      value: "",
    },
    {
      id: 2,
      label: "Facebook",
      placeholder: "https://facebook.com/username",
      icon: <IconBrandMeta />,
      value: "",
    },
    {
      id: 3,
      label: "TikTok",
      placeholder: "https://tiktok.com/@username",
      icon: <IconBrandTiktokFilled />,
      value: "",
    },
    {
      id: 4,
      label: "YouTube",
      placeholder: "https://youtube.com/@channel",
      icon: <IconBrandYoutubeFilled />,
      value: "",
    },
  ]);

  // Tambahkan input baru
  const addSocial = () => {
    setSocials([
      ...socials,
      {
        id: socials.length + 1,
        label: `Custom ${socials.length + 1}`,
        placeholder: "https://example.com/username",
        icon: <IconLink />,
        value: "",
      },
    ]);
  };

  // Update value saat user mengetik
  const handleChange = (id: number, value: string) => {
    setSocials(socials.map((s) => (s.id === id ? { ...s, value: value } : s)));
  };

  const handleSave = () => {
    // TODO: Kirim ke API / DB
    console.log("Social media links:", socials);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-4 shadow-xl">
        {/* <CardHeader className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold">Social Media Links 🌐</h1>
          <p className="text-sm text-gray-500">
            Tambahkan akun sosial media Anda
          </p>
        </CardHeader> */}
        <CardHeader className="flex gap-4 bg-primary/10 p-4 rounded-lg mb-4">
          {/* <div className="text-4xl px-3 py-1 bg-primary rounded-full">1</div> */}
          <Link href="/onboarding/site" className="items-end">
            <IconChevronLeft />
          </Link>
          <Avatar name="2" color="primary" className="font-bold opacity-80" />
          <div className="flex-1">
            <h1 className="text-lg font-bold">Social Media</h1>
            <p className="text-sm">Hubungkan dengan sosial media!</p>
          </div>
          <Link href="/onboarding/marketplace" className="items-end">
            <IconChevronRight />
          </Link>
        </CardHeader>

        <CardBody className="gap-4">
          {socials.map((social) => (
            <Input
              key={social.id}
              startContent={social.icon}
              placeholder={social.placeholder}
              type="url"
              value={social.value}
              onChange={(e) => handleChange(social.id, e.target.value)}
            />
          ))}

          <Button
            variant="bordered"
            startContent={<IconPlus size={18} />}
            onPress={addSocial}
          >
            Tambah Sosial Media
          </Button>
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
