<template>
    <div class="container">
        <h2 class="text-center my-4">Category Posts</h2>
        <div class="row mb-2">
            <div v-for="post in posts?.data" :key="post.id" class="col-md-6">
                <div
                    class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div class="col-auto d-none d-lg-block d-md-block">
                        <img :src="getImageUrl(post)" class="img-fluid"/>
                    </div>
                    <div class="col p-4 d-flex flex-column position-static">
                        <strong v-for="category in post.categories" class="d-inline-block mb-2 text-primary">
                            {{ category.name }}
                        </strong>
                        <h3 class="mb-0">{{ post.title }}</h3>
                        <div class="mb-1 text-muted">Nov 12</div>
                        <p class="card-text mb-auto">{{ post.content.substring(0, 90) + "..." }}</p>
                        <router-link :to="{ name: 'public-posts.details', params: { id: post.id } }"
                                     class="stretched-link">Continue reading
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue'
import {useRoute} from "vue-router";

const route = useRoute();
const posts = ref();

function getImageUrl(post) {
    let image
    if (post.resized_image.length > 0) {
        image = post.resized_image
    } else {
        image = post.original_image
    }
    return new URL(image, import.meta.url).href
}

onMounted(() => {
    axios.get('/api/get-category-posts/' + route.params.id).then(({data}) => {
        posts.value = data;
    })
})
</script>
