<template>
  <div class="min-h-screen flex items-center justify-center">
    <form @submit.prevent="handleSubmit" class="p-8 w-1/2 bg-white rounded shadow">

      <div v-if="message"
           class="bg-green-600 text-white rounded p-4 mb-8">{{ message }}</div>

      <img v-show="imageUrl"
           :src="imageUrl"
           class="w-48 h-48 object-cover">
      <div>
        <input type="file" @change="onImageChange" accept="image/*">
      </div>

      <button class="mt-8 px-4 py-2 bg-indigo-700 text-white">Submit</button>

      <div class="flex flex-wrap mt-8">
        <img v-for="(image, key) in images" :key="key"
          :src="image.image"
          class="w-48 h-46 object-cover mr-4 mb-4 shadow rounded">
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { useImageUpload } from '@/composables/useImageUpload.js'
import { ref } from 'vue'

export default {
  setup() {
    let message = ref("")
    let images = ref([])

    let {onImageChange, imageUrl, imageFile} = useImageUpload()

    function handleSubmit() {
      const formData = new FormData();
      formData.append('image', imageFile.value);

      axios.post(process.env.VUE_APP_BASE_API_URL + '/upload-image', formData)
      .then(res => {
        // to erase image after submit
        imageUrl.value = ""
        imageFile.value = ""

        message.value = res.data.message
        images.value = res.data.images
      })
    }

    return {
      onImageChange,
      imageUrl,
      handleSubmit,
      message,
      images
    }
  },
}
</script>
