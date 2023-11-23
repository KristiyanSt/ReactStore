import { useEffect, useState } from "react";


export const usePage = (PAGE_SIZE) => {

    const [page, setPage] = useState(0);
    const [productsCount, setProductsCount] = useState(0);
    const [pages, setPages] = useState(Math.ceil(productsCount / PAGE_SIZE))
    // const [offset, setOffset] = useState(PAGE_SIZE * page);

    const incrementPage = (val) => {
        return setPage(prev => prev + val)
    }
    const decrementPage = (val) => {
        return setPage(prev => prev - val)
    }

    // useEffect(() => {
    //     setOffset(page * PAGE_SIZE)
    // }, [page]);

    useEffect(() => {
        setPages(Math.ceil(productsCount / PAGE_SIZE));
    }, [productsCount]);

    return {
        page,
        setPage,
        pages,
        // offset,
        setProductsCount,
        incrementPage,
        decrementPage
    }
}