<template>
  <div class="min-h-screen flex items-center justify-center">
    <form class="p-8 w-1/2 bg-white rounded shadow">

      <img v-show="imageUrl"
           :src="imageUrl"
           class="w-48 h-48 object-cover">
      <div>
        <input type="file" @change="onImageChange" accept="image/*">
      </div>

      <button class="mt-8 px-4 py-2 bg-indigo-700 text-white">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
  setup() {
    let imageFile = ref("")
    let imageUrl = ref("")

    function onImageChange(e) {
      let files = e.target.files || e.dataTransfer.files
      
      if (!files.length) {
        imageUrl.value = ""
        imageFile.value = ""
        return
      }

      imageFile.value = files[0]
    }

    watch(imageFile, (imageFile) => {
      if(!(imageFile instanceof File)) return

      let reader = new FileReader()
      
      reader.readAsDataURL(imageFile)

      reader.onload = () => {
        imageUrl.value = reader.result
        console.log(imageUrl.value)
      };
    })

    return {
      onImageChange,
      imageUrl
    }
  },
}
</script>
