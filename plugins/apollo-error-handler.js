export default function(
    { graphQLErrors, networkError, operation, forward },
    nuxtContext
  ) {
    // TODO This doesn't work because of bug with nuxt-apollo I think
    // See: https://github.com/nuxt-community/apollo-module/issues/315
  
    // When this works, plan is to look for auth error, then try to do refresh token:
  
    console.log("Global error handler");
    console.log(graphQLErrors, networkError, operation, forward);
  }
  