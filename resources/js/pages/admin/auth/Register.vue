<script setup lang="ts">
import { router } from "@inertiajs/vue3";
import { reactive } from "vue";

const form = reactive({
    name: "",
    email: "",
    number_phone: "",
    password: "",
    password_confirmation: "",
});

const submit = () => {
    router.post("/admin/register", form);
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="w-full max-w-md p-8 bg-white text-black rounded-xl shadow">

            <h1 class="text-2xl font-bold mb-6">
                Admin Register
            </h1>

            <form @submit.prevent="submit">
                <label for="name">Name</label>
                <input
                    v-model="form.name"
                    type="text"
                    placeholder="Name"
                    class="w-full border p-3 rounded mb-4"
                >

                <label for="email">Email</label>
                <input
                    v-model="form.email"
                    type="email"
                    placeholder="Email"
                    class="w-full border p-3 rounded mb-4"
                >

                <label for="number_phone">Number Phone</label>
                <input
                    v-model="form.number_phone"
                    type="text"
                    placeholder="Phone"
                    class="w-full border p-3 rounded mb-4"
                >

                <label for="password">Password</label>
                <input
                    v-model="form.password"
                    type="password"
                    placeholder="Password"
                    class="w-full border p-3 rounded mb-4"
                >

                <label for="password_confirmation">Confirm Password</label>
                <input
                    v-model="form.password_confirmation"
                    type="password"
                    placeholder="Confirm Password"
                    class="w-full border p-3 rounded mb-4"
                >

                <button
                    type="submit"
                    class="w-full bg-green-600 text-white py-3 rounded"
                >
                    Register
                </button>

            </form>

        </div>
    </div>
</template>