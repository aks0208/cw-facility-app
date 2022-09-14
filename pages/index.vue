<template>

    <main class="-mt-24 pb-8">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 class="sr-only">Profile</h1>
        <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-2 lg:gap-8">
          <div class="grid grid-cols-1 gap-4 lg:col-span-2">
            <div class="sm:flex sm:flex-col md:flex-row md:w-full">
              <section class="mb-4 sm:w-full sm:mb-4 md:mb-0 md:w-2/3" aria-labelledby="profile-overview-title">
                <div class="rounded-lg bg-white overflow-hidden shadow">
                  <h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>
                  <div class="bg-white p-6 pb-8">
                    <div class="sm:flex sm:items-center sm:justify-between">
                      <div class="sm:flex sm:space-x-5">
                        <div class="flex-shrink-0">
                          <img class="mx-auto h-20 w-20 rounded-full border-2 border-gray-200" src="/avatar.jpeg" alt="">
                        </div>
                        <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                          <p class="text-sm font-medium text-gray-600">Welcome back,</p>
                          <p class="text-xl font-bold text-gray-900 sm:text-2xl">{{$auth.user.first_name}} {{$auth.user.last_name}}</p>
                          <p class="text-sm font-medium text-gray-600">{{ $auth.user.cards[0].card.loyalty.name }} loyalty</p>
                        </div>
                      </div>
                      <div class="mt-5 flex justify-center sm:mt-0">
                        <Button @action="$auth.logout(); $router.push('login')" button-text="Log out" :is-primary="false" />
                      </div>
                    </div>
                  </div>

                </div>
              </section>
              <div class="sm:flex sm:w-full md:w-1/3">
                <!-- Announcements -->
                <section class="w-full sm:ml-0 md:ml-4 " aria-labelledby="announcements-title">
                  <div class="overflow-hidden rounded-lg bg-white shadow">
                    <div class="p-6">
                      <div class="flex flex-row items-center sm:flex sm:flex-row sm:items-center sm:w-full">
                        <div class="w-1/2">
                          <h2 class="text-base font-medium text-gray-900" id="announcements-title">Credit</h2>
                          <p class="text-sm font-medium text-gray-600">{{$auth.user.cards[0].card.balance}} KM</p>
                          <div class="relative flex items-start mt-3">
                            <div class="flex h-5 items-center">
                              <input v-model="autoCharge" @change="updateAutoCharge($event.target.checked)" id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500">
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="comments" class="font-medium text-gray-700">Auto-charge</label>

                            </div>
                          </div>
                        </div>
                        <div>
                          <InputField type="number" :error="errors.balance" placeholder="3.20" v-model="amountToUpdate" id="balance" />
                          <Button @action="updateBalance()" class="w-full mt-2" button-text="Buy more credit" />
                        </div>

                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <section aria-labelledby="quick-links-title">
              <div class="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0">
                <div class="bg-white">
                  <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div class="flex items-center justify-center space-x-4 flex-col">
                      <h2 class="text-3xl font-bold text-gray-900">Choose program</h2>
                      <p class="mt-4 text-md text-gray-500 text-center max-w-3xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus et netus et. Lectus vestibulum mattis. Fringilla ut morbi tincidunt augue interdum velit. Quisque egestas diam in arcu cursus euismod quis viverra. Volutpat maecenas volutpat blandit aliquam etiam. Adipiscing commodo elit at imperdiet dui accumsan sit amet. </p>
                    </div>
                    <div class="mt-12 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
                      <div v-if="$fetchState.pending">Preparing programs...</div>
                      <div v-else v-for="(program, i) in programs" @click="prepareFacility(program, program.steps, program.price)" :key="i" class="relative group">
                        <div class="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
                          <img :src="`/${program.img_path}`" alt="Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background." class="object-center object-cover">
                          <div class="flex items-end opacity-0 p-4 group-hover:opacity-100" aria-hidden="true">
                            <div class="w-full bg-white bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md text-sm font-medium text-gray-900 text-center">Select</div>
                          </div>
                        </div>
                        <div class="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8">
                          <h3>
                            <a href="#">
                              <span aria-hidden="true" class="absolute inset-0"></span>
                              {{ program.name }}
                            </a>
                          </h3>
                          <p>{{program.price}} KM</p>
                        </div>
                        <p class="mt-1 text-sm text-gray-500">{{ program.description }}</p>
                      </div>

                    </div>
                  </div>
                  <div class="relative">
                    <div class="absolute inset-0 flex items-center px-4 sm:px-6 lg:px-8">
                      <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                      <span class="px-4 bg-white text-gray-500"> Or </span>
                    </div>
                  </div>
                  <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div class="flex items-center justify-center space-x-4 flex-col">
                      <h2 class="text-3xl font-bold text-gray-900">Combine steps</h2>
                      <p class="mt-4 text-sm text-gray-500 text-center max-w-3xl">Lectus vestibulum mattis ullamcorper velit sed ullamcorper. Fringilla ut morbi tincidunt augue interdum velit. Quisque egestas diam in arcu cursus euismod quis viverra. Volutpat maecenas volutpat blandit aliquam etiam. Adipiscing commodo elit at imperdiet dui accumsan sit amet. </p>

                    </div>
                    <div class="max-w-2xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
                      <div class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-5 lg:gap-x-8">
                        <div v-if="$fetchState.pending">Preparing steps...</div>
                        <div v-else v-for="(step, i) in steps"
                             :key="i"
                             @mouseover="hover = true"
                             @mouseleave="hover = false"
                             @click="selectedSteps.map(ss => ss.id).indexOf(step.id) === -1 ? selectedSteps.push({id: step.id, price: step.price, time: step.time}) : selectedSteps.splice(selectedSteps.map(ss => ss.id).indexOf(step.id), 1)"
                             :class="selectedSteps.find(ss => ss.id === step.id)
                                ? 'relative border border-cyan-500 rounded-md'
                                : 'hover:relative hover:border hover:border-gray-200 hover:rounded-md'"
                             class="p-4 cursor-pointer">
                          <img :src="`/${step.img_path}`" alt="" class="h-24 w-auto mx-auto">
                          <p :class="selectedSteps.find(ss => ss === step.id) ? 'absolute bottom-0 py-1.5 px-4 bg-cyan-500 rounded-full text-sm font-semibold text-white transform translate-y-1/2 translate-x-9' : 'hidden'">Selected</p>

                          <p :class="hover || selectedSteps.find(ss => ss === step.id) ? 'absolute opacity-50 top-0 py-1.5 px-4 bg-cyan-500 rounded-full text-sm font-semibold text-white transform -translate-y-1/2 translate-x-10' : 'hidden'">{{step.price}} KM</p>
                          <h3 class="mt-6 text-sm font-medium text-gray-900 text-center">{{ step.name }}</h3>
                          <p class="mt-2 text-sm text-gray-500 text-center">{{step.description}}</p>
                        </div>
                      </div>
                    </div>
                    <Button @action="getCombinedProgramId()" button-text="Start process" v-if="selectedSteps.length" class="w-1/3"/>

                  </div>
                </div>
              </div>
            </section>
          </div>

        </div>

      </div>
      <Modal v-if="openedModal" :modal-name="'confirm'" @closeModal="openedModal = false">
        <PaymentConfirmation item="program" @confirm="createCardProgram()" :total-price="totalPrice" @cancel="openedModal = false; totalPrice = 0;" />
      </Modal>
    </main>

