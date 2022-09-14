<template>
  <div>
    <div>
      <div class="mt-3 text-center sm:mt-5">
        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Are you sure you want this {{ item }}?</h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">After confirmation, {{ totalPrice }} KM will be deducted from your account, and you can start the process.</p>
        </div>
      </div>
    </div>
    <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
      <Button class="w-full" @action="$emit('confirm')" button-text="Confirm" />
      <Button @action="$emit('cancel')" :is-primary="false" button-text="Cancel" />
    </div>
  </div>
</template>

<script>
import Button from "./Button";
export default {
  components: {Button},
  props: {
    totalPrice: Number,
    item: String
  }
}
</script>