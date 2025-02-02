import { ref, inject,markRaw } from 'vue'
import { useRouter } from 'vue-router'

export default function usePermissions() {
    const permissions = ref([])
    const allPermission = ref([])
    const permission = ref({
        name: ''
    })

    const router = useRouter()
    const validationErrors = ref({})
    const isLoading = ref(false)
    const swal = inject('$swal')

    const getPermissions = async (
        page = 1,
        search_id = '',
        search_title = '',
        search_global = '',
        order_column = 'created_at',
        order_direction = 'desc'
    ) => {
        axios.get('/api/permissions?page=' + page +
            '&search_id=' + search_id +
            '&search_title=' + search_title +
            '&search_global=' + search_global +
            '&order_column=' + order_column +
            '&order_direction=' + order_direction)
            .then(response => {
                permissions.value = response.data;
            })
    }
    const getAllPermissions = async () => {
        axios.get('/api/permissions/')
            .then(response => {
                allPermission.value = response.data.data;
            })
    }
    const getPermission = async (id) => {
        axios.get('/api/permissions/' + id)
            .then(response => {
                permission.value = response.data.data;
            })
    }

    const storePermission = async (permission) => {
        if (isLoading.value) return;

        isLoading.value = true
        validationErrors.value = {}

        axios.post('/api/permissions', permission)
            .then(response => {
                router.push({name: 'permissions.index'})
                swal({
                    icon: 'success',
                    title: 'Permission saved successfully'
                })
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => isLoading.value = false)
    }

    const updatePermission = async (permission) => {
        if (isLoading.value) return;

        isLoading.value = true
        validationErrors.value = {}

        axios.put('/api/permissions/' + permission.id, permission)
            .then(response => {
                router.push({name: 'permissions.index'})
                swal({
                    icon: 'success',
                    title: 'Permission updated successfully'
                })
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => isLoading.value = false)
    }

    const deletePermission = async (id) => {
        swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#ef4444',
            timer: 20000,
            timerProgressBar: true,
            reverseButtons: true
        })
            .then(result => {
                if (result.isConfirmed) {
                    axios.delete('/api/permissions/' + id)
                        .then(response => {
                            getRoles()
                            router.push({name: 'permissions.index'})
                            swal({
                                icon: 'success',
                                title: 'Permission deleted successfully'
                            })
                        })
                        .catch(error => {
                            swal({
                                icon: 'error',
                                title: 'Something went wrong'
                            })
                        })
                }
            })
    }

    return {
        permissions,
        allPermission,
        permission,
        getAllPermissions,
        getPermissions,
        getPermission,
        storePermission,
        updatePermission,
        deletePermission,
        validationErrors,
        isLoading
    }
}
