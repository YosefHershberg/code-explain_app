import { Input } from '@/components/ui/input'
import { Search as SearchIcon } from 'lucide-react';
import { Dialog, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import useSearch from '@/hooks/useSearch';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import LoadingSpinner from '../ui/LoadingSpinner';
import { DropdownMenuSeparator } from '../ui/dropdown-menu';

const NavSearchbar = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { results, isLoading, triggerSearch } = useSearch(searchQuery)

    useEffect(() => {
        if (searchQuery !== '') {
            setIsTyping(true)
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            typingTimeoutRef.current = setTimeout(() => {
                setIsTyping(false)
                triggerSearch();
            }, 1000); // 1 seconds delay
        }
    }, [searchQuery]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        triggerSearch();
    }

    const handleClose = () => {
        setSearchQuery('')
        setIsDialogOpen(false)
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={handleClose}>
            <Button variant='empty' className='relative p-0' onClick={() => setIsDialogOpen(true)}>
                <Input
                    className='w-60'
                    placeholder='Search repos...'
                />
                <SearchIcon className='size-5 absolute right-2 top-1/2 transform -translate-y-1/2' />
            </Button>
                <DialogContent className='h-[28rem] flex flex-col justify-start items-center'>
                    <DialogHeader>
                        <DialogTitle className='text-center'>Search for a github repository</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className='relative w-full mt-5'>
                        <Input
                            className='w-full pr-8 dark:bg-slate-900 bg-slate-200'
                            placeholder='Search repos...'
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <SearchIcon className='size-5 absolute right-2 top-1/2 transform -translate-y-1/2' />
                    </form>
                    {isLoading || isTyping ?
                        <div className='flex justify-center items-center flex-1'>
                            <LoadingSpinner />
                        </div> :
                        searchQuery !== '' ? results &&
                            <ul className='overflow-y-auto overflow-x-hidden w-full'>
                                {results.items.map((item: any) => (
                                    <li key={item.id} className='w-full' onClick={() => setIsDialogOpen(false)}>
                                        <Link to={`/repositories/${item.full_name}`}>
                                            <Button
                                                className="p-0 h-[2rem] text-blue-900"
                                                variant='link'
                                            >
                                                {item.full_name}
                                            </Button>
                                        </Link>
                                        <DropdownMenuSeparator />
                                    </li>
                                ))}
                            </ul> :
                            <div className='flex justify-center items-center flex-1'>
                                <p>Go ahead and type something... </p>
                            </div>
                    }
                </DialogContent>
        </Dialog>
    )
}

export default NavSearchbar