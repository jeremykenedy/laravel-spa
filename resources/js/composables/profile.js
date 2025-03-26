import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/store/auth";
import { useToastStore } from "@store/toast";
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
    const toast = useToastStore();

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
                    toast.success('Profile updated successfully');
                }
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => isLoading.value = false)
    }

    return {
        profile,
        getProfile,
        updateProfile,
        validationErrors,
        isLoading,
    }
}
