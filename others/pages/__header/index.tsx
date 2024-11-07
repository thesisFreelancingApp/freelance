import { ThemeSwitcher } from '@/components/theme-switcher'
import Logo from '@/public/WaiaHive-LogoIcon.svg'
import Link from 'next/link'
import HeaderAuth from './header-auth'

const Header = ({}) => {
    return (
        <header className="w-full border-b border-b-foreground/6">
            <nav className="container flex items-center justify-between h-16 px-4 mx-auto md:px-8">
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <img
                            className="w-12 h-12 md:w-16 md:h-16"
                            src={Logo.src}
                            alt="WaiaHive Logo"
                        />
                        <p className="text-3xl font-semibold">WaiaHive</p>
                    </div>
                </Link>
                <div className="flex ">
                    <HeaderAuth />
                    <ThemeSwitcher />
                </div>
            </nav>
        </header>
    )
}

export default Header
