"use client"
import { useEffect, useState } from "react";

export default function Navbar() {
    const [docs, setDocs] = useState(false);
    useEffect(() => {
        if ( window.location.pathname.includes("/docs")) {
            console.log("docs");
            setDocs(true);
        } else {
            console.log("not docs");
            setDocs(false);
        }
    }, []);
  return (
    <div className="h-16 w-full flex items-center border-b-1 px-6 border-foreground">
      <h1>{docs? "Ninja Docs": "Ninja "}</h1>
    </div>
  );
}