<script setup lang="ts">

    import { Link, router } from '@inertiajs/vue3'
    import type { CalendarDate } from '@internationalized/date'
    import { Calendar1Icon, CalendarIcon } from 'lucide-vue-next';
    import { ref, computed } from 'vue'
    import CardEvent from '@/components/CardEvent.vue';
    import { Button } from '@/components/ui/button';
    import { Calendar } from '@/components/ui/calendar';
    import { Input } from '@/components/ui/input';
    import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    
    const props = defineProps<{
        events?: {
            data: any[]
        },
        filters?: {
            search?: string
            category?: string
            type?: string
            start_date?: string
            end_date?: string
        }
    }>()

    const category = ref(props.filters?.category ?? '');

    const type = ref(props.filters?.type ?? '')

    const selectedCheckCategory = ref<string[]>([])

    const checkCategory = [
        'Seminar', 
        'Workshop', 
        'Kompetisi', 
        'Webinar'
    ]

    const toggleCheckCategory = (checkCategory:string) => {
        const index = selectedCheckCategory.value.indexOf(checkCategory)

        if (index == -1){
            selectedCheckCategory.value.push(checkCategory)
        } else {
            selectedCheckCategory.value.splice(index, 1)
        }
    }
    
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    

    const search = ref(props.filters?.search ?? '')

    const handleSearch = () => {
        router.get(
            '/explore',
            {
                search: search.value,
                category:
                    category.value === 'all'
                        ? null
                        : category.value,

                type:
                    type.value === 'all'
                        ? null
                        : type.value,

                start_date: startDate.value
                    ? `${startDate.value.year}-${String(startDate.value.month).padStart(2,'0')}-${String(startDate.value.day).padStart(2,'0')}`
                    : null,

                end_date: endDate.value
                    ? `${endDate.value.year}-${String(endDate.value.month).padStart(2,'0')}-${String(endDate.value.day).padStart(2,'0')}`
                    : null,
            },
            {
                preserveState: true,
                replace: true,
            }
        )
    }

    const handleDetail = (id: number) => {
        router.get(`/explore/${id}`)
    }
</script>

<template>
    <div class="text-White">
        <nav class="bg-Sky-Blue flex p-6">
            <div class="flex flex-col w-screen">
                <div class="flex justify-between">
                    <div class="flex gap-10 items-center">
                        <h1 class="font-bold text-3xl">NessUp!</h1>
                        <div class="flex gap-5">
                            <Link href="/dashboard" class="text-xl hover:underline">Beranda</Link>
                            <Link href="/explore" class="font-semibold text-Yellow text-xl">Explore</Link>
                            <Link href="/event-saya" class="text-xl hover:underline">Event Saya</Link>
                        </div>
                    </div>
                    <h1 class="px-4 py-1 bg-Yellow text-Blue font-semibold rounded">{{ $page.props.auth.user.name }}</h1>
                </div>


                <div class="min-w-full pt-6 flex flex-col gap-2">
                    <h1 class="font-medium">Explore Event</h1>
                    <div class="flex gap-2 items-stretch w-full">
                        <Input
                            v-model="search"
                            @keyup.enter="handleSearch"
                            type="text"
                            placeholder="Search event..."
                            class="bg-Black-30/20 border border-White/50 placeholder:text-White/75"
                        />
                        
                        <Select v-model="category">
                            <SelectTrigger class="bg-Black-30/20 border border-White/50 [&>svg]:text-White">
                                <SelectValue placeholder="Pilih Kategori" class="text-White/75" />
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
                                    Kompetisi
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Select v-model="type">
                            <SelectTrigger class="bg-Black-30/20 border border-White/50 [&>svg]:text-White">
                                <SelectValue placeholder="Tipe Event" class="text-White/75" />
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

                        <Popover>
                            <PopoverTrigger as-child>
                                <Button
                                    variant="outline"
                                    class="bg-Black-30/20 border border-White/50 text-White/75 min-w-[180px] justify-start"
                                >
                                    <Calendar1Icon class="mr-2 h-4 w-4 text-White/75" />
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

                        <Popover>
                            <PopoverTrigger as-child>
                                <Button
                                    variant="outline"
                                    class="bg-Black-30/20 border border-White/50 text-White/75 min-w-[180px] justify-start"
                                >
                                    <Calendar1Icon class="mr-2 h-4 w-4 text-White/75" />
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

                        <Button 
                            type="submit"
                            @click="handleSearch"
                            class="text-Sky-Blue bg-Yellow px-7 text-md font-semibold hover:font-bold hover:text-lg hover:bg-Yellow"
                        > 
                            Search
                        </Button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- <div class="flex flex-wrap gap-2 p-10">
            <Button
                v-for="category in checkCategory"
                :key="category"
                @click="toggleCheckCategory(category)"
                :class="
                    selectedCheckCategory.includes(category)
                    ? 'px-5 rounded-full bg-Sky-Blue text-White hover:bg-blue-900' 
                    : 'px-5 rounded-full bg-White text-Sky-Blue hover:bg-Sky-Blue hover:text-White'
                "
            >
                {{ category }}
            </Button>
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