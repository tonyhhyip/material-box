<template>
    <div :class="['card', size]">
        <slot />
    </div>
</template>
<script>
  export default{
    props: {
      size: {
        type: String,
        default: ''
      }
    }
  }
</script>
