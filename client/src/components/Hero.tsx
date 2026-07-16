import heroBg from "../assets/bytebites_hero_large.png";
import PostcodeChecker from "./PostcodeChecker";


const Hero = () => {
    return (
        <header className="bg-[#15803d] text-white">
            <div className="w-full p-3 lg:p-20 bg-cover bg-center bg-no-repeat h-svh bg-[image:var(--hero-bg)] max-[1100px]:bg-none"
                style={{
                   "--hero-bg": `url(${heroBg})`,
                } as React.CSSProperties}>
                <div className="flex flex-col items-start max-[1100px]:items-center justify-center h-full w-full text-center lg:pl-10">
                    <h1 className="text-6xl font-bold mb-10 w-full lg:w-100 text-center"> ByteBites</h1>
                    <p className="text-lg font-bold mb-10 w-full lg:w-100 text-center"> Order Fresh Food Fast</p>
                    <PostcodeChecker />
                </div>
            </div>
        </header>
    )
};

export default Hero;