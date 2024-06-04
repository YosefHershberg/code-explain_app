import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"
import useSearch from "@/hooks/useSearch"

const scrollUp = () => {
    window.scrollTo({
        top: window.innerWidth >= 639 ? 160 : 100,
        behavior: "smooth"
    });
};

const Searchbar = () => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const inputRef = useRef<any>()
    const dropdownRef = useRef<any>()

    const { results, isLoading, triggerSearch } = useSearch(searchQuery)

    useEffect(() => {
        results && setIsDropdownOpen(true)
    }, [results]);

    useLayoutEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        triggerSearch()
    }

    return (
        <div className="flex flex-col">
            <form className="flex sm:flex-row flex-col gap-3 sm:h-12 h-fit" onSubmit={handleSubmit}>
                <Input
                    ref={inputRef}
                    onFocus={scrollUp}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[18rem] sm:w-[30rem] border-slate-400 h-full rounded-full dark:text-white"
                    placeholder="Search GitHub repos..."
                />
                <Button type='submit' variant='default' className="text-md min-w-20 h-full rounded-full">
                    {isLoading ? <LoadingSpinner className="w-5 h-5" /> : 'Search'}
                </Button>
            </form>
            {isDropdownOpen && //NOTE: This is because this content is being rendered after item is selected
                <DropdownMenu open={isDropdownOpen}>
                    <DropdownMenuTrigger></DropdownMenuTrigger>
                    {/* NOTE: NEED THIS ^^^ */}
                    <DropdownMenuContent className="w-[18rem] sm:w-[30rem] max-h-[25rem] overflow-y-auto" ref={dropdownRef}>
                        {results?.items.map((item: any) => (
                            <div key={item.id}>
                                <DropdownMenuItem asChild onClick={() => setIsDropdownOpen(false)}>
                                    <Link to={`/repositories/${item.full_name}`}>
                                        <Button
                                            className="p-0 h-[2rem] text-blue-900"
                                            variant='link'
                                        >
                                            {item.full_name}
                                        </Button>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            }
        </div>
    )
}

export default Searchbar
