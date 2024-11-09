import Link from "next/link";
import Image from "next/image";
import pinkBlob from '../../../public/blob.svg';
import orangeBlob from "../../../public/orangeBLob.svg";
export default function landingPage() {
  return (
    <div className="w-full">
      <section className="w-full py-8 md:py-16 lg:py-30 relative">
        <Image src={pinkBlob} className="absolute right-0 top-0 w-[20%]" alt="blob" />
        <Image src={orangeBlob} className="absolute left-0 bottom-0 w-[20%]" alt="blob" />
        <div className="px-6 md:px-8 flex flex-col">
          <div className="grid justify-center items-center gap-4 lg:grid-cols-1 lg:gap-5">
            <div className="space-y-3 px-8">
              <h1 className="text-[20px] uppercase font-bold text-white text-center sm:text-5xl md:text-7xl xl:text-8xl 2xl:text-[2rem]">
                Revolutionize Attendance with <br /><br /><span className="bg-gradient-to-r  from-[#FF5B1F] to-[#6E4279] bg-clip-text text-transparent text-[5rem] montserrat">FaceFab </span><span className="text-[5rem]">📸</span>
              </h1>
            
            </div>

            <div className="flex justify-center">
              <Image
                src="/landing.svg"
                width="600"
                height="600"
                alt="Attendance Tracking"
                className=" transform transition-all hover:scale-105"
              />
 
            </div>
            <div className="px-8 w-[33%] absolute right-0 bottom-[30%] flex flex-col gap-10">
            <p className="text-md text-white/90 sm:text-lg md:text-2xl xl:text-2xl opacity-[0.75]">
            <span className="text-[#FF5B1F] text-bold">
            FaceFab
              </span> leverages cutting-edge facial recognition technology to streamline the attendance process, ensuring accuracy, security, and speed.
              </p> 
              <div className="flex items-center gap-4">
                <Link
                  href="/role"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#FFFFFF]/30 to-[#191919] border-white hover:border-2 shadow-gray-700 text-white px-8 text-lg font-medium shadow-lg transform transition-all hover:scale-105 focus:outline-none"
                  prefetch={false}
                >
                  Start Tracking
                </Link>
                <Link
                  href="#features"
                  className="text-white text-lg font-medium hover:text-gray-200 hover:underline transition duration-300"
                >
                  Learn More
                </Link> 
              </div> 
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-gray-900 py-20">
        <div className="px-6 md:px-8">
          <h2 className="text-3xl font-bold text-center text-white md:text-4xl">
            Key Features of FaceFab
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white text-center rounded-lg p-6 shadow-xl">
              <h3 className="text-2xl font-semibold text-gray-800">
                AI-Powered Recognition
              </h3>
              <p className="mt-4 text-gray-600">
                Our AI accurately recognizes faces in real-time, ensuring smooth
                and error-free attendance.
              </p>
            </div>

            <div className="bg-white text-center rounded-lg p-6 shadow-xl">
              <h3 className="text-2xl font-semibold text-gray-800">
                Real-Time Analytics
              </h3>
              <p className="mt-4 text-gray-600">
                Get real-time reports and insights, so you can monitor
                attendance trends effortlessly.
              </p>
            </div>

            <div className="bg-white text-center rounded-lg p-6 shadow-xl">
              <h3 className="text-2xl font-semibold text-gray-800">
                Secure & Scalable
              </h3>
              <p className="mt-4 text-gray-600">
                With secure data handling and cloud storage, FaceFab is built to
                scale with your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 py-8">
        <div className="text-center text-white">
          <p>&copy; 2024 FaceFab. All rights reserved.</p>
          <p className="mt-2">Transforming the way attendance is managed.</p>
        </div>
      </footer>
    </div>
  );
}
