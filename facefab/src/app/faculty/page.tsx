"use client"
import Subject from "@/components/ui/Subject";
import pinkBlob from "../../../public/blob.svg";
import orangeBlob from "../../../public/orangeBLob.svg";
import Image from "next/image";
import Camera from "../../../public/camera.svg";
import { useEffect, useState } from "react";

export default function FacultyDashboard() {
  const [subject,setSubject] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)

  const addAttendance =async (index:number)=>{
    const response  = await fetch('/api/subjects',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        index:index
      })

    })
    fetchSubject()
  }
  const fetchSubject = async () => {
    try { 
      const response = await fetch('/api/subjects');
      if(!response.ok){
        throw new Error('Failed to fetch')
      }
      const data = await response.json()
      setSubject(data)
      
    } catch (error) {
      console.log(error)
      setError(error.message)
    
    }
    finally{
      setLoading(false)
    }
    
  }
  useEffect(()=>{
   
    fetchSubject()
  },[])
  console.log(subject)
  if(loading){
    return (
      <h1>Loading....</h1>
    )
  }
  if (error) return <h1>Error ... {error}</h1>
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
      <section className="w-full rounded-xl border-2 py-4 min-h-[60vh] border-[rgba(255,255,255,0.25)] bg-[rgba(217,217,217,0.1)] backdrop-blur-xl" style={{marginTop:'4rem'}}>
        <table className="w-full gap-12 h-[60vh]">
          <thead>
            <tr className="text-lg font-light">
              <th>Subject</th>
              <th>No of CLasses</th>
              <th>Add Classes</th>
              <th>Add Attendandce</th>
            </tr>
          </thead>
          <tbody className="pt-10 text-center h-[4rem]">
            {
              subject.map((subject:any,index:number)=>{
                return (
                  <tr className="border-r-2 border-[rgba(255,255,255,0.25)] h-[2rem]" key={index}>
                  <td className="">{subject.name}</td>
                  <td>{subject.totalClasses}</td>
                  <td>
                    <button className="bg-[#39D2E6] px-2 py-1 rounded-lg w-[2rem] active:scale-105" onClick={()=>addAttendance(subject.id)}>+</button>
                  </td>
                  <td>
                    <button>
                      <Image src={Camera} alt={"camera"} className="active:scale-105 w-[2rem]"/>
                    </button>
                  </td>
                </tr>
                )
            })}
          
          </tbody>
        </table>
      
      <section
        className="w-full rounded-xl border-2 py-4 min-h-[60vh] border-[rgba(255,255,255,0.25)] bg-[rgba(217,217,217,0.1)] backdrop-blur-xl"
        style={{ marginTop: "4rem" }}
      >
        <Subject />
      </section>
    </div>
  );
}
