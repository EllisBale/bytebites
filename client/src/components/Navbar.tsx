import { useState } from "react";
import Search from "./Search";

const Navbar = () => {


    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

    return (
        <nav className="relative bg-[#15803d] border-b border-white/10 z-50">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile Menu Button */}
                        <button 
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="relative inline-flex items-center justify-center p-2 text-white"
                        >
                        <span className="absolute -inset-0.5"></span>
                        <span className="sr-only">Open main menu</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-7 in-aria-expanded:hidden">
                            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 not-in-aria-expanded:hidden">
                            <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </button>
                    </div>
                    {/* Logo */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start w-full mr-4">
                        <div className="flex shrink-0 items-center">
                            <h1 className="h-8 text-xl w-full font-semibold text-gray-100"> ByteBites </h1>
                        </div>
                        <div className="hidden sm:ml-6 sm:block flex-1 w-full">
                            <div className="flex space-x-4">
                                <a href="#" className="px-3 py-2 text-sm font-medium">
                                    <svg 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="1.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        className="size-7 text-gray-300"
                                        >
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </a>
                                <Search />
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* checkout button */}
                        <button type="button" className="relative rounded-full cursor-pointer p-1 text-gray-400 hover:text-white">
                            <svg 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="size-7 text-white"
                                >
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isDropdownOpen && (
                <div className="block sm:hidden bg-gray-900/50 border-t border-white/10">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <a href="#" aria-current="page" className="block rounded-md bg-gray-950/50 px-3 py-2 text-base font-medium text-white">Change Location</a>
                    </div>
                </div>
            )}

        </nav>
    );
};

export default Navbar;