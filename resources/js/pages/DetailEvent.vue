<script setup>
import { ref } from 'vue'
import { Head, Link, usePage } from '@inertiajs/vue3'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Route } from 'lucide-vue-next'

const props = defineProps({
  event: {
    type: Object,
    default: () => ({
      id: 1,
      title: 'Seminar Nasional Artificial Intelligence 2026',
      tags: [
        { label: 'Seminar', color: 'default' },
        { label: 'Gratis', color: 'success' },
        { label: 'Online', color: 'outline' },
      ],
      date: 'Sabtu, 15 Juni 2026',
      time: '08.00 - 12.00 WIB',
      platform: 'Zoom Meeting',
      organizer: 'BEM FT UNDIP',
      quota_remaining: 20,
      quota_total: 200,
      registration_deadline: '13 Juni 2026, 23.59 WIB',
      cover_url: null,
      description: `Seminar Nasional bertema Artificial Intelligence ini merupakan acara tahunan yang diselenggarakan oleh BEM Fakultas Teknik Universitas Diponegoro. Kegiatan ini bertujuan untuk memberikan wawasan kepada mahasiswa tentang perkembangan AI terkini.\n\nPeserta akan mendapatkan materi dari pakar industri, sesi tanya jawab, serta sertifikat kehadiran digital yang dapat diunduh setelah acara selesai.`,
      speakers: [],
      location: null,
      contact: null,
    }),
  },
})

const page = usePage()
const user = page.props.auth?.user ?? null

const activeTab = ref('deskripsi')
const saved = ref(false)
const copied = ref(false)

const tagBadgeClass = (color) => {
  const map = {
    default: 'bg-gray-100 text-gray-700 border-gray-200',
    success: 'bg-green-100 text-green-700 border-green-200',
    outline: 'bg-white text-gray-600 border-gray-300',
  }
  return map[color] || map.default
}

const toggleSave = () => { saved.value = !saved.value }

const shareWhatsApp = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(`Yuk ikut event ini: ${props.event.title}`)
  window.open(`https://wa.me/?text=${text}%20${url}`, '_blank')
}

