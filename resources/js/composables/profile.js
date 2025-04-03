import { ref, inject } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useToastStore } from '@store/toast';

export default function useProfile() {
  const profile = ref({
    name: '',
    email: '',
  });

  const store = useAuthStore();
  const validationErrors = ref({});
  const isLoading = ref(false);
  const toast = useToastStore();

  const getProfile = async () => {
    profile.value = store.user;
    // axios.get('/api/user')
    //   .then(({data}) => {
    //       profile.value = data.data;
    //   })
  };

  const updateProfile = async (profile) => {
    if (isLoading.value) return;
    isLoading.value = true;
    validationErrors.value = {};
    axios
      .put('/api/user', profile)
      .then(({ data }) => {
        if (data.success) {
          store.user = data.data;
          toast.success('Profile updated successfully');
        }
      })
      .catch((error) => {
        if (error.response?.data) {
          validationErrors.value = error.response.data.errors;
        }
      })
      .finally(() => (isLoading.value = false));
  };

  const updatePassword = async (payload) => {
    const res = await axios.patch('/api/password', payload);
    if (
      res.status == 200 &&
      res &&
      res.data &&
      res.data.message &&
      res.data.message == 'Password Updated Successfully'
    ) {
      return 'Success';
    }
    throw res.response;
  };

  return {
    profile,
    getProfile,
    updateProfile,
    validationErrors,
    isLoading,
    updatePassword,
  };
}
