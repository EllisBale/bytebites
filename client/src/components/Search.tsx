import { useState, useEffect } from "react";

const Search = () => {

    const [menuItems, setMenuItems] = useState<Menuitem[]>([]);
    const [query, setQuery] = useState("");

    
    type Menuitem = {
        id?: number,
        name?: string,
        description?: string,
        price?: number,
        category?: string,
        image_url?: string,
    };


    const fetchMenu  =  async () => {

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

    


    const filterItems = menuItems.filter((item) =>
        item?.name?.toLowerCase().includes(query.toLowerCase())
    );


    return (

        <div>
        <div>
            <input 
                type="text" 
                maxLength={70}
                placeholder="Search Menu..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                            
            />

            
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filterItems.length > 0 ? (
                    filterItems.map((item) => (
                        <div key={item.id}>
                            <div>
                                <h3>{item.name}</h3>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Items match your search.</p>
                )} 
            </div>
        </div>
        
    )
};

export default Search;