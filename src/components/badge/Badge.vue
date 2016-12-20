<template>
    <span class="badge" :class="classes">
        <slot />
    </span>
</template>
<script>
  export default {
    props: {
      newHighlight: {
        type: Boolean,
        'default': false
      }
    },
    data(){
      return {
        classes: {
          'new': this.newHighlight
        }
      }
    }
  }
</script>
