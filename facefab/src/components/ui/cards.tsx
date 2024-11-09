import CircleProgressBar from "./CircleProgressBar";

export default function Cards() {
    return (
        <div className="w-[25%] h-[53%] rounded-lg  flex flex-col items-center gap-2 py-4 bg-gradient-to-r from-[#D4BFFF] to-[#A0CFFF] shadow-md shadow-white">
           <h1 className="font-bold text-2xl tracking-widest text-white leading-10 montserrat">        
               TOC
            </h1>
            <CircleProgressBar percentage={90} circleWidth={200}/>
            <p className="space-y-2">You can miss 3 more class</p>
        </div>
    );
}