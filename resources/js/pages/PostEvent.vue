<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import type { CalendarDate } from '@internationalized/date';
import { Calendar1Icon } from 'lucide-vue-next';
import { ref, computed } from "vue";
import InputError from '@/components/InputError.vue';
import PasswordInput from "@/components/PasswordInput.vue";;
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

    const startTime = ref('')
    
    const endTime = ref('')

    const startDate = ref<CalendarDate>();

    const endDate = ref<CalendarDate>();
    
    const formattedStartDate = computed(() => {
        if (!startDate.value) {
            return 'Tanggal Mulai'
        }

        return `${startDate.value.day}/${startDate.value.month}/${startDate.value.year}`
    });

    const formattedEndDate = computed(() => {
        if (!endDate.value) {
            return 'Tanggal Akhir'
        }

        return `${endDate.value.day}/${endDate.value.month}/${endDate.value.year}`
    });

const successMessage = ref("");

const form = useForm({
    namaEvent: "",
    kategori: "",
    organizer: "",
    price: "",
    deskripsi: "",
    banner: null as File | null,

    open_event: '',
    close_event: '',
    formatEvent: "",

    tipeEvent: "",
});

const previewImage = ref<string | null>(null);

const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement

    if (!target.files?.length) {
        return
    }

    const file = target.files[0]

    form.banner = file

    previewImage.value = URL.createObjectURL(file)
}

const handlePostEvent = () => {

    if (
        !startDate.value ||
        !endDate.value ||
        !startTime.value ||
        !endTime.value
    ) {
        alert('Lengkapi tanggal dan waktu event')
        return
    }

    const startDateString =
        `${startDate.value.year}-${String(startDate.value.month).padStart(2, '0')}-${String(startDate.value.day).padStart(2, '0')}`

    const endDateString =
        `${endDate.value.year}-${String(endDate.value.month).padStart(2, '0')}-${String(endDate.value.day).padStart(2, '0')}`

    form.open_event =
        `${startDateString} ${startTime.value}:00`

    form.close_event =
        `${endDateString} ${endTime.value}:00`

    successMessage.value = ''

    form.post('/post-event', {
        forceFormData: true,

        onSuccess: () => {
            successMessage.value = 'Upload Success'

            form.reset()

            previewImage.value = null

            startDate.value = undefined
            endDate.value = undefined

            startTime.value = ''
            endTime.value = ''
        }
    })
}
</script>

