"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  CircularProgress,
  Textarea,
  addToast,
} from "@heroui/react";
import { ColorPicker, Upload, Modal, Image } from "antd";
import type { UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import ColorThief from "colorthief";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { profileSchema } from "./schema/profile-schema";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

type RcFileType = File;

const getBase64 = (file: RcFileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
  });

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [color, setColor] = useState("#4f46e5");
  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", username: "", bio: "", color },
  });

  // Handle Upload Change
  const onChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    const latestFile = newFileList.slice(-1)[0];
    if (latestFile?.originFileObj) {
      const base64 = await getBase64(latestFile.originFileObj as RcFileType);
      latestFile.preview = base64;

      // Ambil dominant color
      const img = document.createElement("img");
      img.crossOrigin = "Anonymous";
      img.src = base64;
      img.onload = () => {
        const colorThief = new ColorThief();
        try {
          const [r, g, b] = colorThief.getColor(img);
          const hex = rgbToHex(r, g, b);
          setColor(hex);
          setValue("color", hex); // update form value
        } catch (err) {
          console.error("ColorThief error:", err);
        }
      };
    }
    setFileList(newFileList.slice(-1));
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url || (file.preview as string);
    if (!src && file.originFileObj) {
      src = await getBase64(file.originFileObj as RcFileType);
    }
    setPreviewImage(src || "");
    setPreviewOpen(true);
    setPreviewTitle(file.name || "Preview");
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (!fileList[0]?.originFileObj) {
      alert("Logo wajib diupload!");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slug", data.username);
    formData.append("bio", data.bio ?? "");
    formData.append("theme_color", data.color);
    formData.append("logo", fileList[0].originFileObj);

    try {
      console.log(formData.get("logo"));
      const { data: res } = await api.post("/profile", formData, {
        withCredentials: true,
      });
      route.push("/onboarding/socialmedia");
    } catch (err: any) {
      addToast({
        title: "Create Profile Failed",
        description: err.message,
        color: "danger",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-4 shadow-lg border border-gray-200">
        <CardHeader className="flex gap-4 bg-warning/10 p-4 rounded-lg mb-4">
          <div className="flex-1">
            <h1 className="text-lg font-bold text-warning">Profile Anda</h1>
            <p className="text-xs text-warning/60">Lengkapi profil anda</p>
          </div>
          <CircularProgress
            color="warning"
            showValueLabel
            size="lg"
            value={25}
            valueLabel="1/4"
            classNames={{ value: "font-semibold" }}
          />
          <Link href="/onboarding/socialmedia" className="items-end">
            <IconChevronRight />
          </Link>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="gap-4">
            {/* File Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Brand Logo</label>
              <ImgCrop rotationSlider cropShape="rect" aspect={1}>
                <Upload
                  beforeUpload={() => false}
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  showUploadList={{ showPreviewIcon: false }}
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </div>

            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={() => setPreviewOpen(false)}
              destroyOnHidden
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
              <ColorPicker
                className="w-max"
                value={color}
                size="large"
                showText
                onChange={(val) => {
                  const hex = val.toHexString();
                  setColor(hex);
                  setValue("color", hex);
                }}
              />
            </div>

            {/* Nama */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Nama</label>
              <Input
                placeholder="Masukkan nama"
                {...register("name")}
                isRequired
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Username */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Username</label>
              <Input
                placeholder="username"
                startContent={
                  <span className="text-warning-400 text-sm font-semibold">
                    promoin.my.id/
                  </span>
                }
                {...register("username")}
                isRequired
              />
              {errors.username && (
                <span className="text-red-500 text-sm">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Bio</label>
              <Textarea
                placeholder="Enter your description"
                {...register("bio")}
                isRequired
              />
            </div>
          </CardBody>

          <CardFooter>
            <Button fullWidth type="submit" color="warning">
              Simpan Profile
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

// helper konversi rgb -> hex
function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}
