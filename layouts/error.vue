<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <!--
    This example requires updating your template:

    ```
    <html class="h-full">
    <body class="h-full">
    ```
  -->
  <div class="h-screen pt-16 pb-12 flex flex-col bg-white">
    <main class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex-shrink-0 flex justify-center">
        <a href="#" class="flex flex-col items-center justify-center py-5">
          <img class="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=cyan&shade=600" alt="Workflow">
          <p class="font-semibold text-cyan-600 mt-2 cursor-default text-lg">CarWash Facility</p>
        </a>
      </div>
      <div class="py-16">
        <div class="text-center">
          <p class="text-base font-semibold text-cyan-600">{{error.statusCode}}</p>
          <h1 class="mt-2 text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">Oops</h1>
          <p class="mt-2 text-base text-gray-500">{{error.message}}</p>
          <div class="mt-6">
            <nuxt-link to="/" class="text-base font-medium text-cyan-600 hover:text-cyan-500">Go back home<span aria-hidden="true"> &rarr;</span></nuxt-link>
          </div>
        </div>
      </div>
    </main>
  </div>

</template>

<script>
export default {
  props: ['error'],
  data() {
    return {
      statuses: [
        {code: 400, message: 'Bad Request'},
        {code: 401, message: 'Not authorized'},
        {code: 403, message: 'Forbidden'},
        {code: 403, message: 'Forbidden'},
        {code: 404, message: 'Page not found'},
        {code: 405, message: 'Method not allowed'},
        {code: 500, message: 'Internal Server Error'},
        {code: 502, message: 'Bad Gateway'},
        {code: 511, message: 'Network Authentication Required'},
      ]
    }
  }
}
</script>