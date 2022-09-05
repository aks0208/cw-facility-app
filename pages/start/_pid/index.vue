<template>
  <main class="-mt-24 pb-8">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
      <div v-if="$fetchState.pending">Preparing steps...</div>
      <div v-else class="rounded-lg bg-white overflow-hidden shadow p-6">
        <h2 class="text-3xl font-bold text-gray-900 text-center mt-6">{{cardProgram.program.name}}</h2>
        <div class="flow-root mt-12">
          <ul role="list" class="-my-5 divide-y divide-gray-200">
            <li v-if="cardProgram.steps.length" v-for="(createdStep, i) in cardProgram.steps" :key="i" class="py-4" :class="createdStep.status === ('FINISHED') ? 'bg-gradient-to-r from-cyan-50 to-green-50 rounded transition' : createdStep.status === ('ABORTED') ? 'bg-gradient-to-r from-red-50 to-orange-50 rounded transition' : 'bg-white'">
              <div class="flex items-center space-x-4 p-3">
                <div class="flex-shrink-0">
                  <img :class="`${stepInProgress  ? createdStep.status.toLowerCase() : (nextStepIdx === i ?  'started' : createdStep.status.toLowerCase())}-img`" class="h-8 w-8 rounded-full" :src="`/${createdStep.step.img_path}`" alt="">
                </div>
                <div class="flex-1 min-w-0">
                  <p :class="`${stepInProgress  ? createdStep.status.toLowerCase() : (nextStepIdx === i ?  'started' : createdStep.status.toLowerCase())}-text`" class="text-sm font-medium truncate">{{createdStep.step.name}}</p>
                  <p :class="`${createdStep.status === 'CREATED' && !stepInProgress  ? 'started-text' : createdStep.status.toLowerCase()}-text`" class="text-sm text-gray-500 truncate">{{createdStep.step.description}}</p>
                </div>
                <div class="sm:flex relative">
                  <div class="sm:flex sm:items-center mr-1.5 w-20">
                    <DollarIcon class="text-gray-300" />
                    <p :class="`${stepInProgress  ? createdStep.status.toLowerCase() : (nextStepIdx === i ?  'started' : createdStep.status.toLowerCase())}-text`" class="text-sm font-medium truncate">{{createdStep.price}} KM</p>
                  </div>
                  <div class="sm:flex sm:items-center mr-1.5 w-20">
                    <ClockIcon class="text-gray-300" />
                    <p :class="`${stepInProgress  ? createdStep.status.toLowerCase() : (nextStepIdx === i ?  'started' : createdStep.status.toLowerCase())}-text`" class="text-sm font-medium truncate">{{createdStep.time/60}}min</p>
                  </div>
                  <div v-if="hovered === i && currentStep && createdStep.status !== 'STARTED'" class="text-sm p-2 bg-white border border-gray-200 rounded absolute top-10 right-0 z-10 shadow-lg">{{`You have to wait until ${currentStep.step.name} is completed`}}</div>
                  <button @mouseover="hovered = i" @mouseleave="hovered = null" @click="controlStep(createdStep, i)"
                          :class="`${stepInProgress  ? createdStep.status.toLowerCase() : (nextStepIdx === i ?  'next' : createdStep.status.toLowerCase())}`"
                          class="inline-flex items-center shadow-sm px-2.5 py-0.5 text-sm leading-5 font-medium w-36 items-center justify-center rounded-full bg-white capitalize">
                    {{ createdStep.status === 'CREATED' ? 'START' : createdStep.status }}

                    <component class="ml-2" :is="createdStep.status === 'CREATED' ? 'PlayIcon' : createdStep.status !== 'STARTED' ? 'ReplayIcon' : 'StopIcon'"></component>

                  </button>
                </div>
              </div>
            </li>

          </ul>
        </div>
        <div class="mt-12">
          <a href="#" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Cancel service </a>
        </div>
      </div>

      <div v-if="currentStep && currentStep.status === 'STARTED'" class="text-cyan-600 my-8">
        <h1 class="text-3xl text-center mb-3 font-light">{{currentStep.step.name}} completed</h1>
        <div class="text-6xl text-center flex w-full items-center justify-center">
          <div class="text-2xl mr-1 font-extralight">in</div>
          <div class="w-24 mx-1 p-2 bg-white text-cyan-500 rounded-lg">
            <div class="font-mono leading-none">{{ hours }}</div>
            <div class="font-mono uppercase text-sm leading-none">Hours</div>
          </div>
          <div class="w-24 mx-1 p-2 bg-white text-cyan-500 rounded-lg">
            <div class="font-mono leading-none">{{minutes}}</div>
            <div class="font-mono uppercase text-sm leading-none">Minutes</div>
          </div>
          <div class="text-2xl mx-1 font-extralight">and</div>
          <div class="w-24 mx-1 p-2 bg-white text-cyan-500 rounded-lg">
            <div class="font-mono leading-none">{{seconds}}</div>
            <div class="font-mono uppercase text-sm leading-none">Seconds</div>
          </div>
        </div>
      </div>
        

    </div>
  </main>
</template>

