
// const actions = {
//     async onAuthStateChangedAction(state, {
//       authUser,
//     }) {
//       if (!authUser) {
//         state.commit('SET_USER', null)
//         this.$router.push({
//           path: '/auth/sign-in'
//         })
//       } else if (!authUser) {
//         state.commit('SET_USER', null)
//         this.$router.push({
//           path: '/auth/sign-up'
//         })
//       } else {
//         const {
//           uid,
//           email,
//           displayName,
//         } = authUser
//         state.commit('SET_USER', {
//           uid,
//           email,
//           displayName,
//         })
//       }
//     },
//   }
  
//   const mutations = {
//     SET_USER(state, user) {
//       state.user = user
//     },
//   }
  
//   function state() {
//     return ({
//       user: null,
//     })
//   }
  
//   const getters = {
//     setUser(state) {
//       state.user = user
//     },
    
//   }
  

//   export default {
//     state,
//     actions,
//     mutations,
//     getters
//   }
  