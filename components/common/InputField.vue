<template>
  <div>
    <label v-if="label" :for="id" :class="labelColor" class="block text-sm font-medium text-gray-700"> {{ label }}
      <span v-if="isRequired">*</span>
    </label>
    <div class="mt-1">
      <input :type="type" :id="id" v-model="data" @input="$emit('input', $event.target.value)" autocomplete="off" :placeholder="placeholder" :class="error ? 'focus:ring-red-500 focus:border-red-500 border-red-300' : 'focus:ring-cyan-500 focus:border-cyan-500 border-gray-300'" class="py-2 shadow-sm block w-full sm:text-sm rounded-md">
      <p class="mt-1 text-red-500 text-sm" v-if="error">{{error}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      required: false
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      default: 'text'
    },

    labelColor: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      required: false,
      type: String,
    },

  },
  data() {
    return {
      data: this.value
    }
  },
}
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>

