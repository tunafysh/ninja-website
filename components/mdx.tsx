// components/mdx-components.tsx
'use client'

import "@/app/mdx-styles.css"
import { Link } from "lucide-react"
import { useMDXComponent } from 'next-contentlayer/hooks'
import { Button } from "./ui/button"

const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-medium mb-2" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  blockquote: (props: any) => {
    console.log(props)
    if(!props.className){
      return(
        <div className="flex flex-row items-center mb-2">
          <div className="w-2 bg-foreground self-stretch flex-shrink-0 rounded-full"></div>
          <i className="w-[calc(100% - 8px)] ml-2 mb-0 flex justify-center">{props.children[1].props.children}</i>
        </div>
      )}
    },
  pre: (props: any) => {
    if(props["data-theme"] === "one-dark-pro"){
      return(
        <pre className="overflow-x-auto p-2 bg-primary/10 border-1 border-foreground rounded-sm [&>*]:bg-transparent" {...props} />
      )
    }
    else{

      return(
        <pre className="overflow-x-auto" {...props} />
      )}},
  code: (props: any) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props} />,
  // a: (props: any) => <Button variant={"link"}>{...props}</Button>,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)
  return <div><Component components={components} /></div>
}