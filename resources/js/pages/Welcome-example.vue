<script setup>
import { Link } from '@inertiajs/vue3'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// shadcn-vue components used: Button, Badge
// If not installed yet:
// npx shadcn-vue@latest add button badge
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans">

    <!-- ───────────────── NAVBAR ───────────────── -->
    <header class="bg-[#1A3A9F] px-6 py-4">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <span class="text-white text-2xl font-extrabold tracking-tight">NessUp!</span>
        <div class="flex items-center gap-3">
          <Button
            variant="outline"
            class="border-white text-white bg-transparent hover:bg-white/10 hover:text-white font-semibold px-5"
            as-child
          >
            <Link href="/login">Masuk</Link>
          </Button>
          <Button
            class="bg-[#F5A623] hover:bg-[#e0951a] text-[#1A1A1A] font-bold px-5"
            as-child
          >
            <Link href="/register">Daftar</Link>
          </Button>
        </div>
      </div>
    </header>

    <!-- ───────────────── HERO ───────────────── -->
    <section class="bg-[#1A3A9F] flex-1 px-6 pt-12 pb-16">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        <!-- Left: copy -->
        <div class="space-y-6">
          <!-- Eyebrow badge -->
          <span class="inline-block bg-[#F5A623] text-[#1A1A1A] text-sm font-semibold px-5 py-2 rounded-full">
            Pusat Informasi Event Mahasiswa
          </span>

          <h1 class="text-white text-4xl md:text-5xl font-extrabold leading-tight">
            Temukan &amp; Bagikan<br />Event Kampusmu
          </h1>

          <p class="text-white/80 text-lg font-medium leading-relaxed max-w-sm">
            Satu platform untuk seminar, workshop, kompetisi, dan event dari berbagai kampus
          </p>

          <div class="flex flex-wrap gap-4 pt-2">
            <Button
              class="bg-[#F5A623] hover:bg-[#e0951a] text-[#1A1A1A] font-bold text-base px-7 py-5"
              as-child
            >
              <Link href="/events">Jelajahi Event</Link>
            </Button>
            <Button
              variant="outline"
              class="border-white text-white bg-transparent hover:bg-white/10 hover:text-white font-semibold text-base px-7 py-5"
              as-child
            >
              <Link href="/events/create">Upload Event</Link>
            </Button>
          </div>
        </div>

        <!-- Right: illustration placeholder -->
        <div class="flex justify-center md:justify-end">
          <div
            class="w-full max-w-md aspect-[4/3] rounded-2xl bg-[#2a4db5]/60 border border-white/10 flex items-center justify-center"
          >
            <span class="text-white/40 text-base select-none">Ilustrasi/foto event</span>
          </div>
        </div>
      </div>

      <!-- Stats row -->
      <div class="max-w-6xl mx-auto mt-14 flex flex-wrap gap-10">
        <div>
          <p class="text-[#F5A623] text-4xl font-extrabold">1.300+</p>
          <p class="text-white/70 text-sm mt-1">Event<br />terdaftar</p>
        </div>
        <div>
          <p class="text-[#F5A623] text-4xl font-extrabold">250+</p>
          <p class="text-white/70 text-sm mt-1">Kampus<br />aktif</p>
        </div>
        <div>
          <p class="text-[#F5A623] text-4xl font-extrabold">20rb+</p>
          <p class="text-white/70 text-sm mt-1">Mahasiswa<br />bergabung</p>
        </div>
      </div>
    </section>

    <!-- ───────────────── WHY NESSUP ───────────────── -->
    <section class="bg-[#F0F2F5] px-6 py-16">
      <div class="max-w-6xl mx-auto">

        <!-- Section heading -->
        <div class="text-center mb-10">
          <h2 class="text-[#1A3A9F] text-3xl font-extrabold">Kenapa NessUp?</h2>
          <p class="text-[#1A3A9F]/70 mt-2 text-base">
            Platform yang memudahkan kamu mencari informasi seputar event kampus
          </p>
        </div>

        <!-- Feature cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <!-- Card 1 -->
          <div class="bg-[#1A3A9F] rounded-2xl p-6 space-y-4">
            <div class="w-12 h-12 bg-[#F5A623] rounded-xl" />
            <div>
              <p class="text-white font-bold text-lg">Temukan Event</p>
              <p class="text-white/70 text-sm mt-1 leading-relaxed">
                Cari informasi seputar event dari berbagai kampus Indonesia
              </p>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="bg-[#1A3A9F] rounded-2xl p-6 space-y-4">
            <div class="w-12 h-12 bg-[#F5A623] rounded-xl" />
            <div>
              <p class="text-white font-bold text-lg">Upload Event</p>
              <p class="text-white/70 text-sm mt-1 leading-relaxed">
                Siapapun bisa mempromosikan event mereka
              </p>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="bg-[#1A3A9F] rounded-2xl p-6 space-y-4">
            <div class="w-12 h-12 bg-[#F5A623] rounded-xl" />
            <div>
              <p class="text-white font-bold text-lg">Daftar Event</p>
              <p class="text-white/70 text-sm mt-1 leading-relaxed">
                Daftar dan simpan event yang kamu inginkan langsung di akunmu
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ───────────────── FOOTER ───────────────── -->
    <footer class="bg-[#111827] px-6 py-5">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span class="text-white font-extrabold text-lg">NessUp!</span>
        <span class="text-white/50 text-sm text-center">
          © 2026 NessUp — Platform Event Mahasiswa
        </span>
        <nav class="flex gap-4 text-white/50 text-sm">
          <Link href="/contact" class="hover:text-white transition-colors">Kontak</Link>
          <span class="text-white/20">•</span>
          <Link href="/privacy" class="hover:text-white transition-colors">Privasi</Link>
        </nav>
      </div>
    </footer>

  </div>
</template>