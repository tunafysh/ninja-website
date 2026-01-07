import { Item, ItemTitle } from "@/components/ui/item"

/**
 * Render a full-size container with a "Shurikens" header and three outlined Item blocks labeled "Apache".
 *
 * @returns The JSX element for the Example1 UI: a full-width, full-height wrapper containing a rounded, padded container with the header and three outlined `Item` components each holding an `ItemTitle` of "Apache".
 */
export default function Example1() {
    return (
        <div className="w-full h-full">
            <div className="rounded-2xl bg-background text-foreground p-4 flex gap-2 w-100">
            <h1 className="font-bold text-2xl">Shurikens</h1>
                <Item variant={"outline"} className="border-2 border-white/25">
                    <ItemTitle>Apache</ItemTitle>
                </Item>

                <Item variant={"outline"} className="border-2 border-white/25">
                    <ItemTitle>Apache</ItemTitle>
                </Item>

                <Item variant={"outline"} className="border-2 border-white/25">
                    <ItemTitle>Apache</ItemTitle>
                </Item>
            </div>
        </div>
    )
}