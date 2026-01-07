import { motion } from "motion/react";
import { useState, useEffect } from "react";

/**
 * Renders an absolutely positioned, accent-colored rounded square "blob" after the component mounts.
 *
 * @returns The blob element when mounted, otherwise `null`.
 */
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