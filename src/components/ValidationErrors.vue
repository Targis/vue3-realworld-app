<template>
  <ul class="error-messages">
    <li v-for="errorMesage in errorMessages" :key="errorMesage">
      {{ errorMesage }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MvValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true
    }
  },
  computed: {
    errorMessages() {
      return Object.keys(this.validationErrors).map(name => {
        const messages = this.validationErrors[name].join(', ')
        return `${name} ${messages}`
      })
    }
  }
}
</script>
