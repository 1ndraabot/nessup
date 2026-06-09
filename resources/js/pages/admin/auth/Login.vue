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

                <div class="w-full flex flex-col justify-center gap-2">
                    <div>
                        <label for="email">Email</label>
                        <input
                            v-model="form.email"
                            type="email"
                            placeholder="Email"
                            class="w-full border p-3 rounded mb-4"
                        >
                    </div>
    
                    <div>
                        <label for="password">Password</label>
                        <input
                            v-model="form.password"
                            type="password"
                            placeholder="Password"
                            class="w-full border p-3 rounded mb-4"
                        >
                    </div>
    
                    <button
                        type="submit"
                        class="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-Yellow hover:text-Sky-Blue"
                    >
                        Login
                    </button>
    
                    <a href="/admin/register" class="ml-24">Don't have an account?</a>
                </div>

            </form>

        </div>
    </div>
</template>