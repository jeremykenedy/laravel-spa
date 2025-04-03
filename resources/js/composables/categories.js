import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useToastStore } from '@store/toast';

export default function useCategories() {
  const toast = useToastStore();
  const categories = ref([]);
  const categoryList = ref([]);
  const category = ref({
    name: '',
  });

  const router = useRouter();
  const validationErrors = ref({});
  const isLoading = ref(false);
  const swal = inject('$swal');

  const getCategories = async (
    page = 1,
    search_id = '',
    search_title = '',
    search_global = '',
    order_column = 'created_at',
    order_direction = 'desc',
  ) => {
    return axios
      .get(
        '/api/categories?page=' +
          page +
          '&search_id=' +
          search_id +
          '&search_title=' +
          search_title +
          '&search_global=' +
          search_global +
          '&order_column=' +
          order_column +
          '&order_direction=' +
          order_direction,
      )
      .then((response) => {
        categories.value = response.data;
        return response.data;
      });
  };

  const getCategory = async (id) => {
    return axios.get('/api/categories/' + id).then((response) => {
      category.value = response.data.data;
      return response.data.data;
    });
  };

  const storeCategory = async (category) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    return axios
      .post('/api/categories', category)
      .then((response) => {
        router.push({ name: 'categories.index' });
        toast.success('Category saved successfully');
        return response;
      })
      .catch((error) => {
        if (error.response?.data) {
          validationErrors.value = error.response.data.errors;
        }
      })
      .finally(() => (isLoading.value = false));
  };

  const updateCategory = async (category) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    return axios
      .put('/api/categories/' + category.id, category)
      .then((response) => {
        router.push({ name: 'categories.index' });
        toast.success('Category updated successfully');
        return response;
      })
      .catch((error) => {
        if (error.response?.data) {
          validationErrors.value = error.response.data.errors;
        }
      })
      .finally(() => (isLoading.value = false));
  };

  const deleteCategory = async (item) => {
    return swal({
      title: `<strong>Delete ${item.name}?</strong>`,
      icon: 'warning',
      html: `Are you sure you want to <strong>Delete</strong> <em>${item.name}</em>?<br><br><h6>This will delete the category.<br>You won't be able to revert this action!</h6>`,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#FF0000',
      denyButtonText: 'Cancel',
      denyButtonColor: '#777777',
      timer: 20000,
      timerProgressBar: true,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        return axios
          .delete('/api/categories/' + item.id)
          .then((response) => {
            router.push({ name: 'categories.index' });
            toast.success('Category deleted successfully');
            return getCategories();
          })
          .catch((error) => {
            toast.error('Something went wrong');
          });
      }
    });
  };

  const getCategoryList = async () => {
    return axios.get('/api/category-list').then((response) => {
      categoryList.value = response.data.data;
      return response.data.data;
    });
  };

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
    isLoading,
  };
}
