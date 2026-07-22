import Navbar from "../components/Navbar";
import SearchMobile from "../components/SearchMobile";
import BiteBannerMobile from "../assets/bitebannermobile.png";
import BiteBanner from "../assets/bitebanner.png";
import { useState, useEffect } from "react";


    export type MenuItem = {
        id: number,
        name: string,
        description?: string,
        price: number,
        category?: string,
        image_url?: string,
        popular?: boolean,
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

            <main>
                <div className="container mx-auto px-0 max-w-8xl">
                    <div className="flex">
                        <img 
                            src={BiteBannerMobile}
                            alt="Promotional banner"
                            className="block lg:hidden object-cover w-full select-none pointer-events-none mand"
                        />
                        <img 
                            src={BiteBanner}
                            alt="Promotional banner"
                            className="hidden lg:block cover w-full select-none pointer-events-none mand"
                        />
                    </div>
                    <h1 className="my-10 font-semibold text-2xl px-5">
                        Popular Items
                    </h1>

                    {menuItems
                        .filter((item) => item.popular === true)
                        .map((item) => (
                            <div key={item.id} className="px-5">
                                <img 
                                    src={item.image_url} 
                                    alt={item.name} 
                                
                                />
                                {item.name}
                            </div>
                        ))
                    }
                    

                </div>
            </main>

        </div>
    )
};
export default Menu;