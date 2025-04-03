<template>
  <div class="editor-container">
    <CKEditorComponent v-model="editorData" :model-value="props.modelValue" />
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, watch, reactive, ref } from 'vue';
import CKEditorComponent from '@/components/common/CKEditorComponent.vue';
// import UmoEditor from "@/components/common/UmoEditor.vue";
// import TinyMCEditor from "@/components/common/TinyMCEditor.vue";

const props = defineProps({
  modelValue: String,
});

const editorData = ref(props.modelValue || '');
const emit = defineEmits(['update:modelValue']);

watch(editorData, () => {
  emit('update:modelValue', editorData.value);
});
</script>
