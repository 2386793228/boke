<!-- arguments绑定 -->
<template>
  <div>
    <div class="markdown-body" v-html="htmlVal"></div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { readTextFile } from '@/utils/md-config'
  import markdownit from 'markdown-it'
  import hljs from 'highlight.js'

  const mdRef = ref('')
  const htmlVal = ref('')
  onMounted(async () => {
    mdRef.value = await readTextFile('/study/js/two.md')
    const md = markdownit({
      highlight: function (str: string, lang: string) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return (
              '<pre><code class="hljs">' +
              hljs.highlight(str, { language: lang }).value +
              '</code></pre>'
            )
          } catch (e) {}
        }
        return ''
      }
    })
    htmlVal.value = md.render(mdRef.value)
  })
</script>
<style lang="less" scoped></style>
