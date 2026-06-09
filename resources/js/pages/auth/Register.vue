<script setup lang="ts">

import { useForm } from '@inertiajs/vue3'
import { ref } from "vue";
import InputError from '@/components/InputError.vue'
import PasswordInput from "@/components/PasswordInput.vue";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


const successMessage = ref("");

const form = useForm({
    name: "",
    email: "",
    number_phone: "",
    password: "",
    password_confirmation: "",
});

const handleRegister = () => {
    successMessage.value = ''

    form.post('/register', {
        onSuccess: () => {
            successMessage.value = 'Register Success'

            form.reset()

        }
    })
}
</script>

<template>
    <div class="min-h-screen bg-slate-100 flex items-center justify-center p-20">

        <div class="w-screen bg-white rounded-2xl shadow-lg p-8">

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
                    <Label class="block mb-2 font-medium text-slate-700">
                        Name
                    </Label>

                    <Input
                        v-model="form.name"
                        type="text"
                        placeholder="Enter your name"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                    />

                    <InputError :message="form.errors.name" />
                </div>

                <div>
                    <Label class="block mb-2 font-medium text-slate-700">
                        Email
                    </Label>

                    <Input
                        v-model="form.email"
                        type="email"
                        placeholder="Enter your email"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                    />

                    <InputError :message="form.errors.email" />
                </div>

                <div>
                    <Label class="block mb-2 font-medium text-slate-700">
                        Phone Number
                    </Label>

                    <Input
                        v-model="form.number_phone"
                        type="text"
                        placeholder="Enter your phone number"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                    />

                    <InputError :message="form.errors.number_phone" />
                </div>

                <div>
                    <Label class="block mb-2 font-medium text-slate-700">
                        Password
                    </Label>

                    <PasswordInput
                        v-model="form.password"
                        required
                        :tab-index="2"
                        auto-complete="current-password"
                        placeholder="Enter password"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                    />

                    <InputError :message="form.errors.password" />
                </div>

                <div>
                    <Label class="block mb-2 font-medium text-slate-700">
                        Confirm Password
                    </Label>

                    <PasswordInput
                        v-model="form.password_confirmation"
                        placeholder="Confirm password"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <InputError :message="form.errors.password_confirmation" />
                </div>

                <Button
                    type="submit"
                    :disabled="form.processing"
                    class="w-full py-6 text-md rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    {{ form.processing ? 'Loading...' : 'Register' }}
                </Button>

            </form>

            <div
                v-if="successMessage"
                class="mt-6 p-4 rounded-xl bg-green-100 text-green-700"
            >
                {{ successMessage }}
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

