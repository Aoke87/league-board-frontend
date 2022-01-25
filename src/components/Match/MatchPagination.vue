<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const selectablePages = [1, 2, 3];
const emit = defineEmits(['activatePage'])
let activePage = ref(0);

function changePage(page: number) {
    console.log('chaning page', page)
    if (page < 0 || page > 10) { return; }
    activePage.value = page
    emit('activatePage', page);
}
</script>

<template>
    <div
        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    >
        <div class="flex-1 flex justify-between sm:hidden">
            <a
                v-on:click.prevent="changePage(activePage - 1)"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >Previous</a>
            <a
                v-on:click.prevent="changePage(activePage + 1)"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >Next</a>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-700">
                    Showing
                    <span class="font-medium">{{ (activePage * 10) + 1 }}</span>
                    to
                    <span class="font-medium">{{ (activePage * 10) + 10 }}</span>
                    of
                    <span class="font-medium">99+</span>
                    results
                </p>
            </div>
            <div>
                <nav
                    class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                >
                    <a
                        v-on:click.prevent="changePage(activePage - 1)"
                        href="#"
                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        <span class="sr-only">Previous</span>
                        <svg
                            class="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </a>
                    <a
                        v-for="page in selectablePages"
                        v-on:click.prevent="changePage(page - 1)"
                        :key="page"
                        href="#"
                        aria-current="page"
                        class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        :class="{ 'z-10 bg-blue-50 border-blue-500 text-blue-500': activePage === page - 1 }"
                    >{{ page }}</a>
                    <template v-if="activePage < 3">
                        <span
                            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >...</span>
                    </template>
                    <template v-else>
                        <span
                            v-if="activePage !== 3"
                            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >...</span>
                        <span
                            class="z-10 bg-blue-50 border-blue-500 text-blue-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >{{ activePage + 1 }}</span>
                    </template>
                    <a
                        v-on:click.prevent="changePage(activePage + 1)"
                        class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        <span class="sr-only">Next</span>
                        <svg
                            class="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </a>
                </nav>
            </div>
        </div>
    </div>
</template>

