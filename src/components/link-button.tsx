"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface LinkButtonProps {
  title: string;
  url: string;
  icon?: React.ReactNode;
  gradient?: string;
  delay?: number;
}

export function LinkButton({
  title,
  url,
  icon,
  gradient,
  delay = 0,
}: LinkButtonProps) {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2 }}
      className="w-full"
    >
      <Button
        onClick={handleClick}
        className={`w-full h-14 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
          gradient ||
          "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        }`}
        radius="lg"
        size="lg"
        startContent={icon}
        endContent={<ExternalLink size={18} />}
      >
        {title}
      </Button>
    </motion.div>
  );
}
