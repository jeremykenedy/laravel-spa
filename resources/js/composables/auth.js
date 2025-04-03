import { ref, reactive, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toast';
import Swal from 'sweetalert2/dist/sweetalert2';

let user = reactive({
  name: '',
  email: '',
});

export default function useAuth() {
  const authStore = useAuthStore();
  const toast = useToastStore();
  const processing = ref(false);
  const success = ref(false);
  const validationErrors = ref({});
  const router = useRouter();
  const swal = inject('$swal');

  const loginForm = reactive({
    email: '',
    password: '',
    remember: false,
  });

  const forgotForm = reactive({
    email: '',
  });

  const resetForm = reactive({
    email: '',
    token: '',
    password: '',
    password_confirmation: '',
  });

  const registerForm = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submitLogin = async () => {
    if (processing.value) return;
    processing.value = true;
    validationErrors.value = {};
    await axios
      .post('/login', loginForm)
      .then(async (response) => {
        await authStore.getUser();
        await loginUser();
        toast.success('Signed in successfully');
        await router.push({ name: 'dashboard' });
      })
      .catch((error) => {
        if (error.response?.data) {
          validationErrors.value = error.response.data.errors;
        }
      })
      .finally(() => (processing.value = false));
  };

  const submitRegister = async () => {
    if (processing.value) return;
    processing.value = true;
    validationErrors.value = {};
    await axios
      .post('/register', registerForm)
      .then(async (response) => {
        await axios
          .post('/login', {
            email: registerForm.email,
            password: registerForm.password,
            remember: false,
          })
          .then(async (response) => {
            await authStore.getUser();
            await loginUser();
            toast.successWithTitle({
              title: 'Registered successfully',
              message: 'Welcome to your new account!',
              time: 8000,
            });
            await router.push({ name: 'dashboard' });
          })
          .catch((error) => {
            if (error.response?.data) {
              validationErrors.value = error.response.data.errors;
            }
          })
          .finally(() => (processing.value = false));
      })
      .catch((error) => {
        if (error.response?.data) {
          validationErrors.value = error.response.data.errors;
        }
      })
      .finally(() => (processing.value = false));
  };

  const submitForgotPassword = async () => {
    if (processing.value) return;
    processing.value = true;
    validationErrors.value = {};
    await axios
      .post('/api/forget-password', forgotForm)
      .then(async (response) => {
        toast.success('We have emailed your password reset link! Please check your email inbox.', 10000);
        success.value = true;
        // await router.push({ name: 'dashboard' })
      })
      .catch((error) => {
        if (error.response?.data) {
          validationErrors.value = error.response.data.errors;
        }
      })
      .finally(() => (processing.value = false));
  };

  const dismissSuccess = async () => {
    success.value = false;
  };

  const submitResetPassword = async () => {
    if (processing.value) return;
    processing.value = true;
    validationErrors.value = {};
    await axios
      .post('/api/reset-password', resetForm)
      .then(async (response) => {
        toast.success('Password successfully changed.');
        await router.push({ name: 'auth.login' });
      })
      .catch((error) => {
        if (error.response?.data) {
          validationErrors.value = error.response.data.errors;
        }
      })
      .finally(() => (processing.value = false));
  };

  const verifyResend = async (payload) => {
    const res = await axios.post('/api/verify-resend', payload);
    if (res.status != 200) throw res;
    return res;
  };

  const loginUser = () => {
    user = authStore.user;
    // Cookies.set('loggedIn', true);
  };

  const getUser = async () => {
    if (authStore.authenticated) {
      await authStore.getUser();
      await loginUser();
    }
  };

  const logout = async () => {
    if (processing.value) return;
    processing.value = true;
    await axios
      .post('/logout')
      .then(async (response) => {
        user.name = '';
        user.email = '';
        authStore.logout();
        await authStore.getUser();
      })
      .catch((error) => {
        toast.error('An error occurred.');
      })
      .finally(() => {
        processing.value = false;
        // Cookies.remove('loggedIn')
      });
  };

  const impersonateUser = async (payload) => {
    await axios
      .post(`/api/impersonate/take/${payload.user.id}`)
      .then(async (res) => {
        if (res && res.data && res.data.data && res.data.data.token) {
          authStore.logout();
          authStore.setWorkingToken(res.data.data);
          await authStore.getUserByToken({ token: res.data.data.token });
          toast.successWithTitle({
            title: 'Stealth mode activated',
            message: 'You are now acting as ' + authStore.user.name,
          });
        } else {
          toast.error('An error occurred, you are still yourself.');
        }
      })
      .catch((err) => {
        toast.error('An error occurred, you are still yourself.');
        throw err.response;
      });
  };

  const leaveImpersonatingUser = async () => {
    await axios
      .post(`/api/impersonate/leave`)
      .then(async (res) => {
        if (res && res.data && res.data.data && res.data.data.token) {
          authStore.logout();
          authStore.setWorkingToken({
            token: res.data.data.token,
            impersonatorToken: {
              plainTextToken: null,
            },
          });
          await authStore.getUserByToken({ token: res.data.data.token });
          toast.success('You wake up and realize it was all dream!');
        } else {
          toast.error('An error occurred, you are still are not yourself!');
        }
      })
      .catch((err) => {
        toast.error('An error occurred, you are still are not yourself!');
        throw err.response;
      });
  };

  return {
    loginForm,
    registerForm,
    forgotForm,
    resetForm,
    validationErrors,
    processing,
    submitLogin,
    submitRegister,
    submitForgotPassword,
    submitResetPassword,
    user,
    getUser,
    logout,
    impersonateUser,
    leaveImpersonatingUser,
    success,
    dismissSuccess,
    verifyResend,
  };
}
