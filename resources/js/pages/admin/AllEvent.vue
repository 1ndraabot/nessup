<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import { Search, Trash2 } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
Table,
TableBody,
TableCell,
TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

interface Event {
    id: number
    name: string
    organizer: string
    category: string
    format: 'Online' | 'Offline'
    participant_count: number
    event_date: string
    status: 'aktif' | 'menunggu' | 'ditolak' | 'selesai'
}

const props = defineProps<{
    events: Event[]
}>()

type TabKey = 'semua' | 'aktif' | 'menunggu' | 'ditolak' | 'selesai'

const activeTab = ref<TabKey>('semua')
const searchQuery = ref('')

const tabCounts = computed(() => ({
    semua: props.events.length,
    aktif: props.events.filter(e => e.status === 'aktif').length,
    menunggu: props.events.filter(e => e.status === 'menunggu').length,
    ditolak: props.events.filter(e => e.status === 'ditolak').length,
    selesai: props.events.filter(e => e.status === 'selesai').length,
}))

const tabs: { key: TabKey; label: string }[] = [
    { key: 'semua', label: 'Semua' },
    { key: 'aktif', label: 'Aktif' },
    { key: 'menunggu', label: 'Menunggu' },
    { key: 'ditolak', label: 'Ditolak' },
    { key: 'selesai', label: 'Selesai' },
]

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
                e.organizer.toLowerCase().includes(q) ||
                e.category.toLowerCase().includes(q)
        )
    }

    return list
})

const activeEventCount = computed(
    () => props.events.filter(e => e.status === 'aktif').length
)

const deleteEvent = (id: number) => {
    router.delete(`/admin/events/${id}`, {
        preserveScroll: true,
    })
}

const statusConfig: Record<
    Event['status'],
    { label: string; class: string }
> = {
    aktif: {
        label: 'Aktif',
        class: 'bg-green-100 text-green-700 border-green-200 hover:bg-green-100',
    },
    menunggu: {
        label: 'Menunggu',
        class: 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100',
    },
    ditolak: {
        label: 'Ditolak',
        class: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-100',
    },
    selesai: {
        label: 'Selesai',
        class: 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-100',
    },
}

const categoryConfig: Record<string, string> = {
    Seminar: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100',
    Workshop: 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100',
    Kompetisi: 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100',
    Webinar: 'bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-100',
}

const getCategoryClass = (category: string) =>
    categoryConfig[category] ??
    'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100'

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}
</script>

<template>
    <!-- Main content — drop this inside your layout's <main> or content slot -->

    <div class="bg-Blue text-White flex p-6 justify-between items-center">
        <div class="flex gap-10 items-center">
            <h1 class="font-bold text-3xl">NessUp!</h1>
            <div class="flex gap-5">
                <a href="/admin/dashboard" class="hover:underline">Menu Admin</a>
                <a href="/admin/moderasi-event" class="hover:underline">Moderasi Event</a>
                <a href="/admin/events" class="font-bold text-Yellow">Semua Event</a>
            </div>
        </div>
        <h3>Super Admin</h3>
    </div>

    <div class="p-8 min-h-screen bg-gray-50">
        <!-- Header row -->
        <div class="flex items-start justify-between mb-6">
            <div>
                <h1 class="text-3xl font-bold text-slate-800">Semua Event</h1>
                <p class="text-slate-500 mt-1 text-sm">
                    {{ activeEventCount }} event aktif dari {{ events.length }} event
                </p>
            </div>

            <!-- Search -->
            <div class="relative w-64">
                <Search
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    :size="16"
                />
                <Input
                    v-model="searchQuery"
                    placeholder="Cari event..."
                    class="pl-9 bg-white border-slate-200 text-sm focus-visible:ring-blue-500"
                />
            </div>
        </div>

        <!-- Tab filters -->
        <div class="flex gap-2 mb-5 flex-wrap">
            <button
                v-for="tab in tabs"
                :key="tab.key"
                @click="activeTab = tab.key"
                :class="[
                    'px-4 py-1.5 rounded-full text-sm font-medium border transition-colors',
                    activeTab === tab.key
                        ? 'bg-blue-800 text-white border-blue-800'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700',
                ]"
            >
                {{ tab.label }} ({{ tabCounts[tab.key] }})
            </button>
        </div>

        <!-- Table card -->
        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow class="bg-slate-50 hover:bg-slate-50">
                        <TableHead class="font-semibold text-slate-600 py-3 pl-6">
                            Nama Event
                        </TableHead>
                        <TableHead class="font-semibold text-slate-600 py-3">
                            Kategori
                        </TableHead>
                        <TableHead class="font-semibold text-slate-600 py-3">
                            Format
                        </TableHead>
                        <TableHead class="font-semibold text-slate-600 py-3 text-center">
                            Peserta
                        </TableHead>
                        <TableHead class="font-semibold text-slate-600 py-3">
                            Tanggal
                        </TableHead>
                        <TableHead class="font-semibold text-slate-600 py-3">
                            Status
                        </TableHead>
                        <TableHead class="font-semibold text-slate-600 py-3 pr-6 text-center">
                            Aksi
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <!-- Empty state -->
                    <TableRow v-if="filteredEvents.length === 0">
                        <TableCell
                            colspan="7"
                            class="text-center py-16 text-slate-400"
                        >
                            <div class="flex flex-col items-center gap-2">
                                <Search :size="32" class="text-slate-300" />
                                <span class="text-sm">Tidak ada event ditemukan</span>
                            </div>
                        </TableCell>
                    </TableRow>

                    <TableRow
                        v-for="event in filteredEvents"
                        :key="event.id"
                        class="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                        <!-- Name + organizer -->
                        <TableCell class="py-4 pl-6">
                            <div class="font-semibold text-slate-800 leading-snug">
                                {{ event.name }}
                            </div>
                            <div class="text-xs text-slate-400 mt-0.5">
                                {{ event.organizer }}
                            </div>
                        </TableCell>

                        <!-- Category -->
                        <TableCell class="py-4">
                            <Badge
                                variant="outline"
                                :class="getCategoryClass(event.category)"
                            >
                                {{ event.category }}
                            </Badge>
                        </TableCell>

                        <!-- Format -->
                        <TableCell class="py-4 text-slate-600 text-sm">
                            {{ event.format }}
                        </TableCell>

                        <!-- Participant count -->
                        <TableCell class="py-4 text-center text-slate-700 font-medium">
                            {{ event.participant_count }}
                        </TableCell>

                        <!-- Date -->
                        <TableCell class="py-4 text-slate-500 text-sm whitespace-nowrap">
                            {{ formatDate(event.event_date) }}
                        </TableCell>

                        <!-- Status -->
                        <TableCell class="py-4">
                            <Badge
                                variant="outline"
                                :class="statusConfig[event.status].class"
                            >
                                {{ statusConfig[event.status].label }}
                            </Badge>
                        </TableCell>

                        <!-- Delete action -->
                        <TableCell class="py-4 pr-6 text-center">
                            <AlertDialog>
                                <AlertDialogTrigger as-child>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        class="text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 :size="16" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Hapus Event?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Event <span class="font-semibold text-slate-700">"{{ event.name }}"</span>
                                            akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                        <AlertDialogAction
                                            class="bg-red-600 hover:bg-red-700 text-white"
                                            @click="deleteEvent(event.id)"
                                        >
                                            Hapus
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>