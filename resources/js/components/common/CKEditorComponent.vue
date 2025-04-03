<template>
  <CKEditor v-model="editorData" :editor="ClassicEditor" :model-value="props.modelValue" :config="editorConfig" />
</template>

<script setup>
import { computed, onBeforeMount, onMounted, watch, reactive, ref } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { component as CKEditor } from '@ckeditor/ckeditor5-vue';
const props = defineProps({
  modelValue: String,
});
const editorData = ref(props.modelValue || '');
const appName = computed(() => {
  return APP_NAME;
});
const ckeKey = computed(() => {
  return CK_EDITOR_KEY;
});
const emit = defineEmits(['update:modelValue']);

const editorConfig = ref({
  toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
  licenseKey: ckeKey,
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
      },
    ],
  },
});

onMounted(() => {
  //
});

watch(editorData, () => {
  emit('update:modelValue', editorData.value);
});
</script>

<style>
.ck-editor__editable {
  min-height: 260px;
}
</style>
