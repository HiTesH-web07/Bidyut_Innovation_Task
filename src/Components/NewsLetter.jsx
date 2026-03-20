import React from "react";
import newslatter from "../assets/newslatter.jpg";
import { MdMailOutline } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";

const NewsLetter = () => {
    return (
        <div className="relative w-full">
            {/* Image */}
            <img src={newslatter} alt="Newsletter" className="w-full h-auto" />

           

            {/* Overlay text */}
            <div className="absolute top-1/3 left-[386px] transform -translate-x-1/2 -translate-y-1/2  px-4 py-2 rounded-md gap-5 p-b-3">
                <div> 
                 <h2 className="font-semibold text-white text-[25px] text-center pb-2">
                    Join Our Newsletter
                </h2>
                </div>
            </div>

            <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2  px-4 py-2 rounded-md gap-5 pt-7">
                <div className=" flex h-[45px] bg-white rounded-md ">
                    <form action="" className=" w-[20vw] h-[40px] bg-white flex items-center px-5 pr-0 gap-1 rounded-md ">
                        {<MdMailOutline className="text-blue-400 bg-blue-100 w-[20px] h-[20px]" />}
                        <input className=" outline-none" type="text" placeholder="Enter Your Email" />
                    </form>
                    <button className="text-white font-semibold bg-orange-400 flex items-center rounded-r-md p-2 gap-2">Subscribe{<FaArrowRightLong />}</button>
                </div>
            </div>
        </div>

    );
};

export default NewsLetter;
