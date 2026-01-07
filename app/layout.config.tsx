import { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import logoSVG from "@/public/logo-dark.svg"
import Image from 'next/image';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <div>
        <Image src={logoSVG} width={70} height={40} alt='Logo' className='dark:invert' />
      </div>
  }
};