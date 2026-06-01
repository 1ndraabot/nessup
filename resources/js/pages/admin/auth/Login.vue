<script setup lang="ts">
import { router } from "@inertiajs/vue3";
import { reactive } from "vue";

const form = reactive({
    email: "",
    password: "",
});

const submit = () => {
    router.post("/admin/login", form);
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="w-full max-w-md p-8 bg-white text-black rounded-xl shadow">

            <h1 class="text-2xl font-bold mb-6">
                Admin Login
            </h1>

            <form @submit.prevent="submit">

                <input
                    v-model="form.email"
                    type="email"
                    placeholder="Email"
                    class="w-full border p-3 rounded mb-4"
                >

                <input
                    v-model="form.password"
                    type="password"
                    placeholder="Password"
                    class="w-full border p-3 rounded mb-4"
                >

                <button
                    type="submit"
                    class="w-full bg-blue-600 text-white py-3 rounded"
                >
                    Login
                </button>

            </form>

        </div>
    </div>
</template>