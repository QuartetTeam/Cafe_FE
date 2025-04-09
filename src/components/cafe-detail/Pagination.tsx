import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}
const Pagination = ({totalCount, pageSize, currentPage, onPageChange}: PaginationProps) => {
    const totalPages = Math.ceil(totalCount / pageSize);
    const MAX_VISIBLE_PAGES = 5;

    if(totalPages === 0) return null;

    const getPageNumbers = () => {
        const pages = [];
        let start = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
        let end = start + MAX_VISIBLE_PAGES - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    }

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-2 mt-4">
            <button
                className="px-2 py-1 text-sm rounded hover:bg-gray-100 disabled:text-gray-400"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
            >
                <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
                className="px-2 py-1 text-sm rounded hover:bg-gray-100 disabled:text-gray-400"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="w-4 h-4" />
            </button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    className={`px-3 py-1 text-sm rounded ${
                        page === currentPage ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                    }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className="px-2 py-1 text-sm rounded hover:bg-gray-100 disabled:text-gray-400"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="w-4 h-4" />
            </button>
            <button
                className="px-2 py-1 text-sm rounded hover:bg-gray-100 disabled:text-gray-400"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                <ChevronsRight className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Pagination;