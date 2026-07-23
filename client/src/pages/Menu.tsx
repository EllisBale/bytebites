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
                <div className=" container mx-auto px-0 max-w-8xl mt-5">
                    <div className="flex">
                        <img 
                            src={BiteBannerMobile}
                            alt="Promotional banner"
                            className="block lg:hidden object-cover w-full select-none pointer-events-none  "
                        />
                        <img 
                            src={BiteBanner}
                            alt="Promotional banner"
                            className="hidden lg:block cover w-full select-none pointer-events-none  "
                        />
                    </div>
                    <h1 className="mt-10 uppercase font-bold text-3xl pl-10 w-full">
                        Popular 
                    </h1>

                    <div className="mx-auto mb-20 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 p-10 pt-5  grid-rows-1">
                        {menuItems
                            .filter((item) => item.popular === true)
                            .map((item) => (
                                <div key={item.id} className="flex flex-col cursor-pointer bg-white shadow-lg hover:shadow-xl transition-shadow rounded-md border border-zinc-300">
                                    <img 
                                        src={item.image_url} 
                                        alt={item.name}
                                        className="aspect-square w-full h-full object-cover pointer-events-none select-none pb-5 rounded-lg" 
                                     
                                    />
                                    <div className="p-4">
                                        <p className="font-semibold text-lg  ">{item.name}</p>
                                        <p className="text-[#15803d] text-lg font-bold">£{item.price}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    

                </div>
            </main>

        </div>
    )
};
export default Menu;