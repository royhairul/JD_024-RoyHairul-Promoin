import React from "react";
import { Instagram, Youtube } from "lucide-react";

export interface ProfileData {
  name: string;
  bio: string;
  avatar: string;
  followers: string;
  following: string;
  posts: string;
}

export interface SocialLink {
  title: string;
  url: string;
  icon: React.ReactNode;
  gradient: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: string;
  comments: string;
}

export interface UserData {
  profile: ProfileData;
  socialLinks: SocialLink[];
  instagramPosts: InstagramPost[];
}

// Dummy data per slug
export const usersData: Record<string, UserData> = {
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
export const reservedSlugs = ["admin", "login", "register", "onboarding"];
