<template>
  <div class="grid">
    <slot></slot>
  </div>
</template>
<script></script>
<style>
.grid {
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
