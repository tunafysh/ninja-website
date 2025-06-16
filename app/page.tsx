import { Nav } from "@/components/navbar";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { motion } from "motion/react";

export default function Home() {
  console.log(motion)

  return (
    <div>
      <div className="px-4 py-20 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-6xl dark:text-slate-300">
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
        <div
          className="w-full flex items-center justify-center"
        >
        <div
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900 max-w-6xl"
          >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src=""
              alt="App preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
              />
          </div>
        </div>
        </div>
      </div>
      <div className="border rounded-md border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
 
      <EvervaultCard text="Secure by default." />
 
      <h2 className="dark:text-white text-black mt-4 text-md">
        By using Tauri, a Rust based application framework, we can ensure that your projects and tools are always secure.
      </h2>
    </div>
    </div>
  );
}
