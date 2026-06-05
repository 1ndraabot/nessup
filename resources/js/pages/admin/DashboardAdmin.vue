<script setup lang="ts">
    import { router } from '@inertiajs/vue3'

    interface EventSubmission{
        id: number
        name: string
        description: string
        open_event: string
        close_event: string
        price_ticket: number
        status: string
    }

    defineProps<{
        pendingEvents: EventSubmission[]
        pendingCount: number
    }>()

    const approveEvent = (id: number) => {
        router.patch(
            `admin/event-submission/${id}/approve`
        )
    }

    const declineEvent = (id: number) => {
        router.patch(
            `admin/event-submission/${id}/decline`
        )
    }
</script>


<template>
    <div class="bg-Black-30 min-h-screen">
        <div class="bg-Blue flex p-6 justify-between items-center">
            <div class="flex gap-10">
                <h1 class="font-bold text-3xl">NessUp!</h1>
                <div class="py-1 px-4 rounded bg-Yellow">
                    <h3 class="text-Black font-semibold">ADMIN</h3>
                </div>
            </div>
            <h3>Super Admin</h3>
        </div>
    
        <div class="flex min-h-[calc(100vh-88px)]">
            <aside class="bg-White w-64 shrink-0 pl-10 pt-5 flex flex-col gap-2 sticky top-0 h-screen">
                <nav class="text-Blue1 font-medium flex flex-col gap-2">
                    <h2>Menu Admin</h2>
                    <h2>Semua Event</h2>
                    <h2>Keluar</h2> 
                </nav>
            </aside>

            <div class="w-full p-10">
                <h1 class="text-Blue1 font-bold text-4xl">Dashboard Admin</h1>

                <div class="flex gap-10 text-Blue1 justify-between w-full px-20">
                    <div class="border border-Black-40 bg-White py-4 px-6 rounded-md text-end flex flex-col gap-2">
                        <h5 class="font-semibold opacity-50">Menunggu Review</h5>
                        <h2 class="font-medium text-4xl">{{ pendingCount }}</h2>
                    </div>
                    <div class="border border-Black-40 bg-White py-4 px-6 rounded-md text-end flex flex-col gap-2">
                        <h5 class="font-semibold opacity-50">Total Event Aktif</h5>
                        <h2 class="font-medium text-4xl">312</h2>
                    </div>
                    <div class="border border-Yellow bg-Yellow1 py-4 px-6 rounded-md text-end flex flex-col gap-2">
                        <h5 class="font-semibold opacity-50">Total Pengguna</h5>
                        <h2 class="font-medium text-4xl">1.002</h2>
                    </div>
                </div>

                <div class="text-Blue p-5 border border-Black-40 bg-White rounded-md flex flex-col gap-7">
                    <div class="flex justify-between">
                        <h2 class="font-semibold text-2xl">Moderasi Konten</h2>
                        <div class="border border-Yellow rounded-full bg-Yellow1 px-4 py-1">
                            <p class="text-Brown">Isi Query</p>
                        </div>
                    </div>

                    <div class="flex flex-col gap-4">
                        <div 
                        v-for="event in pendingEvents"
                        :key="event.id"
                        class="p-5 border border-Black-40 bg-Black-30 flex gap-5 justify-between items-center">
                            <div>
                                <img>
                                
                                <div>
                                    <h3>{{ event.name }}</h3>
                                    <p>Rp {{ Number(event.price_ticket).toLocaleString('id-ID') }}</p>
                                    <p>{{ event.open_event }} - {{ event.close_event }}</p>
                                </div>
                            </div>

                            <div class="flex gap-1 h-fit">
                                <button 
                                @click="approveEvent(event.id)"
                                class="px-5 py-1 border border-Green bg-Green2 rounded">
                                    <p class="text-Green">Setujui</p>
                                </button>
                                <button 
                                @click="declineEvent(event.id)"
                                class="px-5 py-1 border border-Red bg-Red2 rounded">
                                    <p class="text-Red">Tolak</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>