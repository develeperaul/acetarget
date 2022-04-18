<template lang="pug">
  q-btn.shadow-6.text-weight-550.pd(
    :class="{'full-width': mode !== 'web'}"
    no-caps
    :outline="outline?'outline':false"
    :color="color"
    :text-color="textColor"
    :loading="loading"
    :disabled="loading"
    @click="click()"
    :to="to"
  )
    slot(name="first")
    slot(default)
    slot(name="last")
</template>

<script>
export default {
  name: 'OriginalButton',
  props: {
    to: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false
    },
    textColor: {
      type: String,
      required: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    showLoad: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    mode () {
      return process.env.TYPE
    }
  },
  data () {
    return {
      loading: false
    }
  },

  methods: {
    showLoading () {
      this.loading = true
      // this.$q.loading.show()
      // hiding in 2s
    },
    click () {
      if (this.$listeners.click && this.showLoad) {
        this.showLoading()
      }
      this.$emit('click', this)
    },
    offLoad () {
      // this.timer = setTimeout(() => {
      // this.$q.loading.hide()
      this.loading = false
      // this.timer = undefined
      // }, 2000)
    }
  },

  beforeDestroy () {
    // if (this.timer !== undefined) {
    //   clearTimeout(this.timer)
    //   // this.$q.loading.hide()
    // }
  }
}
</script>
<style scoped lang="scss">
  .pd {
    padding-top: 6.145px;
    padding-bottom: 6.145px;
  }
</style>
