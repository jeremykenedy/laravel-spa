<script setup>
import {inject, onMounted, ref} from "vue";
import axios from "axios";
const swal = inject('$swal')

const sessions = ref([])

const logOutOtherDevices = async () => {
    const { value: password } = await swal.fire({
        title: "Are you sure?",
        input: "password",
        inputPlaceholder: "Enter your current password",
        inputAttributes: {
            autocapitalize: "off",
            autocorrect: "off",
        },
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, log out!",
        confirmButtonColor: "#ef4444",
        cancelButtonText: "Cancel",
        reverseButtons: true,
    });

    if (password) {
        try {
            await axios.post("/api/logout-other-devices",{
                password: password
            });
            getBrowserSessions();
            swal.fire({
                icon: "success",
                title: "Logged out of other browser sessions.",
            });
        } catch (error) {
            swal.fire({
                icon: "error",
                title: "Something went wrong",
            });
        }
    }
};

const getBrowserSessions = (() => {
    axios.get('/api/browser-sessions').then(({data}) => {
        sessions.value = data;
    })
})

onMounted(() => {
    getBrowserSessions()
})
</script>

<template>
    <div class="container">
        <h2 class="text-center my-4">Browser Sessions</h2>
        <div class="row mb-2">
            <div class="card shadow-sm">
                <div class="card-body">
                    <p class="mb-3">
                        If necessary, you may logout of all of your other browser sessions across all of your devices.
                        Some of your recent sessions are listed below; however, this list may not be exhaustive. If you
                        feel your account has been compromised, you should also update your password.
                    </p>

                    <!-- Session List -->
                    <ul class="list-group list-group-flush mb-4">
                        <li v-for="session in sessions" class="list-group-item d-flex align-items-center">
                            <div class="flex-grow-1">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-display me-2" viewBox="0 0 16 16">
                                        <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4q0 1 .25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75Q6 13 6 12H2s-2 0-2-2zm1.398-.855a.76.76 0 0 0-.254.302A1.5 1.5 0 0 0 1 4.01V10c0 .325.078.502.145.602q.105.156.302.254a1.5 1.5 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.76.76 0 0 0 .254-.302 1.5 1.5 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.76.76 0 0 0-.302-.254A1.5 1.5 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145"/>
                                    </svg>
                                    <strong>{{ session?.device?.platform }} - {{ session?.device?.browser }}</strong></div>
                                <div class="text-muted small">{{ session?.ip_address }},
                                    <span v-if="session?.is_current_device" class="text-success">This device</span>
                                    <span v-else class="">Last active {{ session?.last_active }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <!-- Logout Button -->
                    <div class="d-grid">
                        <button
                            class="btn btn-dark"
                            type="button"
                            @click="logOutOtherDevices"
                        >
                            Logout Other Browser Sessions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
