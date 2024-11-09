import pinkBlob from '../../../public/blob.svg'
import orangeBlob from "../../../public/orangeBLob.svg"
import Image from 'next/image';
import Cards from '@/components/ui/cards';
export default function StudentDashboard(){
    return(
        <div className=" w-full min-h-[calc(100vh-4.5rem)] overflow-x-hidden ">
           <section className="w-full h-full  px-10 py-10 ">
            <Image src={pinkBlob} className="absolute right-0 top-0 w-[20%] z-[-10]" alt="blob" />
            <Image src={orangeBlob} className="absolute left-0 bottom-0 w-[20%]" alt="blob" />
            <Cards/>
           </section>
        </div>
    );
}