<script>
import Clock from "../../../components/icons/ClockIcon";
import ClockIcon from "../../../components/icons/ClockIcon";
import DollarIcon from "../../../components/icons/DollarIcon";
import PlayIcon from "../../../components/icons/PlayIcon";
import ReplayIcon from "../../../components/icons/ReplayIcon";
import StopIcon from "../../../components/icons/StopIcon";
export default {
  components: {StopIcon, ReplayIcon, PlayIcon, DollarIcon, ClockIcon, Clock},
  layout: 'app',
  data() {
    return {
      endpoint: `/card-programs`,
      cardProgram: null,
      seconds: '00',
      minutes: '00',
      hours: '00',
      distance: 0,
      countdown: null,
      endTime: new Date().getTime(),
      now: new Date().getTime(),
      currentStep: null,
      nextStepIdx: 0,
      hovered: null,
    }
  },
  async fetch() {
    await this.fetchCurrentProgram()
  },
  async validate({ params }) {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(params.pid)
  },
  computed: {
    firstStep() {
      return this.cardProgram.steps.findIndex(
          (element) => element.status === 'CREATED'
      )
    },
    stepInProgress() {
      let index = this.cardProgram.steps.findIndex((element) => element.status === 'STARTED')
      if(index === -1 ) {

        const finishedIndex = this.cardProgram.steps
            .filter(element =>
              element.status === 'FINISHED' || element.status === 'ABORTED')
            .map((el, i) => i)
            .pop()

        this.nextStepIdx = finishedIndex
            ? finishedIndex + 1
            : 0

      } else {
        this.nextStepIdx = index + 1
      }

      return index !== -1
    },

  },

  methods: {
    async fetchCurrentProgram() {
      try {
        this.cardProgram = await this.$axios.get(this.endpoint + `/${this.$route.params.pid}`).then(res => res.data)

        this.abortStartedStep()

        this.cardProgram.steps = [...new Map(this.cardProgram.steps.map((m) => [m.step_id, m])).values()]

      } catch (e) {
        this.$nuxt.error({
          statusCode: e.response.status,
          message: 'An error occurred'
        })
      }
    },
    abortStartedStep() {
      this.cardProgram.steps.filter(item => item.status === 'STARTED').forEach((item, i) => {
        this.updateStatus(item.id, 'ABORTED', i)
        item.status = 'ABORTED'
      })
    },
    updateStatus(id, status, i) {
      this.$axios.put(this.endpoint + '/step', {
        id: id,
        status: status
      }).then(() => {
        this.currentStep.status = status
        this.cardProgram.steps.find((s,i) => s.id === this.currentStep.id).status = status

        if(status !== ('STARTED')) {
          this.currentStep = null
        }

      })
      .catch(e => {
        this.$nuxt.error({
          statusCode: e.response.status,
          message: 'An error occurred'
        })
      })
    },
    async createNewStep(current) {
      await this.$axios.post('/card-programs/step', {
        step: {
          step_id: current.step.id,
          price: current.step.price,
          time: current.step.time
        },
        card_program_id: current.card_program_id
      }).then(res => {

        const replayedStepIdx = this.cardProgram.steps.findIndex(s => s.step.name === res.data.step.name)

        this.$set(this.cardProgram.steps, replayedStepIdx, res.data)

        this.controlStep(res.data, replayedStepIdx)
      }).catch(e => {
        this.$alert.notify({type: 'error', message: e.response.data})
      })
    },
    controlStep(current, i) {
      switch (current.status) {
        case 'CREATED': {
          if(this.firstStep === i && !this.stepInProgress) {
            this.currentStep = current
            this.setEndTime(current.time)
            this.start(current.id, i)
          }
        }
        break;
        case 'STARTED': {
          this.currentStep = current;
          this.updateStatus(current.id, 'ABORTED', i)
        }
        break;
        case 'FINISHED' :
          if(!this.stepInProgress) {
            this.currentStep = current;
            this.createNewStep(current)
          }
        break;
        case 'ABORTED' : {
          if(!this.stepInProgress) {
            this.currentStep = current;
            this.createNewStep(current)
          }
        }
        break;
      }

    },
    setEndTime(s) {
      let now = new Date();
      now.setMinutes(now.getMinutes() + (s/60))
      this.endTime = new Date(now);
    },
    start(id, i) {
      this.updateStatus(id, 'STARTED', i)
      this.countdown = setInterval(() => {

        this.now = new Date().getTime();
        this.distance = this.endTime - this.now

        this.hours = this.padNum( Math.floor((this.distance % (1000*60*60*24)) / (1000*60*60)))
        this.minutes = this.padNum( Math.floor((this.distance % (1000*60*60)) / (1000*60)))
        this.seconds = this.padNum( Math.floor((this.distance % (1000*60)) / 1000))

        if (this.distance < 0) {
          this.updateStatus(id, 'FINISHED', i)
          clearInterval(this.countdown)
          this.days = '00'
          this.hours = '00'
          this.minutes = '00'
          this.seconds = '00'
        }
      },100)
    },
    padNum(num) {
      let zero = ''
      for (let i = 0; i < 2; i++) {
        zero += '0'
      }
      return (zero + num).slice(-2)
    }
  }
}
</script>

<style>
.started {
  @apply text-green-700 border border-green-300
}

.aborted {
  @apply text-red-700 border border-red-300
}

.next {
  @apply text-gray-700 border border-gray-300 cursor-pointer hover:bg-gray-50
}

.created {
  @apply text-gray-700 border border-gray-300 cursor-pointer cursor-not-allowed
}

.finished {
  @apply text-cyan-700 border border-cyan-300
}

.created-img {
  @apply grayscale
}

.started-img {
  @apply grayscale-0
}
.aborted-img {
  @apply grayscale-0
}
.finished-img {
  @apply grayscale-0
}

.created-text {
  @apply text-gray-300
}

.started-text {
  @apply text-gray-500
}
.aborted-text {
  @apply text-gray-500
}
.finished-text {
  @apply text-gray-500
}


</style>