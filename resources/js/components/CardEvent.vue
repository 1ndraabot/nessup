<script setup lang="ts">
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
    <div class="max-w-sm rounded-2xl overflow-hidden bg-White border border-Black-40 flex flex-col gap-5 text-Black p-4">
        <img v-if="image" :src="image" :alt="title" class="w-full h-full object-cover">

        <div class="flex gap-3">
            <span class="px-4 py-0.5 bg-Blue2 text-Blue font-medium rounded-full">{{ category }}</span>
            <span class="px-4 py-0.5 bg-Yellow1 text-Brown font-medium rounded-full">{{ price }}</span>
            <span class="px-4 py-0.5 bg-Blue2 text-Blue font-medium rounded-full">{{ type }}</span>
        </div>

        <div class="flex flex-col gap-2">
            <h3 class="font-semibold text-2xl">{{title}}</h3>
            <p>{{ organizer }}</p>
        </div>

        <div class="flex gap-5">
            <button @click="$emit('details')" class="w-full px-4 py-2 border border-Blue text-Blue rounded-md">
                Lihat Detail
            </button>
            <button @click="$emit('save')" class="w-full px-4 py-2 rounded-md bg-Blue font-bold text-white">
                Simpan
            </button>
        </div>
    </div>
</template>