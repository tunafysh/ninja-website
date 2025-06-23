"use client"
import { EvervaultCard } from "@/components/ui/evervault-card";
import { useTheme } from "next-themes";
import { usePlatform } from "@/hooks/use-platform";
import Image from "next/image";
import appDark from "@/public/app-dark.png"
import appLight from "@/public/app-light.png"
import windows from "@/public/windows.svg"
import mac from "@/public/apple.svg"
import apache from "@/public/apache.svg"
import mySQL from "@/public/mysql.svg"
import nodejs from "@/public/nodejs.svg"
import { Box, Settings, Sparkles, Zap, Shield, Code2 } from "lucide-react";
import { GridItem } from "@/components/ui/griditem"
import { GlowingEffect } from "@/components/ui/glowing-card";
import { Nav } from "@/components/navbar";
import { motion } from "motion/react";

export default function Home() {
  const { theme } = useTheme()
  const platform = usePlatform()
  
  const getDownloadText = () => {
    switch (platform) {
      case 'windows':
        return 'Download for Windows'
      case 'mac':
        return 'Download for Mac'
      case 'linux':
        return 'Download for Linux'
      default:
        return 'Download Now'
    }
  }
  return (
    <div className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.03)_25px,rgba(255,255,255,0.03)_26px,transparent_27px,transparent_74px,rgba(255,255,255,0.03)_75px,rgba(255,255,255,0.03)_76px,transparent_77px),linear-gradient(rgba(255,255,255,0.03)_24px,transparent_25px,transparent_26px,rgba(255,255,255,0.03)_27px,rgba(255,255,255,0.03)_74px,transparent_75px,transparent_76px,rgba(255,255,255,0.03)_77px)] bg-[size:100px_100px] dark:bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.03)_25px,rgba(255,255,255,0.03)_26px,transparent_27px,transparent_74px,rgba(255,255,255,0.03)_75px,rgba(255,255,255,0.03)_76px,transparent_77px),linear-gradient(rgba(255,255,255,0.03)_24px,transparent_25px,transparent_26px,rgba(255,255,255,0.03)_27px,rgba(255,255,255,0.03)_74px,transparent_75px,transparent_76px,rgba(255,255,255,0.03)_77px)]"></div>
      </div>

      <Nav/>
      
      <div className="h-full relative z-10">
        <div className="px-4 py-20 md:py-20 bg-background relative">
          {/* Decorative elements around the hero */}
          <div className="absolute top-32 left-8 opacity-30">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Code2 className="w-8 h-8 text-purple-500" />
            </motion.div>
          </div>
          
          <div className="absolute top-48 right-12 opacity-30">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="w-6 h-6 text-blue-500" />
            </motion.div>
          </div>

          <div className="absolute top-60 left-1/4 opacity-20">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5 text-pink-500" />
            </motion.div>
          </div>

          <motion.h1 
            className="relative z-10 mt-32 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-6xl dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {"Server management,"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  className="mr-2 inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
          </motion.h1>
          
          <motion.h1 
            className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-6xl dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {"made easy."
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  className="mr-2 inline-block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
          </motion.h1>
          
          <motion.p
            className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Ninja is a powerful and user-friendly server management tool that takes care of Apache, Nginx, and PHP management, allowing you to focus on what matters most: your projects.
          </motion.p>
          
          <motion.div
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.button 
              className="w-64 transform rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/25 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {platform == "windows"? <Image src={windows} alt="windows" width={20} height={20} /> : platform == "mac"? <Image src={mac} alt="mac" width={24} height={24} /> : <Sparkles />}
                {getDownloadText()}
              </span>
            </motion.button>
            
            <motion.button 
              className="w-60 transform rounded-lg border border-gray-300 bg-white/80 backdrop-blur-sm px-6 py-3 font-medium text-black transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg dark:border-gray-700 dark:bg-black/80 dark:text-white dark:hover:bg-black/90"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <Code2 className="w-4 h-4" />
                Read the Docs
              </span>
            </motion.button>
          </motion.div>
        </div>
        
        <div className="w-full flex items-center justify-center bg-muted relative">
          {/* Decorative elements around the app preview */}
          <div className="absolute top-4 left-8 opacity-20">
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Shield className="w-6 h-6 text-green-500" />
            </motion.div>
          </div>
          
          <div className="absolute bottom-4 right-8 opacity-20">
            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Settings className="w-6 h-6 text-blue-500" />
            </motion.div>
          </div>

          <motion.div
            className="relative z-10 rounded-3xl border border-neutral-200 bg-neutral-100/80 backdrop-blur-sm p-4 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900/80 w-fit -top-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            whileHover={{ y: -4 }}
          >
            <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 relative">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl"></div>
              {
                theme == "dark" ? 
                <Image
                  src={appDark}
                  alt="App preview"
                  className="h-auto w-full object-cover relative z-10"
                  height={800}
                  width={1200}
                />:
                <Image
                  src={appLight}
                  alt="App preview"
                  className="h-auto w-full object-cover relative z-10"
                  height={1000}
                  width={1200}
                />
              }
            </div>
          </motion.div>
        </div>
        
        <div className="w-full flex justify-around items-center pb-8 pt-4 bg-accent relative">
          {/* Floating decorative elements */}
          <div className="absolute top-8 left-16 opacity-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-12 h-12 border-2 border-dashed border-purple-500 rounded-full"></div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-8 right-16 opacity-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-sm"></div>
            </motion.div>
          </div>

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-5 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 max-w-4xl mx-auto relative z-10">
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
              <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 bg-background">
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
        
        <motion.footer 
          className="h-16 w-full flex items-center justify-center bg-gradient-to-r from-purple-700 via-[#7C2470] to-pink-700 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
          <span className="relative z-10 text-white font-medium">
            © Copyright Hanan Smani 2025, All rights reserved
          </span>
        </motion.footer>
      </div>
    </div>
  );
}