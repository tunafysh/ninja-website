import React from "react";

export default function DocsLayout({ children }: {children: React.ReactNode}) {
    return(
        <div>
            <div></div>
            <div className="flex justify-center items-center">
                {children}
            </div>
        </div>
    )
}