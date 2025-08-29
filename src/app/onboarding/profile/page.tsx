"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
} from "@heroui/react";
import { IconFile, IconPhoto } from "@tabler/icons-react";
import { ColorPicker } from "antd";
import { useState } from "react";

export default function ProfileForm() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#4f46e5"); // default warna

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      alert("Nama wajib diisi!");
      return;
    }

    // TODO: Simpan ke API / Supabase
    console.log("Profile Data:", {
      name,
      color,
      file,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg p-4">
        <CardHeader>
          <h1 className="text-lg font-bold">Profile Setup 👤</h1>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardBody className="gap-4">
            {/* Nama */}
            <Input
              label="Full Name"
              placeholder="Masukkan nama lengkap"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isRequired
            />

            {/* Color Picker */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Brand Color</label>
              <div>
                <ColorPicker defaultValue="#1677ff" size="large" showText />
              </div>
            </div>

            {/* File Upload */}
            <div className="flex flex-col gap-2">
              <Input
                label="Brand Logo"
                startContent={<IconPhoto />}
                type="file"
              />
            </div>
          </CardBody>

          <CardFooter className="flex justify-end">
            <Button type="submit" color="primary" disabled={!name}>
              Save Profile
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
