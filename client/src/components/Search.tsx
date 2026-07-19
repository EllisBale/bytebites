import { useState, useEffect } from "react";

const Search = () => {

    const [menuItems, setMenuItems] = useState<Menuitem[]>([]);
    const [query, setQuery] = useState<string>("");

    
    type Menuitem = {
        id?: number,
        name?: string,
        description?: string,
        price?: number,
        category?: string,
        image_url?: string,
    };


    const fetchMenu =  async (): Promise<void> => {

        try {

            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

            const res = await fetch(`${API_URL}/api/menu`);
            const data = await res.json();
            setMenuItems(data);
        } catch (err) {
            console.error("Error fetching menu:", err);
        }
    };


    useEffect(() => {
        fetchMenu();
    }, [])

    


  const filterItems = query.trim() === ""
    ? []
    : menuItems.filter((item) =>
        item?.name?.toLowerCase().includes(query.toLowerCase())
    );

    return (

        <div className="w-full">
            <div className="w-full bg-white rounded-xl">
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
                <div className="fixed top-16 left-0 w-full max-h-[calc(100vh-4rem)] bg-gray-950 overflow-y-auto px-4 py-4 z-[999]">
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

export default Search;