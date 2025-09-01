import React from "react";
import { FaSearch } from "react-icons/fa";

function Hero() {


    return(
        <div className="flex flex-col max-w-[600px] items-center justify-center gap-4">
            <img className="rounded-2xl border border-none" src="/src/assets/images/heroBg.jpg" alt="Hero Image" />
            <h1 className="text-4xl font-bold text-white">Where <span className="bg-gradient-to-r from-purple-700 to-pink-400 bg-clip-text text-transparent">Movies</span> Come Alive </h1>
            <div className="relative inline-block w-full">
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    className="p-2 pr-8 rounded-md w-full text-white"
                />
                <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
        </div>
    )
}

export default Hero;
