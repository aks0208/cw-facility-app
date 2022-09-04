<template>
  <!-- This example requires Tailwind CSS v2.0+ -->


  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!--
      Background backdrop, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
   <div>
     <div @click="$emit('closeModal')" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

     <div class="fixed z-10 inset-0 overflow-y-auto">
       <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
         <transition
             enter-active-class="ease-out duration-300"
             enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
             enter-to-class="opacity-100 translate-y-0 sm:scale-100"
             leave-active-class="ease-in duration-200"
             leave-from-class="opacity-100 translate-y-0 sm:scale-100"
             leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
         >
           <!--
             Modal panel, show/hide based on modal state.

             Entering: "ease-out duration-300"
               From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
               To: "opacity-100 translate-y-0 sm:scale-100"
             Leaving: "ease-in duration-200"
               From: "opacity-100 translate-y-0 sm:scale-100"
               To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
           -->
           <div class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
             <slot />
           </div>
         </transition>
       </div>
     </div>
   </div>
    </transition>
  </div>

</template>

<script>
export default {
  props: {
    modalName: {
      type: String,
      required: true
    }
  }
}
</script>