import { useState } from "react";
import { type MenuItem } from "../pages/Menu";


interface SearchMobileProps {
    menuItems: MenuItem[];
}


const SearchMobile = ({ menuItems }: SearchMobileProps) => {

      const [query, setQuery] = useState<string>("");
    
      const filterItems = query.trim() === ""
        ? []
        : menuItems.filter((item) =>
            item?.name?.toLowerCase().includes(query.toLowerCase())
        );

    return (
            <div className="w-full bg-gray-950 py-5 px-2  max-h-[calc(100vh-0rem)]">
            <div className="w-full bg-white rounded-xl mb-2">
                <input 
                    type="text" 
                    maxLength={70}
                    placeholder="Search Menu..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-2 outline-none"
                                
                />

                
            </div>
        
               {query.trim() !== "" && (
                <div className="relative left-0 wl max-h-[calc(100vh-4rem)] bg-gray-950 overflow-y-auto px-4 py-4 z-[999]">
                    <div className="flex justify-end">
                        <button onClick={() => setQuery("")} className="flex text-white w-auto justify-end cursor-pointer">
                            Close
                        </button>
                    </div>
                        <div className="mx-auto max-w-7xl">
                        <h2 className="text-md font-semibold tracking-wider text-gray-400 mb-4">
                            Search Results <span>({filterItems.length})</span>
                        </h2>

                        {filterItems.length > 0 ? (
                            <div className="grid grid-cols-1 gap-2">
                                {filterItems.map((item) => (
                                    <div 
                                        key={item.id} 
                                        className="p-4 border-b-4 border-white/8 hover:border-white/20 transition-all"
                                    >
                                        <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                        <p className="text-md text-gray-400 mt-1">{item.description}</p>
                                        {item.price && (
                                            <p className="text-lg font-bold text-[#15803d] mt-2">£{item.price}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-400 text-base">No items match your search term.</p>
                            </div>
                        )}
                    </div>
                </div>
               )}
                        
        </div>
    )
};
export default SearchMobile;