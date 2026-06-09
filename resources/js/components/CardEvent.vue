<script setup lang="ts">
import { Button } from './ui/button';

    defineProps ({
        image: {type: String, default: null},
        title: {type: String, required: true},
        category: {type: String, required: true},
        price: {type: String, required: true},
        type: {type: String, required: true},
        organizer: {type: String, required: true},
    })

    defineEmits (['details', 'save'])
</script>

<template>
    <div class="w-full rounded-2xl overflow-hidden bg-White border border-Black-40 flex flex-col gap-5 text-Black p-4">
        <img v-if="image" :src="image" :alt="title" class="w-full h-48 rounded-xl object-cover">

        <div class="flex gap-3">
            <span class="px-4 py-0.5 bg-Blue2 text-Blue font-medium rounded-full">{{ category }}</span>
            <span class="px-4 py-0.5 bg-Yellow1 text-Brown font-medium rounded-full">{{ price }}</span>
            <span class="px-4 py-0.5 bg-Blue2 text-Blue font-medium rounded-full">{{ type }}</span>
        </div>

        <div class="flex flex-col gap-2">
            <h3 class="font-semibold text-2xl">{{title}}</h3>
            <p>{{ organizer }}</p>
        </div>

        <div class="flex gap-5 max-w-full">
            <Button @click="$emit('details')" class="flex-1 px-4 py-2 font-medium border-2 bg-white border-Sky-Blue text-Sky-Blue rounded-md hover:bg-Sky-Blue hover:text-White hover:underline">
                Lihat Detail
            </Button>
            
            <Button @click="$emit('save')" class="flex-1 px-4 py-2 rounded-md bg-Sky-Blue font-bold text-white hover:bg-Yellow hover:text-Sky-Blue">
                Simpan
            </Button>
        </div>
    </div>
</template>