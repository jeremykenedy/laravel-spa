<template>
    <div class="container">
        <div class="row g-5 mt-4">
            <div class="col-md-8">
            <h3 class="pb-4 mb-4 fst-italic border-bottom">
                {{ post?.title }}
            </h3>
            <p class="blog-post-meta">January 1, 2021 by <a href="#">{{ post?.user?.name}}</a></p>

            <article class="blog-post">
                <div v-for="image in post?.media">
                    <img :src="image.original_url" alt="image" class="img-fluid">
                </div>
                <div class="mt-4" v-html="post?.content"></div>
            </article>

            <nav class="blog-pagination" aria-label="Pagination">
                <a class="btn btn-outline-primary rounded-pill" href="#">Older</a>
                <a class="btn btn-outline-secondary rounded-pill disabled">Newer</a>
            </nav>

            </div>

            <div class="col-md-4">
                <div class="position-sticky" style="top: 2rem;">
                    <div class="p-4 mb-3 bg-light rounded">
                    <h4 class="fst-italic">About</h4>
                    <p class="mb-0">Customize this section to tell your visitors a little bit about your publication, writers, content, or something else entirely. Totally up to you.</p>
                    </div>

                    <div class="p-4">
                        <h4 class="fst-italic">Categories</h4>
                        <ol v-if="categories?.length > 0" class="list-unstyled">
                            <li v-for="category in categories" :key="category.id">
                                <router-link :to="{ name: 'category-posts.index', params: { id: category.id } }">{{ category.name }}</router-link>
                            </li>
                        </ol>
                    </div>
                    <!-- <div class="p-4">
                        <h4 class="fst-italic">Archives</h4>
                        <ol class="list-unstyled mb-0">
                            <li><a href="#">March 2021</a></li>
                            <li><a href="#">February 2021</a></li>
                            <li><a href="#">January 2021</a></li>
                            <li><a href="#">December 2020</a></li>
                            <li><a href="#">November 2020</a></li>
                            <li><a href="#">October 2020</a></li>
                            <li><a href="#">September 2020</a></li>
                            <li><a href="#">August 2020</a></li>
                            <li><a href="#">July 2020</a></li>
                            <li><a href="#">June 2020</a></li>
                            <li><a href="#">May 2020</a></li>
                            <li><a href="#">April 2020</a></li>
                        </ol>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";


    const post = ref();
    const categories = ref();
    const route = useRoute()

    onMounted(() => {
        axios.get('/api/get-post/' + route.params.id).then(({ data }) => {
            post.value = data
        })
        axios.get('/api/category-list').then(({ data }) => {
            categories.value = data.data
        })
    })
</script>
