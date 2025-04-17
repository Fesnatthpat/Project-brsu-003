// /server/api/profiles.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    try {
        // ดึงข้อมูลจากฐานข้อมูล Profile
        const profiles = await prisma.profile.findMany({
            select: {
                id: true,
                email: true,  // ดึง email
                role: true
                // name: true,  // หากต้องการดึงชื่อ
            }
        })

        return profiles
    } catch (error) {
        console.error(error)
        return { error: 'Error fetching profiles' }
    }
})
