"use client"
import { EvervaultCard } from "@/components/ui/evervault-card";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import appDark from "@/public/app-dark.png"
import appLight from "@/public/app-light.png"
import { Box, Settings } from "lucide-react";
import { GridItem } from "@/components/ui/griditem"
import { GlowingEffect } from "@/components/ui/glowing-card";

export default function Home() {
  const { theme } = useTheme()
  return (
    <div className="h-full">
      <div className="px-4 py-20 md:py-20 bg-muted">

        {/* <WavyBackground speed="fast" colors={["blue", "pink"]}> */}

        <h1 className="relative z-10 mt-32 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-6xl dark:text-slate-300">
          {"Server management,"
            .split(" ")
            .map((word, index) => (
              <span
                key={index}
                className="mr-2 inline-block"
              >
                {word}
              </span>
            ))}
        </h1>
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-6xl dark:text-slate-300">
          {"made easy."
            .split(" ")
            .map((word, index) => (
              <span
              key={index}
              className="mr-2 inline-block"
              >
                {word}
              </span>
            ))}
        </h1>
        <p
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Ninja is a powerful and user-friendly server management tool that takes care of Apache, Nginx, and PHP management, allowing you to focus on what matters most: your projects.
        </p>
        <div
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
          <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Download Now
          </button>
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Read the Docs
          </button>
        </div>
          {/* </WavyBackground> */}

          </div>
        <div
          className="w-full flex items-center justify-center"
        >
        <div
          className="relative z-10 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900 w-fit -top-8"
          >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            {
              theme == "dark" ? 
              <Image
              src={appDark}
              alt="App preview"
              className=" h-auto w-full object-cover"
              height={800}
              width={1200}
              />:
              <Image
              src={appLight}
              alt="App preview"
              className="h-auto w-full object-cover"
              height={1000}
              width={1200}
              />

            }
          </div>
        </div>
      </div>
      <div className="w-full flex justify-around items-center mb-4">
<ul className="grid grid-cols-1 gap-4 md:grid-cols-5 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 max-w-4xl mx-auto">
  <GridItem
    area="md:col-span-2 xl:col-span-3"
    icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
    title="By developers, for developers."
    description="Ninja was made with a developer's experience as a priority, so if you have problems with the program, check the docs or leave a github issue."
  />
  <GridItem
    area="md:col-span-2 xl:col-span-3 xl:row-start-2"
    icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
    title="Your time is precious, let Ninja handle the servers."
    description="Leveraging a custom V8 engine, you can automate your servers, Version control and anything else using Ninjascript."
  />
  <li className="min-h-[14rem] list-none md:col-span-8 md:row-span-2 xl:col-span-3 xl:row-span-2 xl:col-start-4">
    <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
        <EvervaultCard text="lock" />
        <h1 className="text-foreground mt-2 text-2xl font-bold">Secure by design.</h1>
        <h2 className="dark:text-white text-black mt-2 text-md">
          By using Tauri, a Rust based application framework, we can ensure that your projects and tools are always secure.
        </h2>
      </div>
    </div>
  </li>
</ul>
    </div>
      <footer className="h-16 w-full flex items-center justify-center bg-secondary mt-4">
      © Copyright Hanan Smani 2025, All rights reserved
    </footer>
    </div>
  );
}
