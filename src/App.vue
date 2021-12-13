<template>
  <a-layout>
    <a-layout-sider 
      :trigger="null"
    >
      <Menu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <Header :pageTitle="pageTitle" />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 36px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>

import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router';
import Menu from './components/Menu.vue'
import Header from './components/Header.vue'

export default defineComponent({
  name: 'App',
  setup() {
    const pageTitle = computed(() => useRoute().name)

    return {
      pageTitle
    }
  },
  components: {
    Menu,
    Header
  }
})
</script>
