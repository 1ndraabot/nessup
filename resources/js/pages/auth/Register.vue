<template>
    <div class="min-h-screen bg-slate-100 flex items-center justify-center px-4">

        <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

            <div class="mb-8">
                <h1 class="text-3xl font-bold text-slate-900">
                    Create Account
                </h1>

                <p class="text-slate-500 mt-2">
                    Register your Nessup account
                </p>
            </div>

            <form @submit.prevent="handleRegister" class="space-y-5">

                <div>
                    <label class="block mb-2 font-medium text-slate-700">
                        Name
                    </label>

                    <input
                        v-model="form.name"
                        type="text"
                        placeholder="Enter your name"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                    />
                </div>

                <div>
                    <label class="block mb-2 font-medium text-slate-700">
                        Email
                    </label>

                    <input
                        v-model="form.email"
                        type="email"
                        placeholder="Enter your email"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                    />
                </div>

                <div>
                    <label class="block mb-2 font-medium text-slate-700">
                        Phone Number
                    </label>

                    <input
                        v-model="form.number_phone"
                        type="text"
                        placeholder="Enter your phone number"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                    />
                </div>

                <div>
                    <label class="block mb-2 font-medium text-slate-700">
                        Password
                    </label>

                    <input
                        v-model="form.password"
                        type="password"
                        placeholder="Enter password"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                    />
                </div>

                <div>
                    <label class="block mb-2 font-medium text-slate-700">
                        Confirm Password
                    </label>

                    <input
                        v-model="form.password_confirmation"
                        type="password"
                        placeholder="Confirm password"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    :disabled="loading"
                    class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    {{ loading ? 'Loading...' : 'Register' }}
                </button>

            </form>

            <div
                v-if="successMessage"
                class="mt-6 p-4 rounded-xl bg-green-100 text-green-700"
            >
                {{ successMessage }}
            </div>

            <div
                v-if="errors.length"
                class="mt-6 p-4 rounded-xl bg-red-100 text-red-700"
            >
                <ul class="list-disc pl-5 space-y-1">
                    <li
                        v-for="(error, index) in errors"
                        :key="index"
                    >
                        {{ error }}
                    </li>
                </ul>
            </div>

            <div class="mt-6 text-center text-sm text-slate-500">
                Already have an account?

                <a
                    href="/login"
                    class="text-blue-600 hover:underline font-medium"
                >
                    Login
                </a>
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">

import { router } from "@inertiajs/vue3";

import { reactive, ref } from "vue";
interface RegisterForm {
    name: string;
    email: string;
    number_phone: string;
    password: string;
    password_confirmation: string;
}


const loading = ref(false);

const errors = ref<string[]>([]);

const successMessage = ref("");

const form = reactive<RegisterForm>({
    name: "",
    email: "",
    number_phone: "",
    password: "",
    password_confirmation: "",
});

const resetForm = (): void => {
    form.name = "";
    form.email = "";
    form.number_phone = "";
    form.password = "";
    form.password_confirmation = "";
};

const handleRegister = async (): Promise<void> => {

    loading.value = true;

    errors.value = [];

    successMessage.value = "";

    router.post('/register', form, {

        onSuccess: () => {

            successMessage.value = "Register Success";

            resetForm();

            loading.value = false;

        },

        onError: (validationErrors) => {

            Object.values(validationErrors).forEach((error) => {

                if (Array.isArray(error)) {
                    errors.value.push(error[0]);
                } else {
                    errors.value.push(String(error));
                }

            });

            loading.value = false;
        }

    });

};
</script>