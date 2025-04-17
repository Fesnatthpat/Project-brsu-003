<script setup lang="ts">
// นำเข้า Supabase client และ router
import { useSupabaseClient } from '#imports'

const router = useRouter()

// ตัวแปรที่ใช้เก็บข้อมูล input จากฟอร์ม
const email = ref('')
const password = ref('')
const role = ref('student') // ค่าเริ่มต้นของ role

// ตัวแปรสำหรับแสดงข้อความแจ้งเตือน
const message = ref('')
const status = ref(false)

// สร้าง instance ของ Supabase client
const supabase = useSupabaseClient()

// กำหนดชนิดของข้อมูลที่ได้จาก API
interface RegisterResponse {
    error?: string
    message?: string
}

// ฟังก์ชันสำหรับการสมัครสมาชิก
const handleRegister = async () => {
    if (!email.value || !password.value) {
        message.value = 'Please enter both email and password.'
        status.value = false
        return
    }

    try {
        const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
        })

        if (error) throw error

        const { data: userData } = await supabase.auth.getUser()
        const Id = userData?.user?.id

        // 🔁 เรียก API เพื่อเพิ่ม role พร้อมระบุ type
        const res = await $fetch<RegisterResponse>('/api/register', {
            method: 'POST',
            body: {
                id: Id,
                email: email.value,
                role: role.value,
            },
        })

        if (res.error) throw new Error(res.error)

        message.value = 'Registration successful!'
        status.value = true

        await new Promise((resolve) => setTimeout(resolve, 2000))
        router.push('/login')

    } catch (error: unknown) {
        if (error instanceof Error) {
            message.value = error.message
            status.value = false
        } else {
            message.value = 'An unknown error occurred'
            status.value = false
        }
    }
}

// ตั้ง layout และหัวหน้าเว็บ
definePageMeta({
    layout: 'auth'
})

useHead({
    title: 'Register'
})
</script>



<template>
    <div class="w-full min-h-screen flex justify-center items-center px-4 py-8">
        <div
            class="flex flex-col md:flex-row w-full md:max-w-[900px] lg:h-[500px] rounded-md overflow-hidden border drop-shadow-2xl bg-white">

            <!-- กล่องภาพ -->
            <div class="w-full md:w-1/2 min-h-[300px]">
                <img class="w-full h-[300px] md:h-full object-cover" src="/images/login-1.jpg" alt="Login Image">
            </div>

            <!-- กล่องฟอร์ม -->
            <div class="w-full md:w-1/2 flex flex-col justify-center p-6 bg-white">
                <h1 class="text-black text-2xl text-center mb-6 font-semibold">Register</h1>

                <!-- ข้อความแจ้งเตือน -->
                <p v-if="message" :class="status ? 'bg-success' : 'bg-red-500'" class="p-3 rounded-lg text-white">{{
                    message }}</p>

                <form @submit.prevent="handleRegister" class="space-y-4 w-full">
                    <!-- Email -->
                    <div class="flex flex-col">
                        <label for="email" class="text-sm mb-1 text-black">Email</label>
                        <input v-model="email" id="email" type="text" placeholder="example@email.com"
                            class="w-full px-4 py-2 rounded-md text-black border outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>

                    <!-- Password -->
                    <div class="flex flex-col">
                        <label for="password" class="text-sm mb-1 text-black">Password</label>
                        <input v-model="password" type="password" placeholder="••••••••" autocomplete="current-password"
                            class="w-full px-4 py-2 rounded-md text-black border outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>

                    <!-- Role -->
                    <div class="flex flex-col">
                        <label for="role" class="text-sm mb-1 text-black">Role</label>
                        <select v-model="role" id="role"
                            class="w-full px-4 py-2 rounded-md text-black border outline-none focus:ring-2 focus:ring-purple-500">
                            <option value="student">Student</option>
                            <option value="professor">Professor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <!-- ปุ่ม submit -->
                    <div class="text-center">
                        <button class="btn bg-blue-600 w-full border-0 hover:opacity-50 transition-all text-white">
                            Register
                        </button>
                        <NuxtLink to="/login" class="text-[#0400ff] underline">Sign In</NuxtLink>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
