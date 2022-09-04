<template>
  <div class="card w-full sm:w-full md:w-10/12">
    <div>
      <h1>Ajla Bazdar</h1>
      <h2>ID: 92I34092</h2>
    </div>
    <div class="flex flex-row justify-between items-end">
      <h2 class="w-1/2">Credit: 123 KM</h2>
      <div class="flex flex-col w-full items-end">
        <InputField class="w-1/3 mb-4" id="credit" label="Add credit" label-color="text-white" :is-required="true" v-model="card" />
        <Button class="w-1/3 flex justify-end" button-text="Save" />
      </div>
    </div>


  </div>
</template>
<script>
import InputField from "./InputField";
import Button from "./Button";
export default {
  components: {Button, InputField}
}
</script>

<style lang="scss" scoped>

</style>