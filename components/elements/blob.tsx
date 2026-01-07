import { motion } from "motion/react";
import { useState, useEffect } from "react";

export default function Blob() {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <motion.div className="absolute aspect-square bg-accent rounded-full" />
    )
}