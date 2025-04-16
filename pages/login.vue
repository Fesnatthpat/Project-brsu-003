<script setup lang="ts">
import { useSupabaseClient } from '#imports'

const email = ref('')
const password = ref('')

const message = ref('')
const status = ref(false)

const supabase = useSupabaseClient()

const handleRegister = async () => {
    console.log('email:', email.value)
    console.log('password:', password.value)
}


definePageMeta({
    layout: 'auth'
})

useHead({
    title: 'Login'
})
</script>

<template>
    <div class="w-full min-h-screen flex justify-center items-center px-4 py-8">
        <div
            class="flex flex-col md:flex-row w-full md:max-w-[900px] lg:h-[500px] rounded-md overflow-hidden border drop-shadow-2xl bg-white">

            <!-- box1: image -->
            <div class="w-full md:w-1/2 min-h-[300px]">
                <img class="w-full h-[300px] md:h-full  object-cover" src="/images/login-1.jpg" alt="Login Image">
            </div>

            <!-- box2: form -->
            <div class="w-full md:w-1/2 flex flex-col justify-center p-6 bg-white">
                <h1 class="text-black text-2xl text-center mb-6 font-semibold">Login</h1>

                <form class="space-y-4 w-full">
                    <!-- Email -->
                    <div class="flex flex-col">
                        <label for="email" class="text-sm mb-1 text-black">Email</label>
                        <input id="email" type="text" placeholder="example@email.com"
                            class="w-full px-4 py-2 rounded-md text-black border outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>

                    <!-- Password -->
                    <div class="flex flex-col">
                        <label for="password" class="text-sm mb-1 text-black">Password</label>
                        <input id="password" type="password" placeholder="••••••••"
                            class="w-full px-4 py-2 rounded-md text-black border outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>

                    <div class="text-center">
                        <div class="btn bg-blue-600 w-full border-0 hover:opacity-50 transition-all text-white">Login
                        </div>
                        <NuxtLink to="/register" class="text-[#0400ff] underline">sign Up</NuxtLink>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<!-- Password_supabase_project-3 0123456789Project. -->