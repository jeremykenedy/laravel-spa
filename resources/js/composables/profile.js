import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import {useAuthStore} from "@/store/auth";
import Swal from 'sweetalert2/dist/sweetalert2';

export default function useProfile() {

    const profile = ref({
        name: '',
        email: '',
    })

    const store = useAuthStore()
    // const router = useRouter()
    const validationErrors = ref({})
    const isLoading = ref(false)
    // const swal = inject('$swal')

    const getProfile = async () => {
        profile.value = store.user
        // axios.get('/api/user')
        //     .then(({data}) => {
        //         profile.value = data.data;
        //     })
    }

    const updateProfile = async (profile) => {
        if (isLoading.value) return;

        isLoading.value = true
        validationErrors.value = {}

        axios.put('/api/user', profile)
            .then(({data}) => {
                if (data.success) {
                    store.user = data.data
                    // router.push({name: 'profile.index'})
                    Swal.fire({
                        icon: 'success',
                        title: 'Profile updated successfully'
                    })
                }
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => isLoading.value = false)
    }

    const toggleThemeMode = async () => {
        if (isLoading.value) return;
        isLoading.value = true;
        if (store.authenticated && store.user && store.user.id) {
            axios.post('/api/toggle-dark-mode')
                .then(({data}) => {
                    if (data.success) {
                        store.user.theme_dark = data.data
                        if (store.user.theme_dark) {
                          document.documentElement.className = 'dark';
                          localStorage.setItem("data-theme", "dark");
                        } else {
                          document.documentElement.className = 'light';
                          localStorage.setItem("data-theme", "light");
                        }
                        Swal.fire({
                            toast: true,
                            icon: 'success',
                            timer: 3000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            title: (store.user.theme_dark ? 'Dark' : 'Light') + ' Mode Activated',
                            position: 'bottom-end',
                        })
                    }
                })
                .catch(error => {
                    if (error.response?.data) {
                        validationErrors.value = error.response.data.errors
                    }
                })
                .finally(() => isLoading.value = false)
        } else {
            if (localStorage.getItem("data-theme") == 'dark') {
                document.documentElement.className = 'light';
                localStorage.setItem("data-theme", "light");
            } else {
                document.documentElement.className = 'dark';
                localStorage.setItem("data-theme", "dark");
            }
            isLoading.value = false;
        }
    }

    const updateTheme = async () => {
        //
    }

    return {
        profile,
        getProfile,
        updateProfile,
        validationErrors,
        isLoading,
        updateTheme,
        toggleThemeMode
    }
}
