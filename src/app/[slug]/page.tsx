// app/[slug]/page.tsx
"use client";

import React from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  Instagram,
  Youtube,
  Twitter,
  Globe,
  Mail,
  Music,
  ShoppingBag,
  Coffee,
} from "lucide-react";

import { ProfileSection } from "@/components/profile-section";
import { LinkButton } from "@/components/link-button";
import { InstagramGrid } from "@/components/instagram-grid";
import { ThemeSwitcher } from "@/components/theme-switcher";

interface ProfileData {
  name: string;
  bio: string;
  avatar: string;
  followers: string;
  following: string;
  posts: string;
}

interface SocialLink {
  title: string;
  url: string;
  icon: React.ReactNode;
  gradient: string;
}

interface InstagramPost {
  id: string;
  image: string;
  likes: string;
  comments: string;
}

interface UserData {
  profile: ProfileData;
  socialLinks: SocialLink[];
  instagramPosts: InstagramPost[];
}

// Dummy data per slug
const usersData: Record<string, UserData> = {
  sarah: {
    profile: {
      name: "Sarah Johnson",
      bio: "✨ Content Creator & Digital Artist\n📍 Based in San Francisco\n💜 Spreading positivity through art",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2",
      followers: "12.5K",
      following: "890",
      posts: "156",
    },
    socialLinks: [
      {
        title: "Follow on Instagram",
        url: "https://instagram.com",
        icon: <Instagram size={20} />,
        gradient:
          "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-700 hover:via-pink-600 hover:to-orange-600",
      },
      {
        title: "Subscribe on YouTube",
        url: "https://youtube.com",
        icon: <Youtube size={20} />,
        gradient:
          "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
      },
    ],
    instagramPosts: [
      {
        id: "1",
        image:
          "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
        likes: "2.1K",
        comments: "48",
      },
      {
        id: "2",
        image:
          "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
        likes: "1.8K",
        comments: "32",
      },
    ],
  },
};

// Reserved slugs
const reservedSlugs = ["admin", "login", "register", "onboarding"];

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default function UserPage({ params }: PageProps) {
  // unwrap params dengan type assertion
  const { slug } = React.use(params as Promise<{ slug: string }>);

  if (reservedSlugs.includes(slug) || !usersData[slug]) {
    notFound();
  }

  const { profile, socialLinks, instagramPosts } = usersData[slug];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
      <ThemeSwitcher />
      <div className="container mx-auto px-4 py-8 max-w-md">
        <ProfileSection {...profile} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="space-y-4 mb-8"
        >
          {socialLinks.map((link, index) => (
            <LinkButton
              key={link.title}
              title={link.title}
              url={link.url}
              icon={link.icon}
              gradient={link.gradient}
              delay={0.1 * index}
            />
          ))}
        </motion.div>

        <InstagramGrid posts={instagramPosts} />

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
