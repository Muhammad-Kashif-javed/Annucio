"use client";

import { useState } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductDashboard() {
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [brochure, setBrochure] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0]);
    }
  };

  const handleBrochureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBrochure(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
    console.log(images);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-10">
      <CardHeader className="mb-5">
        <CardTitle className="text-3xl text-center">Annucio </CardTitle>
        <CardTitle className="text-lg font-medium text-center text-zinc-500">
          Let The AI Boost Your Advertisements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              placeholder="Enter product name"
              className="min-h-[50px]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Product Description</Label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Product Image</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                required
              />
              <Label
                htmlFor="images"
                className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md hover:border-primary"
              >
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm font-semibold text-gray-900">
                    Upload Image
                  </span>
                </div>
              </Label>
            </div>
            {images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index + 1}`}
                      className="h-20 w-20 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages(images.filter((_, i) => i !== index))
                      }
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="video" className="text-zinc-400">
              Product Video (Optional)
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="video"
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
              <Label
                htmlFor="video"
                className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md hover:border-primary"
              >
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm font-semibold text-gray-900">
                    Upload Video
                  </span>
                </div>
              </Label>
            </div>
            {video && (
              <div className="mt-2 flex items-center space-x-2">
                <File className="h-6 w-6 text-gray-400" />
                <span className="text-sm text-gray-500">{video.name}</span>
                <button
                  type="button"
                  onClick={() => setVideo(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="brochure" className="text-zinc-400">
              Product Brochure PDF (Optional)
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="brochure"
                type="file"
                accept=".pdf"
                onChange={handleBrochureUpload}
                className="hidden"
              />
              <Label
                htmlFor="brochure"
                className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md hover:border-primary"
              >
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm font-semibold text-gray-900">
                    Upload PDF Brochure
                  </span>
                </div>
              </Label>
            </div>
            {brochure && (
              <div className="mt-2 flex items-center space-x-2">
                <File className="h-6 w-6 text-gray-400" />
                <span className="text-sm text-gray-500">{brochure.name}</span>
                <button
                  type="button"
                  onClick={() => setBrochure(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full">
            Submit Product Information
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
