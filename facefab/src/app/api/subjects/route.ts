import { getSubject } from "@/actions/getSubjects";
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(req: NextApiRequest) {
    
        try{
            const subject = await getSubject();
           return NextResponse.json(subject,{status:200})

        }
        catch(error){
            console.log("error in API route",error)
            return NextResponse.json({error:'failed to fetch subjects'}, {status:400})
        }
    }
  
export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        console.log(body)
        if(!body || !body.index){
            return NextResponse.json({error:"missing error"},{status:400})
        }
        const response = await prisma.subject.update({
            where:{
                id: body.index
            },
            data: {
                totalClasses: {increment: 1}
            }
        })
        return NextResponse.json({success:true},{status:200})
    }catch(error){
        console.log(error)
    }
}