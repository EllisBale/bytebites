import heroBg from "../assets/629e1ae8-5c67-4a25-b33c-ff33f0ea49eb.png"

const Hero = () => {
    return (
        <header className="bg-[#15803d] text-white">
            <div className="w-full p-20 bg-cover bg-center bg-no-repeat h-svh"
                style={{
                    backgroundImage: `url(${heroBg})`
                }}>
                <div className="flex flex-col items-center justify-center h-100">
                    <h1 className="text-6xl font-bold mb-10"> ByteBites</h1>
                    <p className="text-lg font-bold mb-10"> Order Fresh Food Fast</p>
                    Search
                </div>
            </div>
        </header>
    )
};

export default Hero;