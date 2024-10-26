"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "../components/Sparkles";
import {
  PlusIcon,
  Brain,
  Download,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Star,
  Zap,
  Check,
} from "lucide-react";

import MainImg from "@/assets/MainImg.png";
import { Details } from "@/components/Details";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import Image1 from "@/assets/image1.png";
import Image2 from "@/assets/image2.png";
import Image3 from "@/assets/image3.png";
import Image4 from "@/assets/image4.png";
import Image5 from "@/assets/image5.png";
import Image6 from "@/assets/image6.png";
import Image7 from "@/assets/image1.jpg";

const reviews = [
  {
    name: "Arjun Patel",
    username: "Software Engineer",
    body: "I was skeptical at first, but this image generator exceeded all my expectations. It revolutionized the way we create visuals.",
    img: "/path/image.jpg",
  },
  {
    name: "Emily Johnson",
    username: "Marketing Manager",
    body: "I couldn't be happier with this image generator. It streamlined our design process and saved us countless hours. Highly recommended!",
    img: "/path/image.jpg",
  },
  {
    name: "Ravi Kumar",
    username: "@ravi",
    body: "This image generator is a game-changer. The quality and variety of images are outstanding.",
    img: "/path/image.jpg",
  },
  {
    name: "Jane Smith",
    username: "@jane",
    body: "The image generator is simply amazing. It has become an essential tool in our creative workflow.",
    img: "/path/image.jpg",
  },
  {
    name: "Priya Singh",
    username: "@priya",
    body: "I am thoroughly impressed with this image generator. It has made our projects look professional and polished.",
    img: "/path/image.jpg",
  },
  {
    name: "James Brown",
    username: "@james",
    body: "This image generator is fantastic. It has significantly improved the quality of our visual content.",
    img: "/path/image.jpg",
  },
];

const steps = [
  {
    icon: <Sparkles className="w-8 h-8 text-blue-400" />,
    title: "Step 1: Enter Your Prompt",
    description:
      "Describe your desired image in detail using natural language.",
    bgGradient: "from-blue-500/10 to-purple-500/10",
  },
  {
    icon: <Brain className="w-8 h-8 text-purple-400" />,
    title: "Step 2: AI Generation",
    description:
      "Our AI system processes your prompt and creates unique artwork.",
    bgGradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    icon: <Download className="w-8 h-8 text-pink-400" />,
    title: "Step 3: Download Result",
    description: "Get your generated image instantly and use it as you wish.",
    bgGradient: "from-pink-500/10 to-blue-500/10",
  },
];
const images = [
  {
    id: 1,
    // span: 'col-span-2 row-span-2',
    src: Image1,
    alt: "Large featured image",
    width: 600,
    height: 600,
  },
  {
    id: 2,
    span: "col-span-1 row-span-1",
    src: Image2,
    alt: "Small square image",
    width: 300,
    height: 300,
  },
  {
    id: 3,
    span: "col-span-1 row-span-1",
    src: Image3,
    alt: "Small square image",
    width: 300,
    height: 300,
  },
  {
    id: 4,
    span: "col-span-1 row-span-2",
    src: Image4,
    alt: "Vertical rectangle image",
    width: 300,
    height: 600,
  },
  {
    id: 5,
    span: "col-span-2 row-span-1",
    src: Image5,
    alt: "Horizontal rectangle image",
    width: 600,
    height: 300,
  },
  {
    id: 6,
    span: "col-span-1 row-span-1",
    src: Image6,
    alt: "Small square image",
    width: 300,
    height: 300,
  },
];

const freePlanFeatures = [
  "5 images per day",
  "Basic image resolution (512x512)",
  "Standard art styles",
  "Basic text-to-image",
  "Community support",
  "Basic prompt builder",
  "Web-based generation",
];

const proPlanFeatures = [
  "Everything in Free, plus:",
  "Unlimited images",
  "HD resolution (1024x1024)",
  "Priority generation",
  "Advanced art styles",
  "Image editing tools",
  "Prompt library access",
  "Batch generation",
  "Commercial usage rights",
  "24/7 priority support",
];
const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl border p-6", // increased padding
        "border-gray-950/[.1] bg-[#101010] ",
        "dark:border-gray-50/[.1] dark:bg-[#101010]",
        // Responsive widths
        "w-[280px] sm:w-[320px] md:w-[384px] lg:w-[448px]"
      )}
    >
      {/* Testimonial text */}
      <blockquote className="mb-4 text-base sm:text-lg">{body}</blockquote>

      {/* Author info */}
      <div className="flex items-center gap-3">
        <Image
          className="h-10 w-10 rounded-full sm:h-12 sm:w-12"
          width="48"
          height="48"
          alt="images"
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white sm:text-base">
            {name}
          </figcaption>
          <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            {username}
          </p>
        </div>
      </div>
    </figure>
  );
};

