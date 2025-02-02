<template>
    <nav class="navbar navbar-expand-lg sticky-top flex-md-nowrap shadow-sm" style="background-color: #e3f2fd;">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 nuxt-link-active mini">
                <span>Laravel Vue Stater</span>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <!-- <li class="nav-item">
                        <router-link :to="{ name: 'posts.index' }" class="nav-link active" aria-current="page">
                            Posts
                        </router-link>
                    </li> -->
                    <LocaleSwitcher/>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                           aria-expanded="false">
                            Hi, {{ user.name }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm">
                            <li>
                                <router-link :to="{ name: 'profile.index' }" class="dropdown-item">Profile</router-link>
                            </li>
                            <li><a class="dropdown-item" href="#">Setting</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" :class="{ 'opacity-25': processing }" :disabled="processing"
                                   href="javascript:void(0)" @click="logout">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import {computed} from "vue";
import useAuth from "@/composables/auth";
import LocaleSwitcher from "../../components/LocaleSwitcher.vue";
import {useAuthStore} from "@/store/auth";

const auth = useAuthStore()

const user = computed(() => auth.user)
const {processing, logout} = useAuth();
</script>

<style scoped>

</style>
