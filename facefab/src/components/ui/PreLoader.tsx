"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function PreLoader() {
    const counter1 = useRef<HTMLDivElement | null>(null);
    const counter2 = useRef<HTMLDivElement | null>(null);
    const counter3 = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 10; j++) {
                const div = document.createElement("div");
                div.className = "num";
                div.textContent = String(j);
                counter3.current?.appendChild(div);
            }
        }
        const finalDiv = document.createElement("div");
        finalDiv.className = "num";
        finalDiv.textContent = "0";
        counter3.current?.appendChild(finalDiv);

        function animate(counterRef:any, duration:any, delay = 0) {
            if (counterRef?.current) {
                const num = counterRef.current.querySelector(".num");
                if (num) {
                    const numHeight = num.clientHeight;
                    const numElements = counterRef.current.querySelectorAll(".num").length;
                    console.log(numHeight, numElements);
                    const totalDistance = (numElements - 1) * numHeight;
                    gsap.to(counterRef.current, {
                        duration: duration,
                        delay: delay,
                        y: -totalDistance,
                        ease: "power2.inOut",
                    });
                }
            }
        }

        animate(counter3, 5);
        animate(counter2, 6);
        animate(counter1, 2, 4);

        gsap.to('.digit',{
            top:"-150px",
            stagger:{
                amount:0.25,
            },
            delay:6,
            duration:1,
            ease:"power4.inOut",
            onComplete:()=>{
                console.log("completed")
            }
        })
        gsap.to(".loader-1",{
            width:"200px",
            duration:6,
            ease:"power2.inOut"
        });
        gsap.to(".loader-2",{
            width:"100px",
            delay:1.8,
            duration:2,
            ease:"power2.inOut"
        })
        gsap.to(".loader",{
            background:"none",
            delay:6,
            duration:0.1
        })
        gsap.to(".loader-1",{
            rotate:90,
            y:-50,
            duration:0.5,
            delay:6,
        })
        gsap.to(".loader-2",
        {
            x:-75,
            y:75,
            duration:0.5,

        },
        "<"
        )
        gsap.to(".loader",{
            scale:40,
            duration:1,
            delay:7,
            ease:"power2.inOut"
        })
        gsap.to(".loader",{
            rotate:45,
            y:500,
            x:2000,
            duration:1,
            delay:7,
            ease:"power2.inOut"
        })
        gsap.to(".loading-screen",{
            opacity:0,
            duration:0.5,
            delay:7.5,
            ease:"power1.inOut "
        })
    }, []);

    return (
        <div className="loading-screen fixed top-0 left-0 w-full h-full bg-white text-black pointer-events-none z-50">
            <div className="loader absolute top-1/2 left-1/2 w-[300px] h-[50px] translate-x-[-50%] translate-y-[-50%] flex bg-[rgb(200,200,200)]">
                <div className="loader-1 relative bg-[#020722] w-[0px] h-[50px]"></div>
                <div className="loader-2 relative bg-[#020722] w-[0px] h-[50px]"></div>
            </div>
            <div className="counter fixed left-[50px] bottom-[50px] flex h-[100px] text-[100px] leading-[102px] clip font-normal">
                <div className="relative top-[-15px] digit" ref={counter1}>
                    <div className="num">0</div>
                    <div className="num relative right-[-10px]">1</div>
                </div>
                <div className="num relative top-[-15px] digit" ref={counter2}>
                    <div className="num">0</div>
                    <div className="relative num right-[-10px]">1</div>
                    <div className="num">2</div>
                    <div className="num">3</div>
                    <div className="num">4</div>
                    <div className="num">5</div>
                    <div className="num">6</div>
                    <div className="num">7</div>
                    <div className="num">8</div>
                    <div className="num">9</div>
                    <div className="num">0</div>
                </div>
                <div className="relative top-[-15px] digit" ref={counter3}>
                    <div className="num">0</div>
                    <div className="num">1</div>
                    <div className="num">2</div>
                    <div  className="num">3</div>
                    <div className="num">4</div>
                    <div className="num">5</div>
                    <div className="num">6</div>
                    <div className="num">7</div>
                    <div className="num">8</div>
                    <div className="num">9</div>
                </div>
            </div>
        </div>
    );
}
