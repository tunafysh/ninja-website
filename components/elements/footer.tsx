import { CornerBrackets } from "../ui/corner-brackets";

export default function Footer() {
  return (
    <footer className="corner-box mx-auto border border-foreground/20 relative w-full h-32 bg-muted px-8 py-4">
        <CornerBrackets variant={[true,true,false,false]} />
        <div></div>
        <div>
            <p className="text-foreground/70 text-lg font-medium text-center">
                Copyright © 2026 Hannan Smani. All rights reserved. In memoriam of 
                <span className="font-walt ml-2">S</span>
                <span className="font-jean">Op</span>
                <span className="font-walt">h</span>
                <span className="font-jean">i</span>
                <span className="font-walt">E</span> 
            </p>
        </div>
    </footer>
  )
}
