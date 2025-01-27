import Navbar from "@/components/Navbar/Outsidenavbar";
import Typewriter from "@/components/TypingAnimation/Typewriter";
import Image from "next/image";
import Homelogo from "../../public/Exambuddy.png";

export default function Home() {
  return (
    <div className="relative w-screen h-full">
      <div className="absolute top-0 w-full">
        <Navbar />
      </div>
      <Image src={Homelogo} alt="Home" className="md:hidden " />
      <div className="flex justify-center items-center w-full max-md:h-screen h-full max-md:bg-black">
        <div className=" w-full  lg:mx-1 md:w-1/2 flex justify-center">
          <div className="w-full  rounded-xl text-center md:p-5 lg:p-10 md:bg-black sm:shadow-md sm:shadow-white  text-white ">
            <p className="text-xl font-medium tracking-wide">
              Take charge of your studies with ease!
            </p>
            <br />
            <h1 className="text-5xl md:text-8xl font-extrabold mt-4 w-full">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-500">
                XAM BUDDY
              </span>
            </h1>
            <br />
            <p className="mt-4 text-lg">
              Your ultimate companion to make preparation
            </p>
           
            <div className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 w-full">
              <Typewriter
                words={[
                  "Structured",
                  "Well Planned",
                  "Distractionless",
                  "Stress Free",
                ]}
              />
            </div>
          </div>
        </div>

        <Image src={Homelogo} alt="Home" className="max-md:hidden md:w-1/2 h-screen" />
      </div>
    </div>
  );
}