const copyLink = async () => {
  await navigator.clipboard.writeText(window.location.href)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <Head :title="`${event.title} — NessUp!`" />

  <div class="min-h-screen bg-[#F3F4F6] font-sans">

    <!-- ─── NAVBAR ─── -->
    <header class="bg-[#1E3A8A] px-6 py-4">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-8">
          <Link href="/" class="text-white text-xl font-bold tracking-tight">NessUp!</Link>
          <nav class="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" class="text-white hover:text-[#FACC15] transition-colors">Beranda</Link>
            <Link href="/explore" class="text-[#FACC15] font-medium">Explore</Link>
            <Link href="/tentang" class="text-white hover:text-[#FACC15] transition-colors">Event Saya</Link>
          </nav>
        </div>
        <!-- User avatar or auth buttons -->
        <div v-if="user" class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-full bg-[#FACC15] flex items-center justify-center text-black font-bold text-sm select-none">
            {{ user.name?.charAt(0).toUpperCase() }}
          </div>
          <span class="text-white text-sm font-medium">{{ user.name }}</span>
        </div>
        <div v-else class="flex items-center gap-3">
          <Link href="/login">
            <Button variant="outline" class="bg-transparent border-white text-white hover:bg-white hover:text-[#1E3A8A] text-sm px-4 h-9 rounded-md transition-colors">
              Masuk
            </Button>
          </Link>
          <Link href="/register">
            <Button class="bg-[#FACC15] hover:bg-[#EAB308] text-black text-sm px-4 h-9 rounded-md font-semibold border-0">
              Daftar
            </Button>
          </Link>
        </div>
      </div>
    </header>

    <!-- ─── PAGE BODY ─── -->
    <main class="max-w-6xl mx-auto px-6 py-6">

      <!-- Back link -->
      <Link href="/explore" class="inline-flex items-center gap-1.5 text-[#1E3A8A] text-sm font-medium hover:underline mb-5">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Explore
      </Link>

      <!-- Two-column layout -->
      <div class="flex flex-col lg:flex-row gap-6 items-start">

        <!-- ── LEFT COLUMN ── -->
        <div class="flex-1 min-w-0 flex flex-col gap-4">

          <!-- Cover / Poster -->
          <div class="bg-[#DBEAFE] rounded-xl border border-blue-100 aspect-[16/9] flex items-center justify-center overflow-hidden">
            <img
              v-if="event.cover_url"
              :src="event.cover_url"
              :alt="event.title"
              class="w-full h-full object-cover rounded-xl"
            />
            <span v-else class="text-[#1E3A8A] text-sm font-medium">Cover / Poster Event</span>
          </div>

          <!-- Tab card -->
          <Card class="border border-gray-200 rounded-xl shadow-sm bg-white">
            <CardContent class="p-0">
              <Tabs v-model="activeTab" class="w-full">
                <!-- Tab triggers -->
                <TabsList class="w-full flex rounded-none border-b border-gray-200 bg-transparent h-auto p-0 gap-0">
                  <TabsTrigger
                    v-for="tab in ['deskripsi', 'pembicara', 'lokasi', 'kontak']"
                    :key="tab"
                    :value="tab"
                    class="flex-1 capitalize text-sm py-3.5 rounded-none border-b-2 border-transparent data-[state=active]:border-[#1E3A8A] data-[state=active]:text-[#1E3A8A] text-gray-500 font-medium bg-transparent hover:text-gray-700 transition-colors"
                  >
                    {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
                  </TabsTrigger>
                </TabsList>

                <!-- Deskripsi -->
                <TabsContent value="deskripsi" class="p-5">
                  <p
                    v-for="(para, i) in event.description.split('\n\n')"
                    :key="i"
                    class="text-sm text-gray-700 leading-relaxed"
                    :class="{ 'mt-4': i > 0 }"
                  >
                    {{ para }}
                  </p>
                </TabsContent>

                <!-- Pembicara -->
                <TabsContent value="pembicara" class="p-5">
                  <div v-if="event.speakers && event.speakers.length" class="space-y-3">
                    <div v-for="speaker in event.speakers" :key="speaker.id" class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#1E3A8A] font-bold text-sm">
                        {{ speaker.name?.charAt(0) }}
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-900">{{ speaker.name }}</p>
                        <p class="text-xs text-gray-500">{{ speaker.role }}</p>
                      </div>
                    </div>
                  </div>
                  <p v-else class="text-sm text-gray-400 italic">Informasi pembicara belum tersedia.</p>
                </TabsContent>

                <!-- Lokasi -->
                <TabsContent value="lokasi" class="p-5">
                  <div v-if="event.location">
                    <p class="text-sm text-gray-700">{{ event.location }}</p>
                  </div>
                  <p v-else class="text-sm text-gray-400 italic">Informasi lokasi belum tersedia.</p>
                </TabsContent>

                <!-- Kontak -->
                <TabsContent value="kontak" class="p-5">
                  <div v-if="event.contact">
                    <p class="text-sm text-gray-700">{{ event.contact }}</p>
                  </div>
                  <p v-else class="text-sm text-gray-400 italic">Informasi kontak belum tersedia.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <!-- ── RIGHT COLUMN ── -->
        <div class="w-full lg:w-[340px] flex-shrink-0 flex flex-col gap-4">

          <!-- Info card -->
          <Card class="border border-gray-200 rounded-xl shadow-sm bg-white">
            <CardContent class="p-5 flex flex-col gap-4">

              <!-- Title -->
              <h1 class="text-lg font-bold text-gray-900 leading-snug">{{ event.title }}</h1>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="(tag, i) in event.tags"
                  :key="i"
                  :class="['text-xs px-3 py-1 rounded-full border font-medium', tagBadgeClass(tag.color)]"
                >
                  {{ tag.label }}
                </span>
              </div>

              <!-- Meta info -->
              <div class="flex flex-col gap-3">
                <!-- Tanggal -->
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 mt-0.5" />
                  <div>
                    <p class="text-xs text-gray-400 leading-none mb-0.5">Tanggal</p>
                    <p class="text-sm font-semibold text-gray-900">{{ event.date }}</p>
                  </div>
                </div>

                <!-- Waktu -->
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 mt-0.5" />
                  <div>
                    <p class="text-xs text-gray-400 leading-none mb-0.5">Waktu</p>
                    <p class="text-sm font-semibold text-gray-900">{{ event.time }}</p>
                  </div>
                </div>

                <!-- Platform -->
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 mt-0.5" />
                  <div>
                    <p class="text-xs text-gray-400 leading-none mb-0.5">Platform</p>
                    <p class="text-sm font-semibold text-gray-900">{{ event.platform }}</p>
                  </div>
                </div>

                <!-- Penyelenggara -->
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 mt-0.5" />
                  <div>
                    <p class="text-xs text-gray-400 leading-none mb-0.5">Penyelenggara</p>
                    <p class="text-sm font-semibold text-gray-900">{{ event.organizer }}</p>
                  </div>
                </div>

                <!-- Kuota
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-yellow-200 flex-shrink-0 mt-0.5" />
                  <div>
                    <p class="text-xs text-gray-400 leading-none mb-0.5">Kuota tersisa</p>
                    <p class="text-sm font-semibold text-[#1E3A8A]">
                      {{ event.quota_remaining }} dari {{ event.quota_total }} slot
                    </p>
                  </div>
                </div> -->
              </div>

              <!-- Deadline notice -->
              <div class="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                <p class="text-xs text-gray-500 leading-none mb-0.5">Pendaftaran ditutup</p>
                <p class="text-sm font-semibold text-[#1E3A8A]">{{ event.registration_deadline }}</p>
              </div>

              <!-- CTA buttons -->
              <div class="flex flex-col gap-2">
                <Link 
                :href="`/event/${event.id}/daftar`"
                class="inline-flex items-center justify-center w-full bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold text-sm h-11 rounded-lg border-0 transition-colors">
                  Daftar Sekarang
                </Link>
                <Button
                  variant="outline"
                  class="w-full border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold text-sm h-11 rounded-lg transition-colors"
                  @click="toggleSave"
                >
                  {{ saved ? '✓ Tersimpan' : 'Simpan Event' }}
                </Button>
              </div>
            </CardContent>
          </Card>

          <!-- Share card -->
          <Card class="border border-gray-200 rounded-xl shadow-sm bg-white">
            <CardContent class="p-4">
              <p class="text-sm font-semibold text-gray-800 mb-3">Bagikan event ini</p>
              <div class="flex gap-2">
                <Button
                  variant="outline"
                  class="flex-1 border-gray-200 bg-gray-50 hover:bg-green-50 hover:border-green-300 text-gray-700 text-sm h-9 rounded-lg transition-colors"
                  @click="shareWhatsApp"
                >
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  class="flex-1 border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-300 text-gray-700 text-sm h-9 rounded-lg transition-colors"
                  @click="copyLink"
                >
                  {{ copied ? 'Tersalin!' : 'Salin tautan' }}
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
        <!-- end right column -->

      </div>
    </main>

  </div>
</template>