export default function Home() {
  const items = [
    {
      title: "How to protect your personal information?",
      content:
        "You are in control of how much information you share on our AI image generator platform. Don't post information you consider to be private, and be thoughtful about when you want to publicly share your location.",
    },
    {
      title: "How to generate and download AI images?",
      content:
        "To generate AI images, simply enter your desired prompts in the input box and click on the 'Generate' button. Once the images are generated, you can download them by clicking the 'Download' button.",
    },
    {
      title: "How to customize your AI image settings?",
      content:
        "Navigate to the settings page by clicking on the 'Settings' icon in the navigation bar. Here, you can customize various parameters such as image resolution, style, and more.",
    },
    {
      title: "How to add your phone number to your account?",
      content:
        "Click the 'More' icon and select 'Settings and privacy' from the drop-down menu. Click on the 'Your account' tab and choose 'Account information'. Select 'Phone' from the drop-down menu.",
    },
  ];
  return (
    <main className="min-h-screen w-full bg-[#0A0A0A]">
      <div className="pt-14 sm:pt-16">
        {/* Hero Section */}
        {/* Hero Section */}
        <section className="py-8 sm:py-12 md:py-24 text-center justify-center flex flex-col items-center">
          <div className="text-center z-10 px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight mx-auto">
              Build your dream site
              <br />
              without the hassle of coding
            </h1>
            <p className="text-lg text-gray-300 mb-8 mx-auto max-w-2xl">
              No coding skills needed. Build your dream website hassle-free,
              enjoying a seamless and efficient process that saves time and
              effort.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/create" className="w-full sm:w-auto">
                <Button className="bg-white text-black hover:bg-gray-200">
                  Start for free
                </Button>
              </Link>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-black"
              >
                Explore
              </Button>
            </div>
          </div>
        </section>

        {/* Sparkles Effect Section */}
        <div className="relative h-48 sm:h-64 md:h-80 w-full">
          <div className="relative h-full w-full flex justify-center items-center overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#50e850,transparent_70%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#76c57666] after:bg-[#0A0A0A]">
            <Sparkles
              density={800}
              className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
            />
          </div>
        </div>

        {/* Image slider section */}
        <div className="w-full px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="relative w-full h-auto rounded-2xl overflow-hidden">
              <Image
                src={MainImg}
                alt="Slider Image"
                layout="responsive" // Use responsive layout
                width={700} // Set a default width
                height={475} // Set a default height
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* how does it work */}
        <div className="py-16 px-4 w-full bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-gray-400 text-lg">Our Simple 3-Step Process</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative group rounded-2xl p-8 bg-gradient-to-br ${step.bgGradient} border border-gray-800 hover:border-gray-700 transition-all duration-300`}
                >
                  <div className="absolute inset-0 bg-black/50 rounded-2xl transition-opacity group-hover:opacity-0" />

                  <div className="relative">
                    <div className="bg-gray-900 p-4 rounded-xl inline-block mb-6 shadow-lg">
                      {step.icon}
                    </div>

                    <h3 className="text-white text-xl font-bold mb-4">
                      {step.title}
                    </h3>

                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {step.description}
                    </p>
                  </div>

                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* image grid */}
        <div className="container mx-auto p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">
              Transform Your Ideas into Reality with Visionary.ai
            </h2>
            <p className="text-gray-500">
              Experience the future of AI-powered image generation
            </p>
          </div>
          <div className="grid grid-cols-4 gap-4 max-w-6xl mx-auto">
            {images.map((image) => (
              <div
                key={image.id}
                className={`${image.span} relative group overflow-hidden rounded-xl`}
              >
                <Image
                  alt={image.alt}
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {/* marque */}
        <div className="relative mx-auto w-full max-w-6xl flex flex-col items-center justify-center overflow-hidden rounded-lg  py-8 md:shadow-xl">
          <div className="flex w-full flex-col gap-8">
            {/* First row */}
            <Marquee pauseOnHover className="[--duration:40s] [--gap:2rem]">
              {firstRow.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </Marquee>

            {/* Second row */}
            <Marquee
              pauseOnHover
              reverse
              className="[--duration:35s] [--gap:2rem]"
            >
              {secondRow.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </Marquee>
          </div>

          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[40%] bg-gradient-to-l from-background" />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Pricing</h2>
          <p className="text-gray-500">Choose the plan that fits your needs</p>
        </div>
        <div className="flex items-center justify-center w-full max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-4/5">
            {/* Free Plan */}

            <div className="bg-black/5 border border-green-500/20 rounded-lg p-6 w-full relative flex flex-col">
              <div className="mb-4">
                <div className="text-2xl font-bold mb-2">Free</div>
                <p className="text-gray-500">No credit card required</p>
              </div>

              <div className="space-y-3 flex-grow">
                {freePlanFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button className="w-full bg-green-500 text-white rounded-md py-3 hover:bg-green-600 transition-colors text-sm font-medium">
                  Start creating
                </button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-black/5 border border-green-500/20 rounded-lg p-6 w-full relative flex flex-col">
              <div className="absolute -top-3 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                Most Popular
              </div>

              <div className="mb-4">
                <div className="text-2xl font-bold mb-2">$0.00</div>
                <p className="text-gray-500">per month</p>
              </div>

              <div className="space-y-3 flex-grow">
                {proPlanFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button className="w-full bg-gray-500 text-white rounded-md py-3 hover:bg-gray-600 transition-colors text-sm font-medium">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full bg-[#0A0A0A] px-4 py-12">
          <div className="mx-auto w-full max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-300">FAQ</h2>
            <p className="text-gray-400 mb-8">
              Frequently Asked Questions about our AI Image Generator
            </p>
            <Details className="space-y-3">
              {items.map((item, index) => (
                <Details.Item
                  key={index}
                  className="overflow-hidden rounded-2xl bg-[#1A1A1A] transition-all duration-300"
                >
                  {({ isActive, toggle }) => (
                    <>
                      <div
                        className="flex cursor-pointer items-center justify-between p-4"
                        onClick={toggle}
                      >
                        <div className="text-base text-gray-300">
                          {item.title}
                        </div>
                        {isActive ? (
                          <XMarkIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <PlusIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <Details.Content
                        isActive={isActive}
                        className="transition-all duration-300"
                      >
                        <div className="px-4 pb-4">
                          <p className="text-sm text-gray-400">
                            {item.content}
                          </p>
                        </div>
                      </Details.Content>
                    </>
                  )}
                </Details.Item>
              ))}
            </Details>
          </div>
        </div>

        {/* footer */}
        <footer className="bg-black text-gray-300 py-16 relative overflow-hidden">
          {/* Gradient Orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full filter blur-[128px] opacity-10" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] opacity-10" />

          <div className="max-w-6xl mx-auto px-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
              {/* Product Column */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                  <Zap className="text-green-400" size={18} />
                  Product
                </h3>
                <ul className="space-y-3">
                  {[
                    "Features",
                    "Pricing",
                    "Examples",
                    "AI Models",
                    "API Access",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-green-400 transition-all duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-0 group-hover:w-2 transition-all duration-300 h-[2px] bg-green-400" />
                        <span>{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Column */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                  <Star className="text-green-400" size={18} />
                  Resources
                </h3>
                <ul className="space-y-3">
                  {[
                    "Documentation",
                    "Tutorials",
                    "Blog",
                    "Community",
                    "Style Guide",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-green-400 transition-all duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-0 group-hover:w-2 transition-all duration-300 h-[2px] bg-green-400" />
                        <span>{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Column */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                  <Mail className="text-green-400" size={18} />
                  Company
                </h3>
                <ul className="space-y-3">
                  {[
                    "About Us",
                    "Terms of Service",
                    "Privacy Policy",
                    "Contact",
                    "Status",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-green-400 transition-all duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-0 group-hover:w-2 transition-all duration-300 h-[2px] bg-green-400" />
                        <span>{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter Section */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-lg">
                  Stay in the Loop
                </h3>
                <p className="text-sm text-gray-400">
                  Get weekly AI art tips and exclusive features directly in your
                  inbox
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-gray-900/50 backdrop-blur border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300"
                  />
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-lg transition-all duration-300 font-medium">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-16 pt-8 border-t border-gray-800/50 backdrop-blur">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-400">
                  © 2024 AI Image Generator. All rights reserved.
                </div>

                {/* Social Links */}
                <div className="flex space-x-6">
                  {[Twitter, Github, Linkedin, Instagram].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="hover:text-green-400 transform hover:scale-110 transition-all duration-300"
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
