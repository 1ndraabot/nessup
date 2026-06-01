<template>

    <div class="min-h-screen bg-slate-100 p-8">

        <h1 class="text-3xl font-bold mb-8">
            Event List
        </h1>

        <div class="grid gap-6">

            <div
                v-for="event in events"
                :key="event.id"
                class="bg-white p-6 rounded-xl shadow"
            >

                <h2 class="text-2xl font-semibold">
                    {{ event.name }}
                </h2>

                <p class="text-slate-600 mt-3">
                    {{ event.description }}
                </p>

                <div class="mt-5 text-sm text-slate-500">

                    <p>
                        Open:
                        {{ event.open_event }}
                    </p>

                    <p>
                        Close:
                        {{ event.close_event }}
                    </p>

                    <p class="mt-2">
                        Organizer:
                        <span class="font-semibold">
                            {{ event.organizer.name }}
                        </span>
                    </p>

                </div>

            </div>

        </div>

    </div>

</template>

<script setup lang="ts">

interface Organizer {

    id: number;
    name: string;
    email: string;
}

interface Event {

    id: number;
    name: string;
    description: string;
    open_event: string;
    close_event: string;
    organizer: Organizer;
}

defineProps<{
    events: Event[]
}>();

</script>