import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { useTheme } from '@/context/ThemeContextProvider';
import { LaptopMinimal, Moon, Sun } from 'lucide-react';

const ThemeBtn = () => {
    const { theme, setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size='icon' variant='ghost'>
                    {theme === 'light' ? <Sun className='h-6 w-6' /> : <Moon className='h-6 w-6' />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mx-3'>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon className='mr-2 w-4 h-4' />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Sun className='mr-2 w-4 h-4'/>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    <LaptopMinimal className='mr-2 w-4 h-4'/>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ThemeBtn