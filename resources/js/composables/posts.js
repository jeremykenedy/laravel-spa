import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useToastStore } from '@store/toast';

export default function usePosts() {
  const toast = useToastStore();
  const posts = ref({});
  const post = ref({
    title: '',
    content: '',
    category_id: '',
    thumbnail: '',
  });
  const router = useRouter();
  const validationErrors = ref({});
  const isLoading = ref(false);
  const swal = inject('$swal');

  const getPosts = async (
    page = 1,
    search_category = '',
    search_id = '',
    search_title = '',
    search_content = '',
    search_global = '',
    order_column = 'created_at',
    order_direction = 'desc',
    rowsPerPage = 50,
  ) => {
    return axios
      .get(
        '/api/posts?page=' +
          page +
          '&search_category=' +
          search_category +
          '&search_id=' +
          search_id +
          '&search_title=' +
          search_title +
          '&search_content=' +
          search_content +
          '&search_global=' +
          search_global +
          '&order_column=' +
          order_column +
          '&order_direction=' +
          order_direction +
          '&per=' +
          rowsPerPage,
      )
      .then((response) => {
        posts.value = response.data;
        return response.data;
      });
  };

  const getPost = async (id) => {
    axios.get('/api/posts/' + id).then((response) => {
      post.value = response.data.data;
    });
  };

  const storePost = async (post) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    const serializedPost = new FormData();
    for (const item in post) {
      if (post.hasOwnProperty(item)) {
        serializedPost.append(item, post[item]);
      }
    }

    axios
      .post('/api/posts', serializedPost, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((response) => {
        router.push({ name: 'posts.index' });
        toast.success('Post created successfully');
      })
      .catch((error) => {
        if (error.response?.data) {
          validationErrors.value = error.response.data.errors;
          toast.error('Something went wrong');
        }
      })
      .finally(() => (isLoading.value = false));
  };

  const updatePost = async (post) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    axios
      .put('/api/posts/' + post.id, post)
      .then((response) => {
        router.push({ name: 'posts.index' });
        toast.success('Post updated successfully');
      })
      .catch((error) => {
        if (error.response?.data) {
          validationErrors.value = error.response.data.errors;
        }
        toast.error('Something went wrong');
      })
      .finally(() => (isLoading.value = false));
  };

  const deletePost = async (post) => {
    return swal({
      title: `<strong>Delete ${post.title}?</strong>`,
      icon: 'warning',
      html: `Are you sure you want to <strong>Delete</strong> <em>${post.title}</em>?<br><br><h6>This will delete the post.<br>You won't be able to revert this action!</h6>`,
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
          .delete('/api/posts/' + post.id)
          .then((response) => {
            toast.success('Post deleted successfully');
            return getPosts();
            // router.push({name: 'posts.index'})
          })
          .catch((error) => {
            toast.error('Something went wrong');
          });
      }
    });
  };

  return {
    posts,
    post,
    getPosts,
    getPost,
    storePost,
    updatePost,
    deletePost,
    validationErrors,
    isLoading,
  };
}
