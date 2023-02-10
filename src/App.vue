<template>
  <router-view></router-view>
</template>

<script setup>
import moment from 'moment-timezone'
moment.tz.setDefault('Europe/Moscow');
</script>
