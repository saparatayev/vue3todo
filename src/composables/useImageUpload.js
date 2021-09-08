import { ref, watch } from 'vue';

export function useImageUpload() {
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
        };
    })

    return {
        onImageChange,
        imageUrl,
        imageFile
    }
}