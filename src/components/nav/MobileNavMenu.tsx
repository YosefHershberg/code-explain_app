import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Menu, Sun, Moon, LaptopMinimal } from 'lucide-react';
import { useTheme } from '@/context/ThemeContextProvider';
import { Button } from '../ui/button';

const MobileNavMenu = () => {
    const { theme, setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='secondary' size='icon'>
                    <Menu className='w-1/2 h-1/2' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[10rem] mx-2">
                <DropdownMenuItem>
                    Sign in
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Log in
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        {theme === 'light' ? <Sun className='size-4 mr-2' /> : <Moon className='size-4 mr-2' />}
                        <span>Theme</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => setTheme('dark')}>
                                <Moon className='mr-2 w-4 h-4' />
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('light')}>
                                <Sun className='mr-2 w-4 h-4' />
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('system')}>
                                <LaptopMinimal className='mr-2 w-4 h-4' />
                                System
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MobileNavMenu