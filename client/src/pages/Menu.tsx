import Navbar from "../components/Navbar";
import SearchMobile from "../components/SearchMobile";
import { useState, useEffect } from "react";

    export type MenuItem = {
        id?: number,
        name?: string,
        description?: string,
        price?: number,
        category?: string,
        image_url?: string,
    };


const Menu = () => {

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);



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


    return(
        <div>
            <div className="relative z-50">
                <Navbar  menuItems={menuItems}/>
            </div>
            <div className="sm:hidden bg">
                <SearchMobile  menuItems={menuItems}/>
            </div>
        </div>
    )
};
export default Menu;