import Link from "next/link";
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";

export default function landingPage() {
  return (
    <div className="w-full bg-gradient-to-r from-[#020722] to-[#020722]/70">
      <section className="w-full py-16 md:py-32 lg:py-40">
        <div className="px-6 md:px-8">
          <div className="grid justify-center items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6 px-8">
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-[4rem]">
                Revolutionize Attendance with <span className="bg-gradient-to-br from-[#FF5B1F] to-[#6E4279] bg-clip-text text-transparent">FaceFab</span> 📸
              </h1>
              <p className="text-md text-white/90 sm:text-lg md:text-2xl xl:text-3xl">
                Efficient, accurate, and contactless attendance tracking for the
                modern world. Let <a href="/" className="underline font-semibold text-orange-500 underline-offset-2">FaceFab</a> simplify your classroom or office!
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-8 text-lg font-medium shadow-lg transform transition-all hover:scale-105 focus:outline-none"
                  prefetch={false}
                >
                  <SignInButton>Start Tracking</SignInButton>
                </Link>
                <Link
                  href="#features"
                  className="text-white text-lg font-medium hover:text-gray-200 transition duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <Image
                src="/landing.svg"
                width="600"
                height="600"
                alt="Attendance Tracking"
                className="rounded-2xl shadow-2xl border-4 border-white transform transition-all hover:scale-105"
              />
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
