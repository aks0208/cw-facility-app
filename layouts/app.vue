<template>
  <div class="h-screen bg-gray-100">
    <Alert />
    <header class="pb-24 bg-gradient-to-r from-cyan-500 to-green-300">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="relative flex flex-wrap items-center justify-center">
          <a href="#" class="flex flex-row items-center justify-center py-5">
            <img class="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=cyan&shade=700" alt="Workflow">
            <p class="font-semibold text-cyan-700 ml-4 cursor-default text-lg">CarWash Facility</p>
          </a>
          <div class="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
            <div class="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
              <div class="hidden lg:block lg:col-span-2">
                <nav class="flex space-x-4">
                  <a href="/" class="text-white text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10" aria-current="page"> Home </a>

                  <a href="#" class="text-cyan-100 text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"> Profile </a>

                  <a href="#" class="text-cyan-100 text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"> Activities </a>

                  <a href="#" class="text-cyan-100 text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"> About </a>

                </nav>
              </div>
            </div>
          </div>

          <div class="absolute right-0 flex-shrink-0 lg:hidden">
            <!-- Mobile menu button -->
            <button type="button" class="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <!--
                Heroicon name: outline/bars-3

                Menu open: "hidden", Menu closed: "block"
              -->
              <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <!--
                Heroicon name: outline/x-mark

                Menu open: "block", Menu closed: "hidden"
              -->
              <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="lg:hidden">

        <div class="z-20 fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>

        <div class="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top">
          <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
            <div class="pt-3 pb-2">
              <div class="flex items-center justify-between px-4">
                <a href="#" class="flex flex-row items-center justify-center ">
                  <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=cyan&shade=700" alt="Workflow">
                  <p class="font-semibold text-cyan-700 ml-4 cursor-default text-md">CarWash Facility</p>
                </a>
                <div class="-mr-2">
                  <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon />
                  </button>
                  <!--                  <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                                      <span class="sr-only">Open menu</span>
                                      <Bars3Icon />
                                    </button>-->
                </div>
              </div>
              <div class="mt-3 px-2 space-y-1">
                <nuxt-link to="/" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">Home</nuxt-link>

                <a href="#" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">Profile</a>

                <a href="#" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">Activities</a>

                <a href="#" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">About</a>

              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
    <div :style="`height: calc(100vh - ${nuxtWrapperHeight}px)`" ref="nuxtWrapper" >
      <nuxt />
    </div>

<!--    <Footer ref="footer" />-->
  </div>
</template>
<script>
import Footer from "../components/common/Footer";
import XMarkIcon from "../components/icons/XMarkIcon";
import Alert from "../components/common/Alert";
export default {
  components: {Alert, XMarkIcon, Footer},
  name: 'TransactionId',
  middleware: ['authenticated'],
  data() {
    return {
      nuxtWrapperHeight: ''
    }
  },
  methods: {
    calcNuxtHeight() {
      this.nuxtWrapperHeight = this.$refs.nuxtWrapper.clientHeight > 800
          ? 'auto'
          : this.$refs.nuxtWrapper.clientHeight
    }
  },
  mounted () {
    this.calcNuxtHeight()
  },

}
</script>