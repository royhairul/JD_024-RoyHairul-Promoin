"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";

interface InstagramPost {
  id: string;
  image: string; // URL asli dari Instagram
  likes: string;
  comments: string;
}

interface InstagramGridProps {
  posts: InstagramPost[];
}

export function InstagramGrid({ posts }: InstagramGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mt-12"
    >
      <h2 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Recent Posts
      </h2>

      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {posts.map((post, index) => {
          // bikin proxy URL
          const proxyUrl = `/proxy/image?url=${encodeURIComponent(post.image)}`;

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg"
            >
              <img
                src={proxyUrl}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* overlay info */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300"
              >
                <div className="flex space-x-4 text-white">
                  <div className="flex items-center space-x-1">
                    <Heart size={20} fill="white" />
                    <span className="text-sm font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle size={20} />
                    <span className="text-sm font-semibold">
                      {post.comments}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
