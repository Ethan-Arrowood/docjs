'use strict'

import MarkdownIt from 'markdown-it'
import iterator from 'markdown-it-for-inline'
import {promises as fs} from 'fs'

async function parseBaseContainers () {
  
}

export async function parse(inputPath: string) {
  const contents = await fs.readFile(inputPath, { encoding: 'utf-8' })
  const md = new MarkdownIt()
  md.use(iterator, 'foo_replace', 'text', (tokens, idx) => {
    tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar')
  })

  const tokens = md.parse(contents, undefined)
}
