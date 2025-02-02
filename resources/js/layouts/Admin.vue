<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Laravel Vue Stater</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :to="{ name: 'posts.index' }" class="nav-link active" aria-current="page">
                            Posts
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'posts.create' }" class="nav-link">
                            Create Post
                        </router-link>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Hi, {{ user.name }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li><a class="dropdown-item" href="#">Setting</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" :class="{ 'opacity-25': processing }" :disabled="processing" href="javascript:void(0)" @click="logout">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container my-5">
        <h2 class="fw-semibold">
            {{ currentPageTitle }}
        </h2>
        <!-- Page Content -->
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
    import { computed } from "vue";
    import useAuth from "@/composables/auth";

    const { user, processing, logout } = useAuth();
    const currentPageTitle = computed(() => { return this.$route.meta.title})

</script>
