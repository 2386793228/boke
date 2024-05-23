<!-- JavaScript深入之从ECMAScript规范解读this -->
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
    mdRef.value = await readTextFile('/study/js/one.md')
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
    md.renderer.rules.link_open = function (
      tokens: any,
      idx: number,
      options: any,
      _env: any,
      self: any
    ) {
      const aIndex = tokens[idx].attrIndex('target')

      if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']) // 添加target属性
      } else {
        // 如果已存在target属性，确保它的值是_blank
        const a = tokens[idx].attrs[aIndex]
        if (a[1] !== '_blank') {
          a[1] = '_blank'
        }
      }

      // 调用原生link_open方法以继续渲染
      return self.renderToken(tokens, idx, options)
    }
    htmlVal.value = md.render(mdRef.value)
  })
</script>
<style lang="less" scoped>
  .js-one-this {
    // background: #fff;
  }
</style>
