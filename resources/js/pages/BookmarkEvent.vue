<script setup>
    import { ref, computed } from 'vue'
    import { Link, router } from '@inertiajs/vue3'
    import { Input } from '@/components/ui/input'
    import { Button } from '@/components/ui/button'
    import { Badge } from '@/components/ui/badge'
    import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu'
    import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    } from '@/components/ui/alert-dialog'
    import { Bookmark, SlidersHorizontal, CalendarDays, MapPin, Wifi, Search, BookmarkX } from 'lucide-vue-next'

    const props = defineProps({
    bookmarks: {
        type: Array,
        default: () => [],
    },
    })


    const bookmarks = computed(() =>
    props.bookmarks ?? []
    )

    const activeTab = ref('semua')
    const search = ref('')
    const filterCategories = ref([])
    const filterModes = ref([])
    const deleteTarget = ref(null)
    const isDeleting = ref(false)

    const tabs = [
    { key: 'semua', label: 'Semua' },
    { key: 'akan_datang', label: 'Akan datang' },
    { key: 'sudah_lewat', label: 'Sudah lewat' },
    ]

    const allCategories = computed(() => {
    const cats = bookmarks.value.map(b => b.event.category)
    return [...new Set(cats)]
    })

    const allModes = ['Online', 'Offline']

    const filtered = computed(() => {
    let list = bookmarks.value

    if (activeTab.value === 'akan_datang') list = list.filter(b => !b.event.is_past)
    if (activeTab.value === 'sudah_lewat') list = list.filter(b => b.event.is_past)

    if (search.value.trim()) {
        const q = search.value.toLowerCase()
        list = list.filter(b =>
        b.event.title.toLowerCase().includes(q) ||
        b.event.organizer.toLowerCase().includes(q)
        )
    }

    if (filterCategories.value.length) {
        list = list.filter(b => filterCategories.value.includes(b.event.category))
    }

    if (filterModes.value.length) {
        list = list.filter(b => filterModes.value.includes(b.event.mode))
    }

    return list
    })

    const activeFiltersCount = computed(
    () => filterCategories.value.length + filterModes.value.length
    )

    function formatPrice(price) {
    if (!price) return 'Gratis'
    return 'Rp ' + price.toLocaleString('id-ID')
    }

    function formatDate(dateStr, time) {
    const d = new Date(dateStr)
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) + ' – ' + time + ' WIB'
    }

    function categoryColor(cat) {
    const map = {
        Kompetisi: 'bg-blue-50 text-blue-700 border-blue-200',
        Seminar: 'bg-purple-50 text-purple-700 border-purple-200',
        Workshop: 'bg-amber-50 text-amber-700 border-amber-200',
    }
    return map[cat] ?? 'bg-gray-100 text-gray-600 border-gray-200'
    }

    function posterAccent(cat) {
    const map = {
        Kompetisi: 'from-blue-50 to-blue-100 text-blue-400',
        Seminar: 'from-indigo-50 to-indigo-100 text-indigo-400',
        Workshop: 'from-amber-50 to-amber-100 text-amber-400',
    }
    return map[cat] ?? 'from-gray-50 to-gray-100 text-gray-400'
    }

    function openDeleteDialog(bookmark) {
    deleteTarget.value = bookmark
    }

    function confirmDelete() {
    if (!deleteTarget.value) return
    isDeleting.value = true
    router.delete(`/bookmarks/${deleteTarget.value.id}`), {
        preserveScroll: true,
        onFinish: () => {
        isDeleting.value = false
        deleteTarget.value = null
        },
    }

    function goRegister(eventId) {
    router.visit(`/explore/${eventId}`)
    }

    function toggleCategory(cat) {
    const idx = filterCategories.value.indexOf(cat)
    if (idx === -1) filterCategories.value.push(cat)
    else filterCategories.value.splice(idx, 1)
    }

    function toggleMode(mode) {
    const idx = filterModes.value.indexOf(mode)
    if (idx === -1) filterModes.value.push(mode)
    else filterModes.value.splice(idx, 1)
    }

    function clearFilters() {
    filterCategories.value = []
    filterModes.value = []
    }
}
</script>