</template>
<script>
import Footer from "../components/common/Footer";
import XMarkIcon from "../components/icons/XMarkIcon";
import Bars3Icon from "../components/icons/Bars3Icon";
import Modal from "../components/icons/Modal";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import PaymentConfirmation from "../components/common/PaymentConfirmation";
export default {
  components: {PaymentConfirmation, InputField, Button, Modal, Bars3Icon, XMarkIcon, Footer},
  layout: 'app',
  data() {
    return {
      hover: false,
      openedModal: false,
      programs: [],
      steps: [],
      selectedSteps: [],
      combinedProgram: null,
      autoCharge: this.$auth.user.cards[0].card.auto_charge,
      totalPrice: 0,
      balance: this.$auth.user.cards[0].card.balance,
      selectedProgram: null,
      amountToUpdate: '',
      errors: {
        balance: ''
      },
      userToUpdate: {}
    }
  },
  async fetch() {
    await this.fetchPrograms()
    await this.fetchSteps()
  },


  computed: {
    totalPriceCombinedProgram() {
      return this.selectedSteps.reduce((n, {price}) => n + Number(price), 0)
    }
  },

  methods: {
    async fetchPrograms() {
      try {
        this.programs = await this.$axios.get('/programs').then(res => res.data)
      } catch (e) {
        this.$nuxt.error({
          statusCode: e.response.status,
          message: 'An error occurred'
        })
      }
    },
    async fetchSteps() {
      try {
        this.steps = await this.$axios.get('/steps').then(res => res.data)
      } catch (e) {
        this.$nuxt.error({
          statusCode: e.response.status,
          message: 'An error occurred'
        })
      }
    },
    async updateAutoCharge(val) {
      try {
        await this.$axios.put('/card/auto-charge', {
          auto_charge: val
        })
      } catch (e) {
        this.$nuxt.error({
          statusCode: e.response.status,
          message: e.response.message ? e.response.message : 'An error occurred'
        })
      }
    },
    async updateBalance() {
      try {
        await this.$axios.put('/card/balance', {
          balance: this.amountToUpdate
        }).then(res => {
          this.$alert.notify({
            type: 'success',
            message: 'You have been successfully updated your credit balance!'
          })

        })
        location.reload()
      } catch (e) {
        e.response.errors.map((err) => {
          Object.keys(this.errors).map((obj) => {
            if (err.field === obj) {
              this.errors[obj] = err.message.replaceAll('_', ' ');
            }
          });
        });
      }
    },
    async getCombinedProgramId() {
      if(!this.combinedProgram)
        this.combinedProgram = await this.$axios.get('/programs/combined').then(res => res.data)

      await this.prepareFacility(this.combinedProgram, this.selectedSteps)
    },
    async prepareFacility(program, steps, price) {
      this.selectedProgram = program
      this.selectedSteps = steps
      this.totalPrice = this.totalPriceCombinedProgram

      if(this.autoCharge) {
        await this.createCardProgram()
      } else {
        this.openedModal = true

      }
    },
    async createCardProgram() {
      if(Number(this.balance) < this.totalPrice) {
        this.$alert.notify({type: 'error', message: "You don't have enough credit on your card!"})
        this.openedModal = false
        return false
      }
      try {
        const res = await this.$axios.post('/card-programs', {
          program_id: this.selectedProgram.id,
          steps: this.selectedSteps,
          total_price: this.totalPrice
        })

        await this.$router.push(`/start/${res.data.card_program_id}`)

      } catch (e) {
        if(e.response.status === 400) {
          return this.$alert.notify({type: 'error', message: e.response.data})
        } else {
          this.$nuxt.error({
            statusCode: e.response.status,
            message: 'An error occurred'
          })
        }

      }
    },
  }
}
</script>