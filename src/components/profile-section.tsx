"use client";

import { Avatar } from "@heroui/react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, MessageCircle } from "lucide-react";

interface ProfileSectionProps {
  name: string;
  bio: string;
  avatar: string;
  followers: string;
  following: string;
  posts: string;
  cta_text?: string;
  cta_link?: string;
  theme_color?: string;
}

export function ProfileSection({
  name,
  bio,
  avatar,
  cta_text,
  cta_link,
  theme_color = "#7c3aed", // default ungu
}: ProfileSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <Avatar
          src={avatar}
          className="w-24 h-24 mx-auto mb-4"
          size="lg"
          style={{
            boxShadow: `0 0 0 4px ${theme_color}40`, // ring dengan opacity 40%
          }}
        />

        <motion.h1
          className="text-2xl font-bold mb-2"
          style={{
            background: `linear-gradient(to right, ${theme_color}, ${theme_color}CC)`,
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {name}
        </motion.h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-gray-600 dark:text-gray-300 mb-6 max-w-sm mx-auto leading-relaxed"
      >
        {bio}
      </motion.p>

      {/* CTA Button */}
      {cta_text && cta_link && (
        <motion.a
          href={cta_link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block mb-8 px-6 py-3 rounded-xl font-semibold text-white shadow-lg"
          style={{
            background: `linear-gradient(to right, ${theme_color}, ${theme_color}CC)`,
          }}
        >
          {cta_text}
        </motion.a>
      )}

      {/* Social Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex justify-center space-x-4"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
        >
          <Instagram size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
        >
          <Twitter size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
        >
          <Youtube size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
        >
          <MessageCircle size={20} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
