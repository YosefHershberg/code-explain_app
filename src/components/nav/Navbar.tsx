import { useState, useEffect } from 'react';
import ThemeBtn from './ThemeBtn';
import MobileNavMenu from './MobileNavMenu';
import UserButton from '../UserButton';
import NavSearchbar from './NavSearchbar';
import { SignedIn } from '@clerk/clerk-react';

const Navbar = () => {
    const [scrollBackground, setScrollBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 150) {
                setScrollBackground(true);
            } else {
                setScrollBackground(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`z-20 fixed h-16 shadow-md w-full flex justify-center bg-slate-200 dark:bg-slate-800 bg-opacity-80 transition-all duration-500 ${scrollBackground ? 'backdrop-blur-sm' : ''}`}>
            <div className="w-[90rem] flex items-center px-4 justify-between">
                <a href="/">
                    <h1 className="text-2xl font-black tracking-tighter text-sky-900 dark:text-white">CodeExplainer</h1>
                </a>
                <div className="sm:flex hidden gap-3 items-center">
                    <SignedIn>
                        <NavSearchbar />
                    </SignedIn>
                    <UserButton />
                    <ThemeBtn />
                </div>
                <div className='sm:hidden block'>
                    <MobileNavMenu />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;