<template>
    <nav class="text-White bg-Sky-Blue flex p-6 justify-between items-center">
        <div class="flex gap-10 items-center">
            <h1 class="font-bold text-3xl">NessUp!</h1>
            <div class="flex gap-5">
                <Link href="/dashboard" class="text-xl hover:underline">Beranda</Link>
                <Link href="/explore" class="text-xl hover:underline">Explore</Link>
                <Link href="/event-saya" class="font-semibold text-Yellow text-xl">Event Saya</Link>
            </div>
        </div>
        <h1 class="px-4 py-1 bg-Yellow text-Blue font-semibold rounded">{{ $page.props.auth.user.name }}</h1>
    </nav>
  <div class="min-h-screen bg-gray-50/60">
    <div class="max-w-5xl mx-auto px-6 py-8">

      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Event Saya</h1>
        <p class="text-sm text-gray-500 mt-0.5">Event yang kamu simpan dari Explore</p>
      </div>

      <div class="flex flex-col gap-4 mb-6">
        <!-- Search + Filter -->
        <div class="flex items-center gap-2">
          <div class="relative flex-1 max-w-sm">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              v-model="search"
              placeholder="Cari event tersimpan..."
              class="pl-9 bg-white border-gray-200 focus-visible:ring-blue-500 text-sm"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                variant="outline"
                size="sm"
                class="gap-1.5 border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              >
                <SlidersHorizontal class="h-3.5 w-3.5" />
                Filter
                <span
                  v-if="activeFiltersCount"
                  class="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-semibold text-white"
                >
                  {{ activeFiltersCount }}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-48">
              <div class="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategori</div>
              <DropdownMenuCheckboxItem
                v-for="cat in allCategories"
                :key="cat"
                :checked="filterCategories.includes(cat)"
                @select.prevent="toggleCategory(cat)"
              >
                {{ cat }}
              </DropdownMenuCheckboxItem>

              <div class="my-1 border-t border-gray-100" />
              <div class="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mode</div>
              <DropdownMenuCheckboxItem
                v-for="mode in allModes"
                :key="mode"
                :checked="filterModes.includes(mode)"
                @select.prevent="toggleMode(mode)"
              >
                {{ mode }}
              </DropdownMenuCheckboxItem>

              <template v-if="activeFiltersCount > 0">
                <div class="my-1 border-t border-gray-100" />
                <button
                  class="w-full px-2 py-1.5 text-xs text-red-600 hover:bg-red-50 text-left rounded-sm"
                  @click="clearFilters"
                >
                  Hapus semua filter
                </button>
              </template>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <!-- Tabs -->
        <div class="flex gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="[
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
              activeTab === tab.key
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600',
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <div v-if="filtered.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="bookmark in filtered"
          :key="bookmark.id"
          :class="[
            'group relative rounded-2xl border bg-white shadow-sm overflow-hidden transition-all duration-200',
            bookmark.event.is_past
              ? 'opacity-60 border-gray-200'
              : 'border-gray-200 hover:shadow-md hover:-translate-y-0.5',
          ]"
        >
          <div
            v-if="bookmark.event.is_past"
            class="absolute top-3 left-3 z-10"
          >
            <span class="text-xs font-semibold bg-gray-800/80 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
              Sudah lewat
            </span>
          </div>

          <div class="absolute top-3 right-3 z-10">
            <div class="h-7 w-7 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
              <Bookmark class="h-3.5 w-3.5 fill-blue-600 text-blue-600" />
            </div>
          </div>

          <div
            :class="[
              'h-36 bg-gradient-to-br flex items-center justify-center',
              posterAccent(bookmark.event.category),
              bookmark.event.is_past ? 'grayscale' : '',
            ]"
          >
            <template v-if="bookmark.event.poster_url">
              <img
                :src="bookmark.event.poster_url"
                :alt="bookmark.event.title"
                class="h-full w-full object-cover"
              />
            </template>
            <template v-else>
              <span class="text-sm font-medium opacity-60">Poster Event</span>
            </template>
          </div>

          <!-- Card Body -->
          <div class="p-4">
            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mb-3">
              <span
                :class="['inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border', categoryColor(bookmark.event.category)]"
              >
                {{ bookmark.event.category }}
              </span>
              <span
                :class="[
                  'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
                  bookmark.event.price === 0
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-gray-50 text-gray-600 border-gray-200',
                ]"
              >
                {{ formatPrice(bookmark.event.price) }}
              </span>
              <span
                :class="[
                  'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border',
                  bookmark.event.mode === 'Online'
                    ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                    : 'bg-orange-50 text-orange-700 border-orange-200',
                ]"
              >
                <Wifi v-if="bookmark.event.mode === 'Online'" class="h-3 w-3" />
                <MapPin v-else class="h-3 w-3" />
                {{ bookmark.event.mode }}
              </span>
            </div>

            <h3
              :class="[
                'font-semibold text-sm leading-snug mb-0.5',
                bookmark.event.is_past ? 'text-gray-400' : 'text-gray-900',
              ]"
            >
              {{ bookmark.event.title }}
            </h3>
            <p
              :class="['text-xs mb-1', bookmark.event.is_past ? 'text-gray-400' : 'text-gray-500']"
            >
              {{ bookmark.event.organizer }}
            </p>
            <div class="flex items-center gap-1 text-xs text-gray-400 mb-4">
              <CalendarDays class="h-3 w-3 shrink-0" />
              {{ formatDate(bookmark.event.date, bookmark.event.time) }}
            </div>

            <div class="flex gap-2">
              <template v-if="!bookmark.event.is_past">
                <Button
                  size="sm"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-8"
                  @click="goRegister(bookmark.event.id)"
                >
                  Daftar
                </Button>
              </template>
              <template v-else>
                <Button
                  size="sm"
                  disabled
                  class="flex-1 text-xs font-semibold h-8"
                  variant="outline"
                >
                  Event selesai
                </Button>
              </template>

              <Button
                size="sm"
                variant="outline"
                class="h-8 px-3 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 text-xs font-semibold"
                @click="openDeleteDialog(bookmark)"
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center py-24 text-center"
      >
        <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
          <BookmarkX class="h-8 w-8 text-blue-400" />
        </div>
        <h3 class="text-base font-semibold text-gray-800 mb-1">
          {{ search || activeFiltersCount ? 'Tidak ada event yang cocok' : 'Belum ada event tersimpan' }}
        </h3>
        <p class="text-sm text-gray-500 max-w-xs">
          {{ search || activeFiltersCount
            ? 'Coba ubah kata kunci atau hapus filter yang aktif.'
            : 'Jelajahi Explore dan simpan event yang kamu minati agar mudah ditemukan kembali.' }}
        </p>
        <Button
          v-if="activeFiltersCount"
          variant="outline"
          size="sm"
          class="mt-4"
          @click="clearFilters"
        >
          Hapus filter
        </Button>
      </div>

    </div>
  </div>

  <AlertDialog :open="!!deleteTarget" @update:open="val => { if (!val) deleteTarget = null }">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Hapus bookmark ini?</AlertDialogTitle>
        <AlertDialogDescription>
          <strong>{{ deleteTarget?.event?.title }}</strong> akan dihapus dari daftar event tersimpan kamu. Kamu bisa menyimpannya kembali dari halaman Explore.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel :disabled="isDeleting">Batal</AlertDialogCancel>
        <AlertDialogAction
          class="bg-red-600 hover:bg-red-700 focus:ring-red-500"
          :disabled="isDeleting"
          @click="confirmDelete"
        >
          {{ isDeleting ? 'Menghapus...' : 'Ya, Hapus' }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>