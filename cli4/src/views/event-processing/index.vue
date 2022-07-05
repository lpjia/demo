<script>
import EventModifier from './components/EventModifier.vue';
import KeyModifier from './components/KeyModifier.vue';
import ListenEvents from './components/ListenEvents.vue';
import MouseRight from './components/MouseRight.vue';
import PreventDefault from './components/PreventDefault.vue';
import SystemKey from './components/SystemKey.vue';

export default {
  name: 'EventProcessing', // 事件处理
  components: {
    ListenEvents,
    PreventDefault,
    MouseRight,
    EventModifier,
    KeyModifier,
    SystemKey,
  },
};
</script>

<template>
  <div>
    <ListenEvents />
    <PreventDefault />
    <MouseRight />
    <EventModifier />
    <KeyModifier />
    <SystemKey />

  </div>
</template>

<style scoped lang="scss">
</style>
