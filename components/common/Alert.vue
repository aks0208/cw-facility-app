<template>
  <transition name="slide-fade">
    <div :style="[positionStyle, {'background':`${classes[type].color}`}]" v-show="show" class="right-10 top-6 index-max shadow rounded-md p-4 z-auto fixed">
      <div class="flex">
        <div class="flex-shrink-0">
          <component :class="`text-${classes[type].text}-600`" :is="classes[type].icon" />
        </div>
        <div class="ml-3">
          <p :class="`text-${classes[type].text}-600 text-sm font-medium`">{{message}}</p>
        </div>
        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button @click="show = false" type="button" :class="`inline-flex bg-${classes[type].color}-50 rounded-md p-1.5 text-${classes[type].text}-500 hover:bg-${classes[type].color}-100 focus:outline-none`">
              <span class="sr-only">Dismiss</span>
              <XMarkIcon :class="`text-${classes[type].text}-600`" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import XMarkIcon from "../icons/XMarkIcon";
import CheckCircleIcon from "../icons/CheckCircleIcon";
import InfoCircleIcon from "../icons/InfoCircleIcon";
import XCircleIcon from "../icons/XCircleIcon";
export default {
  components: {XMarkIcon, CheckCircleIcon, InfoCircleIcon, XCircleIcon},
  data() {
    return {
      classes: {
        success: { color: '#dcfce7', icon: 'CheckCircleIcon', text: 'green' },
        error: { color: '#fee2e2', icon: 'XCircleIcon', text: 'red' },
        info: { color: '#e0e7ff', icon: 'InfoCircleIcon', text: 'blue' }
      },
      show: false,
      type: 'success',
      message: '',
      positionStyle: ''
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'notify') {
        this.message = state.alert.message
        this.type = state.alert.type
        this.show = true
        this.positionStyle = state.alert.positionStyle

        if (state.alert.auto_hide)
          setTimeout(() => {
            this.show = false
          }, state.alert.duration)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.index-max {
  z-index: 100000000 !important;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.notification {
  -webkit-animation: cssAnimation 5s forwards;
  animation: cssAnimation 5s forwards;
}
@keyframes cssAnimation {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes cssAnimation {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>