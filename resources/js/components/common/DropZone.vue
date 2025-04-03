<template>
  <label
    for="fileInput"
    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
  >
    <div
      class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-white dark:bg-gray-900"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <div class="text-center">
        <svg
          class="mx-auto size-12 text-gray-300"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            fill-rule="evenodd"
            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
            clip-rule="evenodd"
          />
        </svg>
        <div class="mt-4 flex text-sm/6 text-gray-600">
          <span>Upload a file</span>
          <input
            id="fileInput"
            ref="refFiles"
            type="file"
            name="file"
            class="hidden-input sr-only"
            accept=".gif,.webp,.jpg,.jpeg,.png"
            @change="onChange"
          />

          <p class="pl-1">or drag and drop</p>
        </div>
        <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  </label>

  <div v-if="thumbnail || modelValue" class="preview-container mt-4">
    <div :key="thumbnail.name" class="preview-card">
      <div>
        <img class="preview-img" :src="generateThumbnail(thumbnail)" />
        <p :title="thumbnail.name">
          {{ makeName(thumbnail.name) }}
        </p>
      </div>
      <div>
        <a href="javascript:void(0)" class="ml-2" type="button" title="Remove file" @click="remove(index)">
          <b>&times;</b>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
});

const thumbnail = ref('');
const isDragging = ref(false);
const refFiles = ref(null);

const emit = defineEmits(['update:modelValue']);

const onChange = () => {
  thumbnail.value = refFiles.value.files;
};

const generateThumbnail = (file) => {
  if (props.modelValue) {
    return props.modelValue;
  } else {
    let fileSrc = URL.createObjectURL(file);
    setTimeout(() => {
      URL.revokeObjectURL(fileSrc);
    }, 1000);
    return fileSrc;
  }
};

const makeName = (name) => {
  if (!props.modelValue) {
    return name.split('.')[0].substring(0, 3) + '...' + name.split('.')[name.split('.').length - 1];
  }
};

const remove = (i) => {
  thumbnail.value = '';
};

const dragover = (e) => {
  e.preventDefault();
  isDragging.value = true;
};

const dragleave = () => {
  isDragging.value = false;
};

const drop = (e) => {
  e.preventDefault();
  refFiles.value.files = e.dataTransfer.files;
  onChange();
  isDragging.value = false;
};

watch(thumbnail, () => {
  emit('update:modelValue', thumbnail.value[0]);
});

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
.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
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
