import pinkBlob from "../../../public/blob.svg";
import orangeBlob from "../../../public/orangeBLob.svg";
import Image from "next/image";
import Camera from "../../../public/camera.svg";
export default function FacultyDashboard() {
  return (
    <div className="text-white montserrat p-10">
      <Image src={pinkBlob} className="absolute right-0 top-0 w-[20%] z-[-10]" alt="blob" />
      <Image src={orangeBlob} className="absolute left-0 bottom-0 w-[20%]" alt="blob" />
      <h1 className="text-[3rem]">Welcome Teacher</h1>
      <section className="w-full rounded-xl border-2 py-4 min-h-[60vh] border-[rgba(255,255,255,0.25)] bg-[rgba(217,217,217,0.1)] backdrop-blur-xl" style={{marginTop:'4rem'}}>
        <table className="w-full gap-12">
          <thead>
            <tr className="text-lg font-light">
              <th>Subject</th>
              <th>No of CLasses</th>
              <th>Add Classes</th>
              <th>Add Attendandce</th>
            </tr>
          </thead>
          <tbody className="pt-10 text-center">
            <tr className="border-r-2 border-[rgba(255,255,255,0.25)]">
              <td className="">Maths</td>
              <td>10</td>
              <td>
                <button className="bg-[#39D2E6] px-2 py-1 rounded-lg w-[2rem] active:scale-105">+</button>
              </td>
              <td>
                <button>
                  <Image src={Camera} alt={"camera"} className="active:scale-105 w-[2rem]"/>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      
      </section>
    </div>
  );
}
