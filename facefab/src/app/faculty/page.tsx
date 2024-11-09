import Subject from "@/components/ui/Subject";
import pinkBlob from "../../../public/blob.svg";
import orangeBlob from "../../../public/orangeBLob.svg";
import Image from "next/image";
export default function FacultyDashboard() {
  return (
    <div className="text-white montserrat p-10">
      <Image
        src={pinkBlob}
        className="absolute right-0 top-0 w-[20%] z-[-10]"
        alt="blob"
      />
      <Image
        src={orangeBlob}
        className="absolute left-0 bottom-0 w-[20%]"
        alt="blob"
      />
      <h1 className="text-[3rem]">Welcome Teacher</h1>
      <section
        className="w-full rounded-xl border-2 py-4 min-h-[60vh] border-[rgba(255,255,255,0.25)] bg-[rgba(217,217,217,0.1)] backdrop-blur-xl"
        style={{ marginTop: "4rem" }}
      >
        <Subject />
      </section>
    </div>
  );
}
