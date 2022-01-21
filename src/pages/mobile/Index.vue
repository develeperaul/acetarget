<template>
  <q-page padding class="flex flex-center text-center">
    <q-spinner
      color="primary"
      size="6em"
      :thickness="10"
    />
    <!-- МАКЕТ ПРИЛОЖЕНИЯ ACE-TARGET<br>
    Слева доступно выезжающее меню, которое имеет ссылки на макеты
    <original-button
      class="q-mt-xs"
      color="red-2"
      @click="(btn) => leftDrawerOpen(btn)">
      Открыть меню
    </original-button>> -->
  </q-page>
</template>

<script>
// import OriginalButton from 'src/components/OriginalButton.vue'
export default {
  components: {
    // OriginalButton
  },
  name: 'PageIndex',
  data: () => ({
  }),
  beforeMount () {
    // this.$router.push('auth')
  },
  methods: {
    leftDrawerOpen (btn) {
      btn.offLoad()
      this.$root.$emit('leftDrawerOpen', true)
    }
  }
}
</script>
