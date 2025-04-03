<template>
  <Editor :api-key="tinyKey" :init="editor" />
</template>

<script setup>
import { computed, onBeforeMount, onMounted, watch, reactive, ref } from 'vue';
import Editor from '@tinymce/tinymce-vue';

const tinyKey = computed(() => {
  return TINY_MCE_KEY;
});
const openAiKey = computed(() => {
  return OPEN_AI_KEY;
});

const ai_request = (request, respondWith) => {
  const openAiOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAiKey.value}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      temperature: 0.7,
      max_tokens: 800,
      messages: [
        {
          role: 'user',
          content: request.prompt,
        },
      ],
    }),
  };
  respondWith.string((signal) =>
    window
      .fetch('https://api.openai.com/v1/chat/completions', {
        signal,
        ...openAiOptions,
      })
      .then(async (response) => {
        if (response) {
          const data = await response.json();
          if (data.error) {
            throw new Error(`${data.error.type}: ${data.error.message}`);
          } else if (response.ok) {
            // Extract the response content from the data returned by the API
            return data?.choices[0]?.message?.content?.trim();
          }
        } else {
          throw new Error('Failed to communicate with the ChatGPT API');
        }
      }),
  );
};

const editor = ref({
  toolbar_mode: 'sliding',
  // toolbar: "code",
  plugins: [
    'code',
    'help',
    'wordcount',
    'anchor',
    'autolink',
    'charmap',
    'codesample',
    'emoticons',
    'image',
    'link',
    'lists',
    'media',
    'searchreplace',
    'table',
    'visualblocks',
    'checklist',
    'mediaembed',
    'casechange',
    'export',
    'formatpainter',
    'pageembed',
    'a11ychecker',
    'tinymcespellchecker',
    'permanentpen',
    'powerpaste',
    'advtable',
    'advcode',
    'editimage',
    'advtemplate',
    'ai',
    'mentions',
    // 'tinycomments',
    'tableofcontents',
    'footnotes',
    'mergetags',
    'autocorrect',
    'typography',
    'inlinecss',
    'markdown',
    'importword',
    'exportword',
    'exportpdf',
    'fullscreen',
  ],
  ai_request: ai_request,
});
</script>

<style scoped></style>
