<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import { Search, Clock, MapPin, Calendar } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface EventSubmission {
    id: number
    name: string
    organizer_name: string
    organizer_university: string
    category: string
    price: number | null       // null = gratis
    format: 'Online' | 'Offline'
    description: string
    event_date: string         // ISO date string
    event_time: string         // e.g. "09.00-12.00"
    location: string | null    // null when Online
    poster_url: string | null
    status: 'menunggu' | 'disetujui' | 'ditolak'
    submitted_at: string       // ISO datetime
}

const props = defineProps<{
    events: EventSubmission[]
}>()

type TabKey = 'menunggu' | 'disetujui' | 'ditolak' | 'semua'

const activeTab = ref<TabKey>('menunggu')
const searchQuery = ref('')

const tabs: { key: TabKey; label: string }[] = [
    { key: 'menunggu',  label: 'Menunggu'  },
    { key: 'disetujui', label: 'Disetujui' },
    { key: 'ditolak',   label: 'Ditolak'   },
    { key: 'semua',     label: 'Semua'     },
]

const tabCounts = computed(() => ({
    menunggu:  props.events.filter(e => e.status === 'menunggu').length,
    disetujui: props.events.filter(e => e.status === 'disetujui').length,
    ditolak:   props.events.filter(e => e.status === 'ditolak').length,
    semua:     props.events.length,
}))

const filteredEvents = computed(() => {
    let list = props.events
    if (activeTab.value !== 'semua') {
        list = list.filter(e => e.status === activeTab.value)
    }
    if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase()
        list = list.filter(
            e =>
                e.name.toLowerCase().includes(q) ||
                e.organizer_name.toLowerCase().includes(q) ||
                e.organizer_university.toLowerCase().includes(q)
        )
    }
    return list
})

// ── Actions ───────────────────────────────────────────────────────────────────

const approveEvent = (id: number) => {
    router.patch(`/admin/event-submission/${id}/approve`, {}, { preserveScroll: true })
}

const declineEvent = (id: number) => {
    router.patch(`/admin/event-submission/${id}/decline`, {}, { preserveScroll: true })
}

const viewDetail = (id: number) => {
    router.visit(`/admin/event-submission/${id}`)
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

const timeAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
    if (diff < 60)    return `${diff} detik lalu`
    if (diff < 3600)  return `${Math.floor(diff / 60)} menit lalu`
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
    return `${Math.floor(diff / 86400)} hari lalu`
}

const formatPrice = (price: number | null) =>
    price === null || price === 0
        ? 'Gratis'
        : `Rp ${price.toLocaleString('id-ID')}`

const posterBg: Record<string, string> = {
    Webinar:    'bg-blue-100 text-blue-500',
    Kompetisi:  'bg-yellow-100 text-yellow-600',
    Pelatihan:  'bg-green-100 text-green-600',
    Seminar:    'bg-purple-100 text-purple-600',
    Workshop:   'bg-orange-100 text-orange-600',
}
const getPosterClass = (cat: string) =>
    posterBg[cat] ?? 'bg-slate-100 text-slate-500'

const categoryClass: Record<string, string> = {
    Webinar:   'bg-blue-50   text-blue-600   border-blue-200',
    Kompetisi: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    Pelatihan: 'bg-green-50  text-green-700  border-green-200',
    Seminar:   'bg-purple-50 text-purple-700 border-purple-200',
    Workshop:  'bg-orange-50 text-orange-700 border-orange-200',
}
const getCategoryClass = (cat: string) =>
    categoryClass[cat] ?? 'bg-slate-50 text-slate-600 border-slate-200'

const statusConfig = {
    menunggu:  { label: 'Menunggu',  class: 'bg-yellow-50 text-yellow-700 border-yellow-300' },
    disetujui: { label: 'Disetujui', class: 'bg-green-50  text-green-700  border-green-300'  },
    ditolak:   { label: 'Ditolak',   class: 'bg-red-50    text-red-700    border-red-300'    },
}
</script>

