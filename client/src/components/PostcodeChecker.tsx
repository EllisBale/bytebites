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
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter your postcode"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                />
                <button type="submit">
                    Order Now
                </button>
            </form>

            {error && <p>{error}</p>}

        </div>
    )
};
export default PostcodeChecker;