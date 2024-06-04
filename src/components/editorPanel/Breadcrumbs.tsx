import { useEffect, useMemo, useRef, useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbEllipsis } from '../ui/breadcrumb'

const Breadcrumbs = ({ path }: { path: string }) => {   
    const [overflowedItems, setOverflowedItems] = useState<string[]>([]);
    const pathStringArr = useMemo(() => getSegments(path), [path]);
    const breadcrumbListRef = useRef<any>(null);

    useEffect(() => {
        if (breadcrumbListRef.current) {
            const breadcrumbListWidth = breadcrumbListRef.current.offsetWidth;
            let totalWidth = 0;
            const overflowedItemsArray: string[] = [];
            pathStringArr.forEach((item, index) => {
                //@ts-ignore
                const breadcrumbItemWidth = breadcrumbListRef.current.children[index].offsetWidth;
                totalWidth += breadcrumbItemWidth;
                if (totalWidth >= breadcrumbListWidth) {
                    overflowedItemsArray.push(item);
                    if (overflowedItemsArray.length === 1) {
                        overflowedItemsArray.unshift(pathStringArr[index - 1])
                        overflowedItemsArray.unshift(pathStringArr[index - 2])
                        overflowedItemsArray.unshift(pathStringArr[index - 3])
                        overflowedItemsArray.unshift(pathStringArr[index - 4])
                        overflowedItemsArray.unshift(pathStringArr[index - 5])
                    }
                }
            });
            setOverflowedItems(overflowedItemsArray);
        }
    }, [pathStringArr]);

    return (
        <Breadcrumb className='h-10 flex items-center px-5'>
            <BreadcrumbList className='overflow-hidden' ref={breadcrumbListRef}>
                {pathStringArr.map((item, index) => {
                    if (overflowedItems && overflowedItems.includes(item) && item !== overflowedItems[overflowedItems.length - 1]) {
                        if (overflowedItems.findIndex(i => i === item) > 0) {
                            return null
                        }
                        return <div key={index} className='flex items-center'>
                            <BreadcrumbEllipsis className='text-white' />
                            <span className='text-white text-md'>/</span>
                        </div>
                    } else {
                        return (
                            <BreadcrumbItem className='text-white text-md' key={index}>
                                <span className='w-full truncate'>{item}</span>
                                {!(index === pathStringArr.length - 1) && <span className='text-white text-md'>{' '}/</span>}
                            </BreadcrumbItem>
                        )
                    }
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

const getSegments = (urlPath: string) => {
    const segments = urlPath.replace(/^\/|\/$/g, '').split('/');
    return segments;
}

export default Breadcrumbs