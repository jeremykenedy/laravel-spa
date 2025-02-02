<template>
  <div class="dropzone-container" @dragover="dragover" @dragleave="dragleave" @drop="drop">
    <input type="file" name="file" id="fileInput" class="hidden-input" @change="onChange" ref="refFiles"
      accept=".gif,.webp,.jpg,.jpeg,.png" />

    <label for="fileInput" class="file-label text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-image"
        viewBox="0 0 16 16">
        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        <path
          d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
      </svg>
      <div v-if="isDragging">Release to drop files here.</div>
      <div v-else>Drop files here or <u>click here</u> to upload.</div>
    </label>

    <div class="preview-container mt-4" v-if="thumbnail || modelValue">
      <div :key="thumbnail.name" class="preview-card">
        <div>
          <img class="preview-img" :src="generateThumbnail(thumbnail)" />
          <p :title="thumbnail.name">
            {{ makeName(thumbnail.name) }}
          </p>
        </div>
        <div>
          <a href="javascript:void(0)" class="ml-2" type="button" @click="remove(index)" title="Remove file">
            <b>&times;</b>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  modelValue: String
});

const thumbnail = ref('')
const isDragging = ref(false)
const refFiles = ref(null)

const emit = defineEmits(['update:modelValue'])

const onChange = (() => {
  thumbnail.value = refFiles.value.files;
})

const generateThumbnail = ((file) => {
  if (props.modelValue) {
    return props.modelValue
  } else {
    let fileSrc = URL.createObjectURL(file);
    setTimeout(() => {
      URL.revokeObjectURL(fileSrc);
    }, 1000);
    return fileSrc;
  }
})

const makeName = ((name) => {
  if (!props.modelValue) {
    return (
      name.split(".")[0].substring(0, 3) +
      "..." +
      name.split(".")[name.split(".").length - 1]
    );
  }
})

const remove = ((i) => {
  thumbnail.value = ""
})

const dragover = ((e) => {
  e.preventDefault();
  isDragging.value = true;
})

const dragleave = (() => {
  isDragging.value = false;
})

const drop = ((e) => {
  e.preventDefault();
  refFiles.value.files = e.dataTransfer.files;
  onChange();
  isDragging.value = false;
})

watch(thumbnail, () => {
  emit('update:modelValue', thumbnail.value[0])
})

/*export default {
    props: ['thefile'],
    data() {
        return {
            isDragging: false,
            files: [],
        };
    },
    methods: {
        onChange() {
            this.files = [...this.$refs.file.files];
            console.log(thefile)
        },

        generateThumbnail(file) {
            let fileSrc = URL.createObjectURL(file);
            setTimeout(() => {
                URL.revokeObjectURL(fileSrc);
            }, 1000);
            return fileSrc;
        },

        makeName(name) {
            return (
                name.split(".")[0].substring(0, 3) +
                "..." +
                name.split(".")[name.split(".").length - 1]
            );
        },

        remove(i) {
            this.files.splice(i, 1);
        },

        dragover(e) {
            e.preventDefault();
            this.isDragging = true;
        },

        dragleave() {
            this.isDragging = false;
        },

        drop(e) {
            e.preventDefault();
            this.$refs.file.files = e.dataTransfer.files;
            this.onChange();
            this.isDragging = false;
        },
    },
};*/
</script>

<style scoped>
.dropzone-container {
  padding: 4rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}

.preview-container {
  display: flex;
  margin-top: 2rem;
}

.preview-card {
  display: flex;
  border: 1px solid #a2a2a2;
  padding: 5px;
  margin-left: 5px;
}

.preview-img {
  width: 50px;
  height: auto;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
</style>
