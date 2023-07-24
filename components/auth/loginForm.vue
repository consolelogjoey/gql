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
            label="Password"
            class="my-3"
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
          width="80%"
          color="primary"
          elevation="0"
          large
          rounded
          @click="login"
          :loading="processing"
        >
          Sign In
        </v-btn>
      </v-card-actions>
      <v-card-actions class="d-flex justify-center">
        <v-btn
          outlined
          width="80%"
          color="primary"
          large
          rounded
          to="/auth/sign-up"
        >
          Sign Up
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: '',
      show1: false,
      processing: false,
      auth: {
        email: '',
        password: '',
      },
    }
  },

  methods: {
    login() {
      this.processing = true
      this.$fire.auth
        .signInWithEmailAndPassword(this.auth.email, this.auth.password)
        .catch(function (error) {
          alert(error.message)
        })
        .then((user) => {
          this.processing = false
          this.$router.push('/')
        })
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