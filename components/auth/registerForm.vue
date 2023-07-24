<template>
  <div class="centered">
    <v-card class="mx-auto" width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-1">
            <h3 class="my-6" align="center">Sign in</h3>
          </v-list-item-title>
          <v-text-field
            label="Email"
            class="my-3"
            v-model="auth.email"
            :rules="[rules.required, rules.email]"
            prepend-inner-icon="mdi-email"
            type="email"
            clearable
            required
            outlined
            hide-details="flase"
            rounded
          >
          </v-text-field>
          <v-text-field
            label="FullName"
            class="my-3"
            v-model="auth.name"
            :rules="[rules.required]"
            prepend-inner-icon="mdi-account"
            type="text"
            clearable
            required
            outlined
            hide-details="flase"
            rounded
          >
          </v-text-field>
          <v-text-field
            label="Password"
            class="my-3"
            :rules="[rules.required, rules.min]"
            v-model="auth.password"
            prepend-inner-icon="mdi-lock"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            required
            outlined
            @click:append="show1 = !show1"
            hide-details="flase"
            clearable
            rounded
          >
          </v-text-field>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions class="d-flex justify-center">
        <v-btn
          :loading="processing"
          width="80%"
          color="primary"
          elevation="0"
          large
          rounded
          @click="signUp"
        >
          submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { getFunctions, httpsCallable } from 'firebase/functions'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      processing: false,
      show1: false,
      error: '',
      roles: [],
      auth: {
        email: '',
        name: '',
        password: '',
      },
      rules: {
        required: (value) => !!value || 'ⓘ ກະລຸນາປ້ອນຂໍ້ມູນ.',
        counter: (value) => value.length <= 20 || 'Max 20 characters',
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        min: (value) => value.length >= 6 || 'Min 6 characters',
        
      },
    }
  },

  methods: {
    // login() {
    //   this.processing = true
    //   this.$fire.auth
    //     .signInWithEmailAndPassword(this.auth.email, this.auth.password)
    //     .catch(function (error) {
    //       alert(error.message)
    //     })
    //     .then((user) => {
    //       this.processing = false
    //       this.$router.push('/')
    //     })
    // },

    signUp() {
      try {
        if (
          this.auth.name == null ||
          this.auth.email == null ||
          this.auth.password == null
        ) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'fills is required',
          })
        }
        else {
          this.processing = true
          const functions = getFunctions()
          const registerUser = httpsCallable(functions, 'registerUser')
          registerUser({
            email: this.auth.email,
            password: this.auth.password,
            displayName: this.auth.name,
            userRole: "manager",
          })
          .then((result) => {
            result.data
            console.log('this.data :>> ',  result.data)
            this.process = false
            Swal.fire({
              icon: 'success',
              title: 'User created successfully!',
              showConfirmButton: true,
              confirmButtonText: 'Save',
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/auth/sign-in'
              }
            })
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped>
#centered {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
</style>