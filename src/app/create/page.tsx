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

const getPreviewRatioStyle = (ratio: string) => {
  const [width, height] = ratio.split(":").map(Number);
  const scale = 16;
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
      link.download = `Visionary.AI-image-${Date.now()}.png`;
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
      setOutputImg(null); // Clear previous image while loading

      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: values.prompt,
          aspectRatio,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.url) {
        setOutputImg(data.url);
      } else {
        toast({
          variant: "destructive",
          description: data.error || "Failed to generate image",
        });
      }
    } catch (error) {
      console.error("Generation failed:", error);
      toast({
        variant: "destructive",
        description: "Failed to generate image. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        {/* Generator Controls */}
        <div className="bg-neutral-900 rounded-lg p-6 space-y-6">
          <div>
            <h1 className="text-xl font-semibold text-white">
            Visionary.AI Image Generator
            </h1>
            <p className="text-sm text-neutral-400">
              Select a style, type to get your own AI image
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          {...field}
                          placeholder="Describe your visionary-ai image. Default: a person"
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

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
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
          Visionary.AI Image Generator Result
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
                {loading
                  ? "Generating your image..."
                  : "Your generated image will appear here"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
