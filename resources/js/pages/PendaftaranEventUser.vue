<script setup>
import { ref, computed } from 'vue'
import { Head, Link, router } from '@inertiajs/vue3'

// shadcn/ui components — pakai jika tersedia di project
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const props = defineProps({
  event: {
    type: Object,
    default: () => ({
      id: 1,
      nama: 'Nama Event',
      harga_tiket: 25000,
      biaya_layanan: 2000,
    }),
  },
  auth: {
    type: Object,
    default: () => ({ user: { name: 'Jeffrey Pratama' } }),
  },
})

const form = ref({
  nama_lengkap: '',
  no_whatsapp: '',
  email: '',
  jurusan_prodi: '',
  setuju: false,
})

const errors = ref({})
const loading = ref(false)

const total = computed(() => {
  return Number(props.event?.harga_tiket ?? 0)
       + Number(props.event?.biaya_layanan ?? 0)
})

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
    .format(value)
    .replace('IDR', 'Rp')
    .trim()
}

function validate() {
  const e = {}
  if (!form.value.nama_lengkap.trim()) e.nama_lengkap = 'Nama lengkap wajib diisi.'
  if (!form.value.no_whatsapp.trim()) e.no_whatsapp = 'Nomor WhatsApp wajib diisi.'
  else if (!/^08\d{8,12}$/.test(form.value.no_whatsapp))
    e.no_whatsapp = 'Format nomor tidak valid (contoh: 08xxxxxxxxxx).'
  if (!form.value.email.trim()) e.email = 'Email aktif wajib diisi.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email))
    e.email = 'Format email tidak valid.'
  if (!form.value.jurusan_prodi.trim()) e.jurusan_prodi = 'Jurusan / Prodi wajib diisi.'
  if (!form.value.setuju) e.setuju = 'Anda harus menyetujui pernyataan ini.'
  errors.value = e
  return Object.keys(e).length === 0
}

function submit() {
  if (!validate()) return

  loading.value = true

  router.post(
    `/event/${props.event.id}/daftar`,
    form.value,
    {
      onSuccess: (page) => {
        const waUrl = page.props.flash?.wa_url

        if (waUrl) {
          window.location.href = waUrl
        }
      },

      onFinish: () => {
        loading.value = false
      }
    }
  )
}
</script>

