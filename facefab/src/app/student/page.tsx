import pinkBlob from '../../../public/blob.svg'
import Image from 'next/image';
export default function Student(){
    return(
        <div className="bg-[#020722] w-full overflow-x-hidden ">
           <section className="w-full bg-[#020722]  ">
            <Image src={pinkBlob} className="absolute right-0 top-0 w-[20%]" alt="blob" />
            
           </section>
        </div>
    );
}