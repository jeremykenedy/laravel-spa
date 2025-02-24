import { ref, reactive, inject } from 'vue'
import { useRouter } from "vue-router";
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { ABILITY_TOKEN } from '@casl/vue';
import { useAuthStore } from "@store/auth";

let user = reactive({
  name: '',
  email: '',
})

export default function useAuth() {
  const authStore = useAuthStore();
  const processing = ref(false)
  const success = ref(false)
  const validationErrors = ref({})
  const router = useRouter()
  const swal = inject('$swal')
  const ability = inject(ABILITY_TOKEN)

  const loginForm = reactive({
    email: '',
    password: '',
    remember: false
  })

  const forgotForm = reactive({
    email: '',
  })

  const resetForm = reactive({
    email: '',
    token: '',
    password: '',
    password_confirmation: ''
  })

  const registerForm = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const submitLogin = async () => {
      if (processing.value) return
      processing.value = true
      validationErrors.value = {}
      await axios.post('/login', loginForm)
          .then(async response => {
              await authStore.getUser()
              // await authStore.dispatch('auth/getUser')
              await loginUser()
              swal({
                  toast: true,
                  icon: 'success',
                  timer: 3000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                  title: 'Signed in successfully',
                  position: 'bottom-end',
              })
              await router.push({ name: 'dashboard' })
          })
          .catch(error => {
              if (error.response?.data) {
                  validationErrors.value = error.response.data.errors
              }
          })
          .finally(() => processing.value = false)
  }

  const submitRegister = async () => {
      if (processing.value) return
      processing.value = true
      validationErrors.value = {}
      await axios.post('/register', registerForm)
          .then(async response => {
              await axios.post('/login', {
                      email: registerForm.email,
                      password: registerForm.password,
                      remember: false
                  })
                  .then(async response => {
                      await authStore.getUser()
                      // await authStore.dispatch('auth/getUser')
                      await loginUser()
                      swal({
                          toast: true,
                          icon: 'success',
                          timer: 8000,
                          timerProgressBar: true,
                          showConfirmButton: false,
                          title: 'Registered successfully',
                          text: 'Welcome to your new account!',
                          position: 'bottom-end',
                      })
                      await router.push({ name: 'dashboard' })
                  })
                  .catch(error => {
                      if (error.response?.data) {
                          validationErrors.value = error.response.data.errors
                      }
                  })
                  .finally(() => processing.value = false)
          })
          .catch(error => {
              if (error.response?.data) {
                  validationErrors.value = error.response.data.errors
              }
          })
          .finally(() => processing.value = false)
  }

  const submitForgotPassword = async () => {
      if (processing.value) return

      processing.value = true
      validationErrors.value = {}

      await axios.post('/api/forget-password', forgotForm)
          .then(async response => {
              swal({
                  icon: 'success',
                  toast: true,
                  timer: 10000,
                  timerProgressBar: true,
                  title: 'We have emailed your password reset link! Please check your email inbox.',
                  showConfirmButton: false,
                  position: 'bottom-end',
              })
              success.value = true
              // await router.push({ name: 'dashboard' })
          })
          .catch(error => {
              if (error.response?.data) {
                  validationErrors.value = error.response.data.errors
              }
          })
          .finally(() => processing.value = false);
  }

  const dismissSuccess = async () => {
      success.value = false;
  }

  const submitResetPassword = async () => {
      if (processing.value) return

      processing.value = true
      validationErrors.value = {}

      await axios.post('/api/reset-password', resetForm)
          .then(async response => {
              swal({
                  icon: 'success',
                  title: 'Password successfully changed.',
                  showConfirmButton: false,
                  timer: 1500
              })
              await router.push({ name: 'auth.login' })
          })
          .catch(error => {
              if (error.response?.data) {
                  validationErrors.value = error.response.data.errors
              }
          })
          .finally(() => processing.value = false)
  }

  const loginUser = () => {
      user = authStore.user
      // Cookies.set('loggedIn', true)
      getAbilities()
  }

  const getUser = async () => {
      if (authStore.authenticated) {
          await authStore.getUser()
          await loginUser()
      }
  }

  const logout = async () => {
      if (processing.value) return
      processing.value = true
      await axios.post('/logout')
          .then(async response => {
              user.name = ''
              user.email = ''
              authStore.logout()
              await authStore.getUser()
          })
          .catch(error => {
              // swal({
              //     icon: 'error',
              //     title: error.response.status,
              //     text: error.response.statusText
              // })
          })
          .finally(() => {
              processing.value = false
              // Cookies.remove('loggedIn')
          })
  }

  const getAbilities = async() => {
      await axios.get('/api/abilities')
          .then(response => {
              const permissions = response.data
              const { can, rules } = new AbilityBuilder(createMongoAbility)

              can(permissions)

              ability.update(rules)
          })
  }

  const impersonateUser = async () => {
      //
  }

  const leaveImpersonatingUser = async () => {
      //
  }

  const verifyResend = async (payload) => {
    const res = await axios.post('/api/verify-resend', payload);
    if (res.status != 200) throw res;
    return res;
  }

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
      getAbilities,
      impersonateUser,
      leaveImpersonatingUser,
      success,
      dismissSuccess,
      verifyResend
  }
}
