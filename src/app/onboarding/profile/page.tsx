"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Avatar,
  Textarea,
} from "@heroui/react";
import { IconChevronRight } from "@tabler/icons-react";
import { ColorPicker, Upload, Modal, Image } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import Link from "next/link";
import type { GetProp, UploadFile, UploadProps } from "antd";
import type { RcFile } from "antd/es/upload";
import ColorThief from "colorthief";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function ProfileForm() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#4f46e5"); // default color
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // State untuk preview modal
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  // ✅ Handle perubahan file upload
  const onChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    const latestFileList = newFileList.slice(-1); // hanya 1 file

    if (latestFileList[0]?.originFileObj) {
      const base64 = await getBase64(latestFileList[0].originFileObj as File);
      latestFileList[0].preview = base64;
      setFile(latestFileList[0].originFileObj as File);

      // 🔥 Ambil warna dominan pakai color-thief
      const img = new window.Image();
      img.crossOrigin = "Anonymous";
      img.src = base64;

      img.onload = () => {
        const colorThief = new ColorThief();
        try {
          const result = colorThief.getColor(img); // [r, g, b]
          const hex = rgbToHex(result[0], result[1], result[2]);
          setColor(hex); // update ColorPicker
        } catch (err) {
          console.error("ColorThief error:", err);
        }
      };
    }

    setFileList(latestFileList);
  };

  // ✅ Preview dalam modal
  const onPreview = async (file: UploadFile) => {
    let src = file.url || (file.preview as string);

    if (!src && file.originFileObj) {
      src = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(src || "");
    setPreviewOpen(true);
    setPreviewTitle(file.name || "Preview");
  };

  // ✅ Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      alert("Nama wajib diisi!");
      return;
    }

    if (!file) {
      alert("Logo wajib diupload!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("color", color);
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload gagal");

      console.log("Profile Data terkirim!");
      alert("Profile berhasil disimpan!");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat upload.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg p-4">
        <CardHeader className="flex gap-4 bg-primary/10 p-4 rounded-lg mb-4">
          <Avatar name="1" color="primary" className="font-bold opacity-80" />
          <div className="flex-1">
            <h1 className="text-lg font-bold">Profile Setup</h1>
            <p className="text-sm">Lengkapi profil anda</p>
          </div>
          <Link href="/onboarding/site" className="items-end">
            <IconChevronRight />
          </Link>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardBody className="gap-4">
            {/* File Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Brand Logo</label>
              <ImgCrop rotationSlider cropShape="rect" aspect={1}>
                <Upload
                  beforeUpload={() => false} // ✅ jangan auto upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </div>

            {/* Modal Preview */}
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={() => setPreviewOpen(false)}
            >
              <Image
                alt="preview"
                src={previewImage}
                style={{ width: "100%", borderRadius: 8 }}
              />
            </Modal>

            {/* Color Picker */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Brand Color</label>
              <div>
                <ColorPicker
                  value={color}
                  size="large"
                  showText
                  onChange={(val) => setColor(val.toHexString())}
                />
              </div>
            </div>

            {/* Nama */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Nama</label>
              <Input
                placeholder="Masukkan nama lengkap"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isRequired
              />
            </div>

            {/* Username */}
            <div className="flex flex-col gap-1">
              <Input
                placeholder="username"
                type="text"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-primary-400 text-sm font-medium">
                      promoin.my.id/
                    </span>
                  </div>
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
                isRequired
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Bio</label>
              <Textarea
                className="w-full"
                placeholder="Enter your description"
              />
            </div>
          </CardBody>

          <CardFooter className="flex justify-end">
            <Button type="submit" color="primary" disabled={!name || !file}>
              Save Profile
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

// helper konversi rgb -> hex
function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}
