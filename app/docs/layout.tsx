import Sidebar from "@/components/Sidebar"

export  default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}