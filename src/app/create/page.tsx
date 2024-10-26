"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  prompt: z
    .string()
    .min(7, { message: "Prompt should be at least 7 characters" }),
});

const aspectRatios = [
  ["2:3", "3:2", "1:1", "16:9"],
  ["21:9", "9:16", "9:21", "4:5"],
  ["5:4", "3:4", "4:3"],
];

// Helper functions for aspect ratio styling
const getPreviewRatioStyle = (ratio: string) => {
  const [width, height] = ratio.split(":").map(Number);
  const scale = 16; // Smaller preview size
  return {
    width: `${(width / Math.max(width, height)) * scale}px`,
    height: `${(height / Math.max(width, height)) * scale}px`,
  };
};

const getContainerRatioStyle = (ratio: string) => {
  const [width, height] = ratio.split(":").map(Number);
  return {
    paddingTop: `${(height / width) * 100}%`,
  };
};

export default function ImageGenerator() {
  const [outputImg, setOutputImg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const handleAspectRatioChange = (ratio: string) => {
    setAspectRatio(ratio);
  };

  const handleDownload = async () => {
    if (!outputImg) return;

    try {
      const response = await fetch(outputImg);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Artsafari-ai-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        variant: "destructive",
        description: "Failed to download image. Please try again.",
      });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await fetch("/api/image", {
        method: "POST",
        body: JSON.stringify({ ...values, aspectRatio, isPublic }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setOutputImg(data.url);
      } else {
        toast({ variant: "destructive", description: data.error });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        {/* Generator Controls */}
        <div className="bg-neutral-900 rounded-lg p-6 space-y-6 ">
          <div>
            <h1 className="text-xl font-semibold text-white">
              ArtSafari AI Image Generator
            </h1>
            <p className="text-sm text-neutral-400">
              Select a style, type to get your own ai image
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            {...field}
                            placeholder="Describe your Artsafari AI image. Default: a person"
                            className="min-h-[120px] resize-none bg-neutral-800 border-neutral-700 text-white rounded-lg p-4 pt-8 placeholder-neutral-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <div className="absolute top-3 left-4 text-xs font-medium text-neutral-400">
                            Prompt
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white">
                  Image Dimensions
                </label>
                <div className="space-y-1.5">
                  {aspectRatios.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-1.5">
                      {row.map((ratio) => (
                        <button
                          key={ratio}
                          type="button"
                          onClick={() => handleAspectRatioChange(ratio)}
                          className={`p-2 rounded-lg border flex-1 transition-all ${
                            aspectRatio === ratio
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-neutral-700 hover:border-neutral-600 bg-neutral-800"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-1.5">
                            <div className="flex items-center justify-center w-8 h-8">
                              <div
                                className={`${
                                  aspectRatio === ratio
                                    ? "bg-blue-500"
                                    : "bg-neutral-400"
                                }`}
                                style={getPreviewRatioStyle(ratio)}
                              />
                            </div>
                            <span
                              className={`text-xs ${
                                aspectRatio === ratio
                                  ? "text-blue-500"
                                  : "text-neutral-300"
                              }`}
                            >
                              {ratio}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between py-0 border-y border-neutral-800"></div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      fill="none"
                      height="16"
                      viewBox="0 0 16 16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      className="animate-spin mr-2"
                    >
                      <clipPath id="clip0_1449_422">
                        <path d="m0 0h16v16h-16z" />
                      </clipPath>
                      <g
                        clipPath="url(#clip0_1449_422)"
                        clipRule="evenodd"
                        fill="#000"
                        fillRule="evenodd"
                      >
                        <path d="m8 0c.55228 0 1 .447715 1 1v3c0 .55228-.44772 1-1 1s-1-.44772-1-1v-3c0-.552285.44772-1 1-1z" />
                        <path
                          d="m8 11c.55228 0 1 .4477 1 1v3c0 .5523-.44772 1-1 1s-1-.4477-1-1v-3c0-.5523.44772-1 1-1z"
                          opacity=".4"
                        />
                        <path
                          d="m16 8c0 .55228-.4477 1-1 1h-3c-.5523 0-1-.44772-1-1s.4477-1 1-1h3c.5523 0 1 .44772 1 1z"
                          opacity=".2"
                        />
                        <path
                          d="m5 8c0 .55228-.44772 1-1 1h-3c-.552285 0-1.00000007-.44772-1.00000004-1 .00000002-.55228.44771504-1 1.00000004-1h3c.55228 0 1 .44772 1 1z"
                          opacity=".6"
                        />
                        <path
                          d="m13.6569 13.6568c-.3905.3906-1.0237.3906-1.4142 0l-2.1213-2.1213c-.39055-.3905-.39055-1.0237 0-1.4142.3905-.39051 1.0237-.39051 1.4142 0l2.1213 2.1213c.3905.3906.3905 1.0237 0 1.4142z"
                          opacity=".3"
                        />
                        <path
                          d="m5.87859 5.87868c-.39053.39052-1.02369.39052-1.41422 0l-2.12132-2.12132c-.39052-.39053-.39052-1.02369 0-1.41422.39053-.39052 1.02369-.39052 1.41422 0l2.12132 2.12132c.39052.39053.39052 1.02369 0 1.41422z"
                          opacity=".7"
                        />
                        <path
                          d="m2.29289 13.6066c-.39052-.3905-.39052-1.0237 0-1.4142l2.12132-2.1213c.39053-.39054 1.02369-.39054 1.41422 0 .39052.3905.39052 1.0237 0 1.4142l-2.12132 2.1213c-.39053.3905-1.02369.3905-1.41422 0z"
                          opacity=".5"
                        />
                        <path
                          d="m10.071 5.82845c-.39055-.39053-.39056-1.02369 0-1.41422l2.1213-2.12132c.3905-.39052 1.0237-.39052 1.4142 0 .3905.39053.3905 1.02369 0 1.41422l-2.1213 2.12132c-.3905.39052-1.0237.39052-1.4142 0z"
                          opacity=".1"
                        />
                      </g>
                    </svg>
                    Loading...
                  </>
                ) : (
                  "Generate"
                )}
              </Button>

              <div className="text-center text-sm text-neutral-400">
                Contact:{" "}
                <a
                  href="mailto:nishalpoojary09@gmail.com"
                  className="text-blue-400 hover:text-blue-300"
                >
                  support@artsafari.ai
                </a>
              </div>
            </form>
          </Form>
        </div>

        {/* Result Display */}
        <div className="bg-neutral-900 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">
            ArtSafari AI Image Generator Result
          </h2>
          <div
            className="relative bg-neutral-800 rounded-lg overflow-hidden"
            style={getContainerRatioStyle(aspectRatio)}
          >
            {outputImg ? (
              <div className="absolute inset-0 w-full h-full group">
                <Image
                  src={outputImg}
                  alt="Generated image"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black/50 text-white border-white/20 hover:bg-black/70"
                    onClick={handleDownload}
                  >
                    Download Image <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center text-neutral-400">
                Your generated image will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
