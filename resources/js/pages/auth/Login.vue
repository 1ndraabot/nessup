<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

defineOptions({
    layout: {
        title: 'Log in to your account',
        description: 'Enter your email and password below to log in',
    },
});

defineProps<{
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}>();
</script>

<template>
    <Head title="Log in" />

    <div
        v-if="status"
        class="mb-4 text-center text-sm font-medium text-green-600"
    >
        {{ status }}
    </div>

    <div class="flex min-w-screen min-h-screen">
        <div class="w-full min-h-full text-White bg-Sky-Blue pt-28 px-10 flex flex-col gap-5">
            <div class="flex flex-col gap-2">
                <h1 class="font-semibold text-4xl">Gabung NessUp!</h1>
                <p class="text-xl">Temukan ribuan event kampus dari seluruh Indonesia. Daftar gratis dan mulai sekarang.</p>
            </div>
            <div class="flex flex-col gap-5">
                <div class="flex gap-3">
                    <div class="flex items-center px-5 bg-Yellow rounded-full">
                        <h2 class="text-center text-xl text-Sky-Blue font-medium">1</h2>
                    </div>
                    <div>
                        <h3 class="font-semibold">Daftar gratis</h3>
                        <p class="opacity-80">Buat akun dalam hitungan detik</p>
                    </div>
                </div>
                <div class="flex gap-3">
                    <div class="flex items-center px-5 bg-Yellow rounded-full">
                        <h2 class="text-center text-xl text-Sky-Blue font-medium">2</h2>
                    </div>
                    <div>
                        <h3 class="font-semibold">Cari & ikuti event</h3>
                        <p class="opacity-80">Jelajahi ratusan event dari berbagai kampus</p>
                    </div>
                </div>
                <div class="flex gap-3">
                    <div class="flex items-center px-5 bg-Yellow rounded-full">
                        <h2 class="text-center text-xl text-Sky-Blue font-medium">3</h2>
                    </div>
                    <div>
                        <h3 class="font-semibold">Upload eventmu</h3>
                        <p class="opacity-80">Siapapun bisa mempromosikan event</p>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="w-full px-10 flex flex-col justify-center gap-7">
            <div class="flex flex-col gap-1">
                <h1 class="font-bold text-xl">Selamat Datang Kembali</h1>
                <p class="opacity-80">Masuk ke akun NessUp! kamu</p>
            </div>
            <Form
                action="/login"
                method="post"
                :reset-on-success="['password']"
                v-slot="{ errors, processing }"
                class="flex flex-col gap-6"
            >
                <div class="grid gap-6">
                    <div class="grid gap-2">
                        <Label for="email" class="opacity-70">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            required
                            autofocus
                            :tabindex="1"
                            autocomplete="email"
                            placeholder="email@example.com"
                        />
                        <InputError :message="errors.email" />
                    </div>                         
                           
                    <div class="grid gap-2">
                        <div class="flex items-center justify-between">
                            <Label for="password" class="opacity-70">Password</Label>
                            <!-- <TextLink
                                v-if="canResetPassword"
                                :href="request()"
                                class="text-sm"
                                :tabindex="5"
                            >
                                Forgot password?
                            </TextLink> -->
                        </div>
                        <PasswordInput
                            id="password"
                            name="password"
                            required
                            :tabindex="2"
                            autocomplete="current-password"
                            placeholder="Password"
                        />
                        <InputError :message="errors.password" />
                        <div class="flex justify-end">
                            <TextLink
                                v-if="canResetPassword"
                                :href="request()"
                                class="text-sm"
                                :tabindex="5"
                            >
                                Forgot password?
                            </TextLink>
                        </div>
                    </div>
        
                    <Button
                        type="submit"
                        class="mt-4 py-3 min-h-fit w-full bg-Sky-Blue font-semibold text-md hover:bg-Yellow hover:text-Sky-Blue"
                        :tabindex="4"
                        :disabled="processing"
                        data-test="login-button"
                    >
                        <Spinner v-if="processing" />
                        Log in
                    </Button>
                </div>

                <div class="flex items-center justify-between">
                        <Label for="remember" class="flex items-center space-x-3">
                            <Checkbox id="remember" name="remember" :tabindex="3" />
                            <span class="opacity-70">Remember me</span>
                        </Label>
                    </div>
        
                <div
                    class="text-center text-sm text-muted-foreground"
                    v-if="canRegister"
                >
                    Don't have an account?
                    <TextLink :href="register()" :tabindex="5">Sign up</TextLink>
                </div>
            </Form>
        </div>
    </div>
</template>
