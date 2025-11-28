"use client"
import { motion } from "motion/react"
import { useEffect, useState } from "react";
import Distributor from "./distributor";

export default function HeroSection() {
    const [mousePos, setMousePos] = useState([0, 0]);
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            let x = event.clientX - 32;
            let y = event.clientY - 32;

            setMousePos([x, y]);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);
    return (
        <div className="relative w-full h-[90%] rounded-3xl overflow-hidden bg-[#D9D9D920]">
        
          {/* blobs behind */}
          <motion.div className="absolute aspect-square bg-secondary rounded-full left-0 bottom-0" initial={{width: "0px"}} animate={{ width: "20%"}} transition={{duration: 0.7}} />
          <motion.div className="absolute aspect-square bg-primary rounded-full right-0 top-0" initial={{width: "0px"}} animate={{ width: "15%"}} transition={{duration: 0.7}} />
          <motion.div className="absolute portrait:hidden w-32 aspect-square rounded-full bg-accent -translate-16 -translate-y-25" animate={{ x: mousePos[0], y: mousePos[1] }} />    
        
          {/* the frosted overlay */}
          <div id="blur" className="absolute inset-0 backdrop-blur-[125px] bg-black/20 grain " />
        
          {/* your hero content */}
          <div className="relative z-10 w-full h-full ">
            <div className="landscape:h-full landscape:w-1/2 portrait:h-1/2 portrait:w-full flex flex-col portrait:items-center justify-center landscape:pl-16 gap-4">
                <h1 className="text-5xl font-bold font-">Your Stack, <br/> <span className="text-accent">Streamlined</span></h1>
                <p className="w-1/2 font-semibold">{"Instead of starting your necessary software manually, let Ninja handle it so you can focus on what's important."}</p>
            </div>
            <div className="landscape:h-full landscape:w-1/2 portrait:h-1/2 portrait:w-full flex flex-col portrait:items-center justify-center landscape:pl-16 gap-4 z-20">
                <Distributor />
            </div>
          </div>
        </div>
    )
}
