"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Link,
  CircularProgress,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  IconBrandInstagramFilled,
  IconBrandMeta,
  IconBrandTiktokFilled,
  IconBrandWhatsappFilled,
  IconBrandYoutubeFilled,
  IconChevronLeft,
  IconChevronRight,
  IconLink,
  IconPlus,
} from "@tabler/icons-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/axios";
import {
  socialMediaSchema,
  SocialMediaFormValues,
} from "./schema/socialmedia-schema";
import { PREFIX_MAP } from "./helpers/prefix-map";

export default function SocialMediaForm() {
  const router = useRouter();

  const [socials, setSocials] = useState([
    {
      id: 1,
      label: "Whatsapp",
      placeholder: "62 812-3456-7890",
      icon: <IconBrandWhatsappFilled />,
      value: "",
    },
    {
      id: 2,
      label: "Instagram",
      placeholder: "username",
      icon: <IconBrandInstagramFilled />,
      value: "",
    },
    {
      id: 3,
      label: "TikTok",
      placeholder: "username",
      icon: <IconBrandTiktokFilled />,
      value: "",
    },
    {
      id: 4,
      label: "YouTube",
      placeholder: "channel",
      icon: <IconBrandYoutubeFilled />,
      value: "",
    },
    {
      id: 5,
      label: "Facebook",
      placeholder: "username",
      icon: <IconBrandMeta />,
      value: "",
    },
  ]);

  const { control, handleSubmit } = useForm<SocialMediaFormValues>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: {
      socials: socials.map((s) => ({ label: s.label, value: s.value })),
    },
  });

  // Tambah custom social link
  const addSocial = () => {
    const newSocial = {
      id: Date.now(),
      label: `Custom ${socials.length + 1}`,
      placeholder: "example.com",
      icon: <IconLink />,
      value: "",
    };
    setSocials([...socials, newSocial]);
  };

  // Submit form
  const onSubmit = (data: SocialMediaFormValues) => {
    const payload = data.socials
      .filter((s) => s.value && s.value.trim() !== "")
      .map((s) => {
        const prefix = PREFIX_MAP[s.label] || "https://";
        let url = s.value;
        if (!url?.startsWith(prefix)) url = prefix + url;
        return { url };
      });

    console.log("Payload siap dikirim:", payload);

    api
      .post("/link", payload)
      .then((res) => {
        console.log("Berhasil:", res.data);
        router.push("/onboarding/marketplace");
      })
      .catch((err) => {
        console.error("Gagal:", err);
      });
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-4 shadow-xl">
        <CardHeader className="flex gap-4 bg-warning/10 p-4 rounded-lg mb-4">
          <Link href="/onboarding/profile">
            <IconChevronLeft />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-warning">Sosial Media</h1>
            <p className="text-xs text-warning/60">
              Sambungkan dengan akun sosial media
            </p>
          </div>
          <CircularProgress
            color="warning"
            showValueLabel
            size="lg"
            value={50}
            valueLabel="2/4"
            classNames={{ value: "font-semibold" }}
          />
          <Link href="/onboarding/marketplace">
            <IconChevronRight />
          </Link>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="gap-4">
            {socials.map((social, index) => (
              <Controller
                key={social.id}
                name={`socials.${index}.value`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    startContent={
                      <div className="pointer-events-none flex items-center gap-2">
                        {social.icon}
                        <span className="text-default-400 font-medium text-small">
                          {PREFIX_MAP[social.label] || "https://"}
                        </span>
                      </div>
                    }
                    placeholder={social.placeholder}
                    type="text"
                  />
                )}
              />
            ))}
            <Button
              color="warning"
              variant="flat"
              startContent={<IconPlus size={18} />}
              onPress={addSocial}
            >
              Tambah Sosial Media
            </Button>
          </CardBody>

          <CardFooter className="flex flex-col gap-3">
            <Button color="warning" variant="shadow" fullWidth type="submit">
              Simpan & Lanjutkan
            </Button>
            <Button
              variant="bordered"
              fullWidth
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              Skip
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
