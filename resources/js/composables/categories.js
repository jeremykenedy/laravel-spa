import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

export default function useCategories() {
    const categories = ref([])
    const categoryList = ref([])
    const category = ref({
        name: ''
    })

    const router = useRouter()
    const validationErrors = ref({})
    const isLoading = ref(false)
    const swal = inject('$swal')

    const getCategories = async (
        page = 1,
        search_id = '',
        search_title = '',
        search_global = '',
        order_column = 'created_at',
        order_direction = 'desc'
    ) => {
        axios.get('/api/categories?page=' + page +
            '&search_id=' + search_id +
            '&search_title=' + search_title +
            '&search_global=' + search_global +
            '&order_column=' + order_column +
            '&order_direction=' + order_direction)
            .then(response => {
                categories.value = response.data;
            })
    }

    const getCategory = async (id) => {
        axios.get('/api/categories/' + id)
            .then(response => {
                category.value = response.data.data;
            })
    }

    const storeCategory = async (category) => {
        if (isLoading.value) return;

        isLoading.value = true
        validationErrors.value = {}

        axios.post('/api/categories', category)
            .then(response => {
                router.push({name: 'categories.index'})
                swal({
                    icon: 'success',
                    title: 'Category saved successfully'
                })
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => isLoading.value = false)
    }

    const updateCategory = async (category) => {
        if (isLoading.value) return;

        isLoading.value = true
        validationErrors.value = {}

        axios.put('/api/categories/' + category.id, category)
            .then(response => {
                router.push({name: 'categories.index'})
                swal({
                    icon: 'success',
                    title: 'Category updated successfully'
                })
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => isLoading.value = false)
    }

    const deleteCategory = async (id) => {
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
                    axios.delete('/api/categories/' + id)
                        .then(response => {
                            getCategories()
                            router.push({name: 'categories.index'})
                            swal({
                                icon: 'success',
                                title: 'Category deleted successfully'
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

    const getCategoryList = async () => {
        axios.get('/api/category-list')
            .then(response => {
                categoryList.value = response.data.data;
            })
    }

    return {
        categoryList,
        categories,
        category,
        getCategories,
        getCategoryList,
        getCategory,
        storeCategory,
        updateCategory,
        deleteCategory,
        validationErrors,
        isLoading
    }
}
