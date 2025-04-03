import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import Swal from 'sweetalert2/dist/sweetalert2';

export default function useDarkMode() {
  const auth = useAuthStore();
  const isLoading = ref(false);

  const toggleDarkMode = (msg = false) => {
    if (isLoading.value) return;
    isLoading.value = true;
    if (auth.authenticated && auth.user && auth.user.id) {
      axios
        .post('/api/toggle-dark-mode')
        .then(({ data }) => {
          if (data.success) {
            auth.user.theme_dark = data.data;
            if (auth.user.theme_dark) {
              enableDarkMode(msg);
            } else {
              disableDarkMode(msg);
            }
          }
        })
        .catch((error) => {
          if (error.response?.data) {
            Swal.fire({
              toast: true,
              icon: 'error',
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
              title: 'Error Toggling Dark Mode ',
              position: 'bottom-end',
            });
          }
        })
        .finally(() => (isLoading.value = false));
    } else {
      if (localStorage.getItem('data-theme') == 'dark') {
        disableDarkMode(msg);
      } else {
        enableDarkMode(msg);
      }
      isLoading.value = false;
    }
  };

  const enableDarkMode = (msg = false) => {
    document.documentElement.className = 'dark';
    localStorage.setItem('data-theme', 'dark');
    if (msg) {
      Swal.fire({
        toast: true,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        title: 'Dark Mode Enabled',
        position: 'bottom-end',
      });
    }
  };

  const disableDarkMode = (msg = false) => {
    document.documentElement.className = 'light';
    localStorage.setItem('data-theme', 'light');
    if (msg) {
      Swal.fire({
        toast: true,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        title: 'Dark Mode Disabled',
        position: 'bottom-end',
      });
    }
  };

  return {
    toggleDarkMode,
    isLoading,
    enableDarkMode,
    disableDarkMode,
  };
}
