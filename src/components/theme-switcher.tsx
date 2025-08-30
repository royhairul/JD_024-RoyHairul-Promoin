"use client";

import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Switch
        defaultSelected={theme === "dark"}
        onChange={(checked) => setTheme(checked ? "dark" : "light")}
        startContent={<Sun size={16} />}
        endContent={<Moon size={16} />}
        classNames={{
          wrapper: "bg-gradient-to-r from-purple-500 to-pink-500",
        }}
      />
    </div>
  );
}
