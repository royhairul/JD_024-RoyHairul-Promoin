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
}

export function ProfileSection({
  name,
  bio,
  avatar,
  followers,
  following,
  posts,
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
          className="w-24 h-24 mx-auto mb-4 ring-4 ring-purple-200 dark:ring-purple-800"
          size="lg"
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
      >
        {name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-gray-600 dark:text-gray-300 mb-6 max-w-sm mx-auto leading-relaxed"
      >
        {bio}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-center space-x-8 mb-6"
      >
        <div className="text-center">
          <div className="font-semibold text-lg">{followers}</div>
          <div className="text-gray-500 text-sm">Followers</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-lg">{following}</div>
          <div className="text-gray-500 text-sm">Following</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-lg">{posts}</div>
          <div className="text-gray-500 text-sm">Posts</div>
        </div>
      </motion.div>

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
