import { prisma } from "@/lib/prisma";

export async function getSubject() {
    try{
        const subjects = await prisma.subject.findMany(
            {
                select:{
                    id: true,
                    name: true,
                    totalClasses: true
                }
            }
        )
        if(!subjects) {
        console.error("No subjects found")
        }
        return subjects
    } catch (error) {
        console.error("Error fetching subjects:", error)
        return []
    }
}