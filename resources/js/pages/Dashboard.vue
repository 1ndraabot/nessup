<script setup lang="ts">
    import { Link, router } from '@inertiajs/vue3'
    import { ref, watch } from 'vue'
    import CardEvent from '@/components/CardEvent.vue';

    const handleDetail = (eventId: number) => {
        router.visit(`/explore/${eventId}`)
    }

    const handleSave = (eventId: number) => {
        router.post(
            '/bookmarks',
            {
                event_id: eventId,
            },
            {
                preserveScroll: true,

                onSuccess: () => {
                    alert('Event berhasil disimpan!')
                },

                onError: () => {
                    alert('Gagal menyimpan event')
                }
            }
        )
    }

    interface Event {
        id: number
        name: string
        description: string
        kategori: string
        organization_maker: string
        tipe: string
        open_event: string
        close_event: string
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    const props = defineProps<{
        events?: {
            data: any[]
        },
        filters?: {
            search?: string
        }
    }>()

    const search = ref(props.filters?.search ?? '')

    watch(search, (value) => {
        router.get(
            '/dashboard',
            { search: value },
            {
                preserveState: true,
                replace: true,
            }
        )
    })

</script>

<template>
    <div class="bg-Black-30 min-h-screen text-White">
        <nav class="bg-Sky-Blue flex p-6 justify-between items-center">
            <div class="flex gap-10 items-center">
                <h1 class="font-bold text-3xl">NessUp!</h1>
                <div class="flex gap-5">
                    <Link href="/dashboard" class="font-semibold text-Yellow text-xl">Beranda</Link>
                    <Link href="/explore" class="text-xl hover:underline">Explore</Link>
                    <Link href="/event-saya" class="text-xl hover:underline">Event Saya</Link>
                </div>
            </div>

            <h1 class="px-4 py-1 bg-Yellow text-Blue font-semibold rounded">{{ $page.props.auth.user.name }}</h1>
        </nav>

        <div class="mt-10 flex justify-center">
            <input v-model="search" type="text" placeholder="Search..." class="px-5 py-3 rounder-lg min-w-2xl rounded-full bg-White border-2 border-Black-40 text-Blue placeholder:text-Sky-Blue/50" />
        </div>
        
        <!-- <div
        v-for="event in events?.data ?? []"
        :key="event.id"
        class="text-Black"
        >
            <h2>{{ event.name }}</h2>
            <p>{{ event.organization_maker }}</p>
        </div> -->

        <div class="p-10 text-Black grid grid-cols-3 gap-6">
            <CardEvent
                v-for="event in events?.data ?? []"
                :key="event.id"
                :image="event.banner"
                :title="event.name"
                :category="event.kategori"
                :type="event.tipe"
                :organizer="event.organization_maker"
                :price="formatPrice(event.price)"
                @details="handleDetail(event.id)"
                @save="handleSave(event.id)"
            />
        </div>
    </div>
</template>
