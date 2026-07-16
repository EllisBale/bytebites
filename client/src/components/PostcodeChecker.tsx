import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostcodeChecker = () => {

    const [postcode, setPostcode] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const cleanedPostcode = postcode.trim();

        if (cleanedPostcode.length >= 5) {
            setError("");
            navigate("/menu");
        } else {
            setError("Please enter a valid postcode.");
        }
    };

    return(
        <div className="flex flex-col w-full text-center">
            <div className="w-full">
                <form 
                    onSubmit={handleSubmit}
                    className="flex justify-center min-[1100px]:justify-start w-fit mx-auto min-[1100px]:mx-0 bg-white"
                
                >
                    <input 
                        type="text" 
                        placeholder="Enter your postcode"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        maxLength={8}
                        className="p-3 text-black"
                    />
                    <button 
                        type="submit"
                        className="p-3 cursor-pointer bg-[#dc2626] hover:bg-[#b01e1e] shadow-md"
                        >
                        Order Now
                    </button>
                </form>

                {error && <p className="p-2 flex justify-start w-full">{error}</p>}
            </div>
        </div>
    )
};
export default PostcodeChecker;