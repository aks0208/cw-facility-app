<template>
  <div class="h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex flex-row items-center justify-center">
        <img class="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=cyan&shade=600" alt="Workflow">
        <p class="font-semibold text-cyan-600 ml-4 cursor-default text-lg">CarWash Facility</p>
      </div>

      <h2 class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Start using facilities</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-gradient-to-r from-cyan-500 to-green-300 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <InputField :error="errors.holder_number" label-color="text-white" label="Card holder number" v-model="holder_number"  id="card-id"/>
          </div>
          <div>
            <Button class="w-full" @action="authenticate()" button-text="Start" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
export default {
  components: {InputField, Button},
  data() {
    return {
      holder_number: '',
      errors: {
        holder_number: ''
      }
    }
  },
  methods: {
    async authenticate() {
      try {
        await this.$auth.loginWith("local", {
          data: {
            holder_number: this.holder_number
          },
        });
        await this.$router.push('/')

      } catch (error) {
        error.response.data.errors.map((err) => {
          Object.keys(this.errors).map((obj) => {
            if (err.field === obj) {
              this.errors[obj] = err.message.replaceAll('_', ' ');
            }
          });
        });

      }
    }
  }
}
</script>