<template>
  <Head title="Pendaftaran Event" />

  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Navbar -->
    <header class="bg-blue-800 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <span class="text-2xl font-bold tracking-tight">NessUp!</span>
      <div class="flex items-center gap-3">
        <div
          class="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-blue-900 text-sm select-none"
        >
          {{ auth.user?.name?.charAt(0) ?? 'U' }}
        </div>
        <span class="font-medium text-sm">{{ auth.user?.name }}</span>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 px-4 py-6 max-w-5xl mx-auto w-full">
      <!-- Back link -->
      <Link
        :href="`/explore/${event.id}`"
        class="text-blue-600 text-sm hover:underline inline-flex items-center gap-1 mb-5"
      >
        ← Kembali ke detail event
      </Link>

      <!-- Page title -->
      <h1 class="text-2xl font-bold text-gray-900 mb-1">Pendaftaran Event</h1>
      <p class="text-gray-500 text-sm mb-6">Lengkapi data dirimu untuk mendaftar ke event ini.</p>

      <!-- Stepper -->
      <div class="flex items-center gap-0 mb-8 select-none">
        <!-- Step 1 (active) -->
        <!-- <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center text-sm font-bold"
          >
            1
          </div>
          <span class="text-blue-800 font-semibold text-sm">Detail diri</span>
        </div> -->

        <!-- <div class="flex-1 h-px bg-gray-300 mx-3 max-w-[100px]" /> -->

        <!-- Step 2 -->
        <!-- <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center text-sm font-semibold"
          >
            2
          </div>
          <span class="text-gray-400 text-sm">Pembayaran</span>
        </div> -->

        <!-- <div class="flex-1 h-px bg-gray-300 mx-3 max-w-[100px]" /> -->

        <!-- Step 3 -->
        <!-- <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center text-sm font-semibold"
          >
            3
          </div>
          <span class="text-gray-400 text-sm">Tiket</span>
        </div> -->
      </div>

      <!-- Two-column layout -->
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Left: Form -->
        <div class="flex-1 bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-200">
            Data Diri Peserta
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
            <!-- Nama Lengkap -->
            <div class="flex flex-col gap-1">
              <label class="text-sm text-gray-700 font-medium">
                Nama lengkap <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.nama_lengkap"
                type="text"
                placeholder="Masukkan nama lengkap"
                class="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                :class="errors.nama_lengkap ? 'border-red-400' : 'border-gray-300'"
              />
              <p v-if="errors.nama_lengkap" class="text-xs text-red-500">{{ errors.nama_lengkap }}</p>
            </div>

            <!-- No. WhatsApp -->
            <div class="flex flex-col gap-1">
              <label class="text-sm text-gray-700 font-medium">
                No. WhatsApp <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.no_whatsapp"
                type="tel"
                placeholder="08xxxxxxxxxxx"
                class="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                :class="errors.no_whatsapp ? 'border-red-400' : 'border-gray-300'"
              />
              <p v-if="errors.no_whatsapp" class="text-xs text-red-500">{{ errors.no_whatsapp }}</p>
            </div>

            <!-- Email -->
            <div class="flex flex-col gap-1">
              <label class="text-sm text-gray-700 font-medium">
                Email aktif <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.email"
                type="email"
                placeholder="email@kampus.ac.id"
                class="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                :class="errors.email ? 'border-red-400' : 'border-gray-300'"
              />
              <p v-if="errors.email" class="text-xs text-red-500">{{ errors.email }}</p>
            </div>

            <!-- Jurusan / Prodi -->
            <div class="flex flex-col gap-1">
              <label class="text-sm text-gray-700 font-medium">
                Jurusan / Prodi <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.jurusan_prodi"
                type="text"
                placeholder="Contoh: Teknik Informatika"
                class="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                :class="errors.jurusan_prodi ? 'border-red-400' : 'border-gray-300'"
              />
              <p v-if="errors.jurusan_prodi" class="text-xs text-red-500">{{ errors.jurusan_prodi }}</p>
            </div>
          </div>
        </div>

        <!-- Right: Rincian Biaya + Checkbox -->
        <div class="lg:w-72 flex flex-col gap-4">
          <!-- Cost breakdown -->
          <div class="bg-white rounded-xl shadow-sm p-5">
            <h2 class="text-base font-semibold text-gray-900 mb-4">Rincian Biaya</h2>
            <div class="flex justify-between text-sm text-gray-500 mb-2">
              <span>Harga tiket</span>
              <span>{{ formatRupiah(event.harga_tiket) }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-500 mb-3">
              <span>Biaya layanan</span>
              <span>{{ formatRupiah(event.biaya_layanan) }}</span>
            </div>
            <div class="border-t border-gray-200 pt-3 flex justify-between font-bold text-base">
              <span class="text-gray-900">Total</span>
              <span class="text-blue-700">{{ formatRupiah(total) }}</span>
            </div>
          </div>

          <!-- Agreement checkbox -->
          <div
            class="bg-white rounded-xl shadow-sm p-4 flex items-start gap-3"
            :class="errors.setuju ? 'ring-1 ring-red-400' : ''"
          >
            <input
              id="setuju"
              v-model="form.setuju"
              type="checkbox"
              class="mt-0.5 w-4 h-4 rounded accent-blue-700 cursor-pointer shrink-0"
            />
            <label for="setuju" class="text-sm text-gray-700 cursor-pointer leading-snug">
              Saya menyatakan data yang saya isi adalah benar dan bersedia mengikuti seluruh
              rangkaian acara.
            </label>
          </div>
          <p v-if="errors.setuju" class="text-xs text-red-500 -mt-2 px-1">{{ errors.setuju }}</p>
        </div>
      </div>
    </main>

    <!-- Bottom action bar -->
    <footer class="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between sticky bottom-0 z-10">
      <Link
        :href="`/explore/${event.id}`"
        class="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition inline-flex items-center gap-1"
      >
        ← Kembali
      </Link>

      <div class="flex items-center gap-3">
        <Link
          :href="`/explore/${event.id}`"
          class="text-gray-500 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
        >
          Batalkan
        </Link>
        <!-- <button
          type="button"
          :disabled="loading"
          class="bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white px-6 py-2 rounded-lg text-sm font-semibold transition inline-flex items-center gap-2"
          @click="submit"
        >
          <span v-if="loading">Memproses…</span>
          <span v-else>Lanjut ke Pembayaran →</span>
        </button> -->
        <Button
        :disabled="loading"
        @click="submit"
        class="px-6 bg-Sky-Blue font-semibold hover:bg-Yellow"
        >
          Submit
        </Button>
      </div>
    </footer>
  </div>
</template>