<template>
<div class="container">
    <h2 class="display-4">Where am i ?</h2>
    <div class="form-group">
      <input type="text" name="title">
    </div>

    <button class="edit" @click="edit">Edit</button>
    <div v-if="editing">
        <form>
            <div  class="form-group">
               <input type="text" name="name">
            </div>
            <button class="update">Update</button>
            <button class="cancel">Cancel</button>
        </form>
    </div>

    <ul v-show="false">
        <li>Hidden</li>
    </ul>

    <button id="emit" @click="$emit('applied')">Emit Event</button>

</div>
</template>

<script>
export default {
  data: () => ({
    editing: false
  }),
  props: {
    name: {
      type: String
    },
    plop: {
      type: String
    }
  },
  methods: {
    edit () {
      this.$emit('is-editing', 40)
      this.editing = true
    },
    fireObject () {
      const data = {
        company: 'Apple.inc',
        product: 'iPhone X',
        price: '1200 usd'
      }
      this.$emit('obj', data)
    },
    firePrices () {
      const prices = [10, 12, 20, 40, 30]
      this.$emit('prices', prices)
    }
  }
}
</script>
