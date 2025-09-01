"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProfileSection } from "@/components/profile-section";
import { LinkButton } from "@/components/link-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Loader2 } from "lucide-react";
import CircularGallery from "@/components/circular-gallery";
import { Card, CardFooter, Button, Image } from "@heroui/react";

interface DummyData {
  profile: {
    id: string;
    bio: string;
    logo: string | null;
    theme_color: string;
    template: string;
    cta_link: string;
    name: string;
    slug: string;
    cta_text: string;
  };
  links: {
    id: number;
    platform: string;
    url: string;
  }[];
  social: {
    id: string;
    caption: string;
    taken_at: string;
    images: string;
    likes: number;
    link_post: string;
  }[];
}

export default function UserPage() {
  const [data, setData] = useState<DummyData | null>(null);
  const [loading, setLoading] = useState(true);

  // Dummy data
  const dummy: DummyData = {
    profile: {
      id: "1",
      bio: "Linkpro. Connecting with your friend by link!",
      logo: null,
      theme_color: "#ED125F",
      template: "default",
      cta_link: "https://example.com",
      name: "Linkpro",
      slug: "linkpro",
      cta_text: "Touch Me",
    },
    links: [
      { id: 1, platform: "Instagram", url: "https://instagram.com" },
      { id: 2, platform: "Twitter", url: "https://twitter.com" },
    ],
    social: [
      {
        id: "s1",
        caption: "My first post",
        taken_at: "2025-08-31",
        images: "https://via.placeholder.com/300?text=Instagram+Post+1",
        likes: 123,
        link_post: "https://instagram.com/p/abc123",
      },
      {
        id: "s2",
        caption: "Another post",
        taken_at: "2025-08-30",
        images: "https://via.placeholder.com/300?text=Instagram+Post+2",
        likes: 456,
        link_post: "https://instagram.com/p/def456",
      },
    ],
  };

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setData(dummy);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
      </div>
    );
  }

  if (!data) return <p>Data not found</p>;

  const { profile, links, social } = data;

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(to bottom right, ${profile.theme_color}20, ${profile.theme_color}40)`,
      }}
    >
      <ThemeSwitcher />
      <div className="container mx-auto px-4 py-8 max-w-md">
        <ProfileSection
          name={profile.name}
          bio={profile.bio}
          avatar={
            profile.logo ?? "https://via.placeholder.com/150?text=No+Logo"
          }
          followers={""}
          following={""}
          posts={""}
        />

        <LinkButton
          key={""}
          title={profile.cta_text}
          url={"https://wa.me/6281235024790"}
          style={{ background: profile.theme_color }}
          className="hover:opacity-90"
          icon={null}
          delay={0.1 * 1}
        />

        <p className="absolute mt-10 font-semibold text-pink-600">
          Cek Info Terbaru Dari Kami!
        </p>
        <div className="my-2" style={{ height: "400px", position: "relative" }}>
          <CircularGallery
            bend={0}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>

        {/* {Array.from({ length: 2 }).map((_, idx) => (
          <motion.div
            key={idx}
            className="mt-4 flex space-x-4 overflow-x-auto pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            {social.map((s) => (
              <img
                key={s.id}
                src="https://scontent-cgk2-2.cdninstagram.com/v/t39.30808-6/533090909_1149464353876109_7549913952150439106_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEyMDB4MTUwMC5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-cgk2-2.cdninstagram.com&_nc_cat=105&_nc_oc=Q6cZ2QFeOEurpsvNscEI1sG081wJyDjcRxDc3Nog7xxs-QP4AmKAY6hoUFnPdKEbsAasisA&_nc_ohc=Hssl_PGLAYQQ7kNvwFiWK1b&_nc_gid=9--yBZ-nKzITf9sQpuIkJA&edm=AP4sbd4AAAAA&ccb=7-5&ig_cache_key=MzcxMDIxNDA2MTM0MzgxNjcwOQ%3D%3D.3-ccb7-5&oh=00_AfWk9Zia1jeEet5Sk0Ks8Qo6eZF-zGYmYoPDcBLbrojy2g&oe=68BA0B46&_nc_sid=7a9f4b"
                alt={s.caption}
                className="h-48 w-48 flex-shrink-0 rounded-lg object-cover"
              />
            ))}
          </motion.div>
        ))} */}

        {/* Links */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="space-y-4 mb-8"
        >
          {links.map((link, index) => (
            <LinkButton
              key={link.id}
              title={link.platform.toUpperCase()}
              url={link.url}
              style={{ background: profile.theme_color }}
              className="hover:opacity-90"
              icon={null}
              delay={0.1 * index}
            />
          ))}
        </motion.div> */}
        <p className="my-5 font-semibold text-pink-600">Cek Produk Kami!</p>
        <motion.div>
          <div className="w-max flex gap-4">
            <Card isFooterBlurred className="border-none" radius="lg">
              <Image
                alt="Woman listing to music"
                className="object-cover"
                height={200}
                src="https://plus.unsplash.com/premium_photo-1669652639356-f5cb1a086976?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={200}
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-pink-500/80">Notebook</p>
                <Button
                  className="text-tiny text-white bg-pink-700"
                  color="default"
                  radius="lg"
                  size="sm"
                  variant="flat"
                >
                  Order
                </Button>
              </CardFooter>
            </Card>
            <Card isFooterBlurred className="border-none" radius="lg">
              <Image
                alt="Woman listing to music"
                className="object-cover"
                height={200}
                src="https://plus.unsplash.com/premium_photo-1685136481944-9fbed1349e41?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={200}
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-pink-500/80">Papenote</p>
                <Button
                  className="text-tiny text-white bg-pink-700"
                  color="default"
                  radius="lg"
                  size="sm"
                  variant="flat"
                >
                  Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-center mt-12 text-gray-500 text-sm"
        >
          <p>© 2025 {profile.name}. Made with 💜</p>
        </motion.div>
      </div>
    </div>
  );
}