<template>
    <div class="bg-Blue text-White flex p-6 justify-between items-center">
        <div class="flex gap-10 items-center">
            <h1 class="font-bold text-3xl">NessUp!</h1>
            <div class="flex gap-5">
                <a href="/admin/dashboard" class="hover:underline">Menu Admin</a>
                <a href="/admin/moderasi-event" class="font-bold text-Yellow">Moderasi Event</a>
                <a href="/admin/events" class="hover:underline">Semua Event</a>
            </div>
        </div>
        <h3>Super Admin</h3>
    </div>
    <div class="p-8 min-h-screen bg-gray-50">


        <!-- Header -->
        <div class="flex items-start justify-between mb-1">
            <div>
                <h1 class="text-3xl font-bold text-slate-800">Moderasi Konten</h1>
                <p class="text-slate-500 mt-1 text-sm">Review dan setujui event yang dikirim pengguna</p>
            </div>

            <div class="relative w-64">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" :size="15" />
                <Input
                    v-model="searchQuery"
                    placeholder="Cari event..."
                    class="pl-9 bg-white border-slate-200 text-sm focus-visible:ring-blue-500"
                />
            </div>
        </div>

        <!-- Tabs -->
        <div class="flex gap-2 mb-6 mt-4 flex-wrap">
            <button
                v-for="tab in tabs"
                :key="tab.key"
                @click="activeTab = tab.key"
                :class="[
                    'px-4 py-1.5 rounded-full text-sm font-medium border transition-colors',
                    activeTab === tab.key
                        ? 'bg-yellow-400 text-slate-800 border-yellow-400 font-semibold'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-yellow-300 hover:text-yellow-700',
                ]"
            >
                {{ tab.label }}
                <span v-if="tab.key !== 'semua'" class="ml-1">({{ tabCounts[tab.key] }})</span>
            </button>
        </div>

        <!-- Event cards -->
        <div class="flex flex-col gap-4">

            <!-- Empty state -->
            <div
                v-if="filteredEvents.length === 0"
                class="bg-white rounded-xl border border-slate-200 py-16 flex flex-col items-center gap-2 text-slate-400"
            >
                <Search :size="32" class="text-slate-300" />
                <span class="text-sm">Tidak ada event ditemukan</span>
            </div>

            <!-- Card -->
            <div
                v-for="event in filteredEvents"
                :key="event.id"
                class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex gap-5 hover:shadow-md transition-shadow"
            >
                <!-- Poster placeholder -->
                <div
                    :class="[
                        'w-20 h-20 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-medium',
                        getPosterClass(event.category),
                    ]"
                >
                    <img
                        v-if="event.poster_url"
                        :src="event.poster_url"
                        :alt="event.name"
                        class="w-full h-full object-cover rounded-lg"
                    />
                    <span v-else>Poster</span>
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                    <!-- Top row: title + status badge -->
                    <div class="flex items-start justify-between gap-2">
                        <h2 class="font-bold text-slate-800 text-base leading-snug">
                            {{ event.name }}
                        </h2>
                        <Badge
                            variant="outline"
                            :class="['shrink-0 text-xs', statusConfig[event.status].class]"
                        >
                            {{ statusConfig[event.status].label }}
                        </Badge>
                    </div>

                    <!-- Meta: organizer -->
                    <p class="text-sm text-slate-500 mt-0.5">
                        Oleh:
                        <span class="text-blue-600 font-medium">{{ event.organizer_name }}</span>
                        · {{ event.organizer_university }}
                        · <Clock :size="12" class="inline -mt-0.5 mr-0.5" />
                        <span class="text-slate-400">Dikirim {{ timeAgo(event.submitted_at) }}</span>
                    </p>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-1.5 mt-2">
                        <Badge
                            variant="outline"
                            :class="['text-xs', getCategoryClass(event.category)]"
                        >
                            {{ event.category }}
                        </Badge>
                        <Badge
                            variant="outline"
                            class="text-xs bg-green-50 text-green-700 border-green-200"
                        >
                            {{ formatPrice(event.price) }}
                        </Badge>
                        <Badge
                            variant="outline"
                            class="text-xs bg-slate-50 text-slate-600 border-slate-200"
                        >
                            {{ event.format }}
                        </Badge>
                    </div>

                    <!-- Description -->
                    <p class="text-sm text-slate-500 mt-2 line-clamp-2">
                        {{ event.description }}
                    </p>

                    <!-- Footer: actions + date/location -->
                    <div class="flex items-center justify-between mt-3 flex-wrap gap-2">
                        <div class="flex gap-2">
                            <!-- Approve -->
                            <Button
                                size="sm"
                                class="bg-white border border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 h-8 px-4 text-xs font-semibold shadow-none"
                                @click="approveEvent(event.id)"
                                :disabled="event.status === 'disetujui'"
                            >
                                Setujui
                            </Button>

                            <!-- Decline -->
                            <Button
                                size="sm"
                                class="bg-white border border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600 h-8 px-4 text-xs font-semibold shadow-none"
                                @click="declineEvent(event.id)"
                                :disabled="event.status === 'ditolak'"
                            >
                                Tolak
                            </Button>

                            <!-- Detail -->
                            <Button
                                size="sm"
                                variant="outline"
                                class="border-blue-400 text-blue-600 hover:bg-blue-50 h-8 px-4 text-xs font-semibold"
                                @click="viewDetail(event.id)"
                            >
                                Lihat detail
                            </Button>
                        </div>

                        <!-- Date & location -->
                        <span class="text-xs text-slate-400 flex items-center gap-1 whitespace-nowrap">
                            <Calendar :size="12" />
                            {{ formatDate(event.event_date) }}
                            <template v-if="event.event_time">• {{ event.event_time }}</template>
                            <template v-if="event.location">
                                · <MapPin :size="12" class="inline" /> {{ event.location }}
                            </template>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>