<template>
    <div>
        <nav class="bg-Sky-Blue flex p-6 text-White">
            <div class="flex flex-col w-screen">
                <div class="flex justify-between">
                    <div class="flex gap-10 items-center">
                        <h1 class="font-bold text-3xl">NessUp!</h1>
                    </div>
                    <h1 class="px-4 py-1 bg-Yellow text-Blue font-semibold rounded">{{ $page.props.auth.user.name }}</h1>
                </div>
            </div>
        </nav>

        <div class="p-10">
            <div>
                <h1 class="text-2xl font-semibold">Upload Event</h1>
                <p class="text-Black/50">Lengkapi semua langkah. Admin akan meninjau dalam 1×24 jam setelah kamu kirim.</p>
            </div>

            <div class="flex flex-col">
                <form @submit.prevent="handlePostEvent">
                    <div class="mt-5 px-6  border border-Black-40 rounded-xl">
                        <h2 class="font-semibold pb-2 pt-5">Informasi Dasar</h2>
                        <div class="flex flex-col gap-3 p-6 border border-Black-40 rounded-xl">
    
                            <div>
                                <Label class="pb-2">Nama Event</Label>
                                <Input 
                                    v-model="form.namaEvent"
                                    type="text"
                                    placeholder="Masukkan nama event"
                                />
                                <InputError :message="form.errors.namaEvent" />
                            </div>
                            
                            <div class="flex gap-4">
                                <div class="flex-1">
                                    <Label class="pb-2">Kategori</Label>
                                    
                                    <Select v-model="form.kategori">
                                        <SelectTrigger class="w-full">
                                            <SelectValue placeholder="Pilih Kategori" class="" />
                                        </SelectTrigger>
        
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All
                                            </SelectItem>
        
                                            <SelectItem value="seminar">
                                                Seminar
                                            </SelectItem>
        
                                            <SelectItem value="workshop">
                                                Workshop
                                            </SelectItem>
        
                                            <SelectItem value="kompetisi">
                                                Kompetisi
                                            </SelectItem>
        
                                            <SelectItem value="webinar">
                                                Webinar
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError :message="form.errors.kategori" />
                                </div>
        
                                <div class="flex-1">
                                    <Label class="pb-2">Penyelenggara</Label>
                                    <Input 
                                        v-model="form.organizer"
                                        type="text"
                                        placeholder="Masukkan nama penyelenggara event..."
                                    />
                                    <InputError :message="form.errors.organizer" />
                                </div>
        
                                <div class="flex-1">
                                    <Label class="pb-2">Harga event</Label>
                                    <Input 
                                        v-model="form.price"
                                        type="number"
                                        placeholder="Masukkan harga event..."
                                    />
                                    <InputError :message="form.errors.organizer" />
                                </div>
                            </div> 
    
                            <div>
                                <Label class="pb-2">Deskripsi Event</Label>
                                <Textarea 
                                    v-model="form.deskripsi"
                                    placeholder="Masukkan deskripsi event..."
                                    class="h-28 resize-none"
                                />
                                <InputError :message="form.errors.deskripsi" />
                            </div>
    
                            <div>
                                <Label class="pb-2">
                                    Upload Banner Event
                                </Label>
    
                                <label
                                    class="
                                        flex
                                        flex-col
                                        items-center
                                        justify-center
                                        w-full
                                        h-56
                                        border-2
                                        border-dashed
                                        rounded-lg
                                        cursor-pointer
                                        bg-gray-50
                                        hover:bg-gray-100
                                    "
                                >
                                    <template v-if="!previewImage">
                                        <span class="text-gray-500">
                                            Klik untuk upload gambar
                                        </span>
    
                                        <span class="text-sm text-gray-400">
                                            PNG, JPG, JPEG
                                        </span>
                                    </template>
    
                                    <img
                                        v-else
                                        :src="previewImage"
                                        alt="Preview"
                                        class="w-full h-full object-cover rounded-lg"
                                    >
    
                                    <input
                                        type="file"
                                        accept="image/*"
                                        class="hidden"
                                        @change="handleImageUpload"
                                    >
                                </label>
    
                                <InputError :message="form.errors.banner" />
                            </div>
                        </div>
                        
                        <h2 class="font-semibold pb-2 pt-5">Waktu Event</h2>
                        <div class="flex flex-col gap-3 p-6 border border-Black-40 rounded-xl">
                            <div class="grid grid-cols-2 gap-20">
                                <div class="space-y-2">
                                    <Label>Waktu Mulai</Label>
    
                                    <div class="flex gap-2">
    
                                        <div class="flex-1">
                                            <Popover>
                                                <PopoverTrigger as-child>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        class="w-full justify-start"
                                                    >
                                                        <Calendar1Icon class="mr-2 h-4 w-4 text-Black" />
                                                        {{ formattedStartDate }}
                                                    </Button>
                                                </PopoverTrigger>
        
                                                <PopoverContent class="w-auto p-0">
                                                    <Calendar
                                                        v-model="startDate"
                                                        initial-focus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
    
                                        <Input
                                            v-model="startTime"
                                            type="time"
                                            class="flex-1"
                                        />
                                    </div>
                                </div>
    
                                <div class="space-y-2">
                                    <Label>Waktu Selesai</Label>
    
                                    <div class="flex gap-2">
    
                                        <div class="flex-1">
                                            <Popover>
                                                <PopoverTrigger as-child>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        class="w-full justify-start"
                                                    >
                                                        <Calendar1Icon class="mr-2 h-4 w-4 text-Black" />
                                                        {{ formattedEndDate }}
                                                    </Button>
                                                </PopoverTrigger>
        
                                                <PopoverContent class="w-auto p-0">
                                                    <Calendar
                                                        v-model="endDate"
                                                        initial-focus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
    
                                        <Input
                                            v-model="endTime"
                                            type="time"
                                            class="flex-1"
                                        />
                                    </div>
                                </div>
    
                                
                            </div>
                            
                            <div class="flex flex-col gap-2">
                                <Label>Tipe Event</Label>
                                <div class="w-full">
                                    <Select v-model="form.tipeEvent">
                                        <SelectTrigger class="w-full">
                                            <SelectValue placeholder="Masukkan tipe event..." class="" />
                                        </SelectTrigger>
            
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All
                                            </SelectItem>
            
                                            <SelectItem value="offline">
                                                Offline
                                            </SelectItem>
            
                                            <SelectItem value="online">
                                                Online
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
    
                        <Button
                        class="my-5 bg-Sky-Blue w-full text-lg font-semibold py-6 hover:bg-Yellow hover:text-Sky-Blue"
                        >
                            Upload Event
                        </Button>
                    </div>
                    



                </form>
                
            </div>
        </div>
    </div>
</template>