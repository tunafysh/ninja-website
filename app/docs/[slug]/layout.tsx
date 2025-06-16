import { Nav } from "@/components/navbar";
import React from "react";

export default function DocsLayout({ children }: {children: React.ReactNode}) {
    return(
        <div>
            <Nav />
            <div></div>
            <div className="flex justify-center items-center">
                {children}
            </div>
        </div>
    )
}