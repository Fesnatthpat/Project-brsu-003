<script setup lang="ts">
// กำหนดประเภทของ Profile
interface Profile {
  id: string;
  email: string;
  name?: string;
  role: string; // ถ้ามีฟิลด์ชื่อ 'name' ก็สามารถใช้ได้
}

// ดึงข้อมูลโปรไฟล์จาก API
const { data: profiles, error } = await useFetch<Profile[]>('/api/profiles')  // กำหนดประเภทข้อมูลที่ดึงมา
</script>


<template>
    <div>
        <h2>รายชื่อผู้ใช้</h2>
        <div v-if="profiles && profiles.length">
            <div v-for="profile in profiles" :key="profile.id" class="card">
                <h3>{{ profile.id }}</h3>
                <p>อีเมล: {{ profile.email }}</p>
                <p>สถานะ: {{ profile.role }}</p>
                <p v-if="profile.name">ชื่อ: {{ profile.name }}</p>  <!-- ถ้ามีชื่อ -->
            </div>
        </div>
        <div v-else-if="error">
            <p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
        </div>
        <div v-else>
            <p>กำลังโหลดข้อมูล...</p>
        </div>
    </div>
</template>

<style scoped>
.card {
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 10px;
}
</style>

