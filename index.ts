'use strict'

import MarkdownIt from 'markdown-it'
import {promises as fs} from 'fs'

export async function parse(inputPath: string) {
  const contents = await fs.readFile(inputPath, { encoding: 'utf-8' })

  const md = new MarkdownIt()

  const tokens = md.parse(contents, {})

  const page = createPage(tokens)

  return page
}

type Tokens = ReturnType<MarkdownIt['parse']>
type Token = Tokens extends Array<infer U> ? U : never;

function createPage (tokens: Tokens, pageType?: PageTypes): Page {
  // Determine type of page, can be automatic or pre loaded
  switch (pageType) {
    case 'Module': return createModulePage(tokens)
    case 'Class': return createClassPage(tokens)
    case 'Structure': return createStructurePage(tokens)
    case 'Global': return createGlobalPage(tokens)
    default: return createPage(determinePageType(tokens))
  }
}

function createModulePage (tokens: Tokens): ModulePage {

}
function createClassPage (tokens: Tokens): ClassPage {

}
function createStructurePage(tokens: Tokens): StructurePage {

}
function createGlobalPage(tokens: Tokens): GlobalPage {

}
function determinePageType(tokens: Tokens): PageTypes {
  /*
   * The page type is determined by a series of flags. The determinePageType function will iterate over the list of tokens and perform a series of checks to attempt to figure out what kind of documentation page the list represents.
   * 
   * The flags are managed using a Proxy. A trap is used to prevent toggling a property more than once. For example, once a flag is toggle to `true`, it cannot be toggled to `false`.
   */
  const flags = new Proxy({
    hasH1: false,
    hasH2MethodsOrEvents: false,
    hasH2Class: false
  }, {
    set(obj, prop, value) {
      // Proxy traps don't play nice in TS, but since this one is never used with a dynamic prop I'm disabling the type checking on the prop accessor
      // @ts-ignore
      if (!obj[prop]) {
        return Reflect.set(obj, prop, value)
      }
      return false
    }
  })

  // This check validates a heading token's content for the existance of the strings "Methods" or "Events". 
  const isH2MethodsOrEvents = (token: Token, currentIndex: number, tokens: Tokens) => {
    if (token.type === 'heading_open' && token.tag === 'h2') {
      const inlineToken = tokens[currentIndex + 1]

      if (inlineToken.type === 'inline' && inlineToken.children !== null) {
        const inlineTokenText = inlineToken.children[0]

        return (
          inlineTokenText.type === 'text' &&
          (inlineTokenText.content === 'Methods' || inlineTokenText.content === 'Events')
        )
      }
    }

    return false
  }

  // This check validates a heading token's content for the existance of "Class: " at the beginning of the content string
  const isH2Class = (token: Token, currentIndex: number, tokens: Tokens) => {
    if (token.type === 'heading_open' && token.tag === 'h2') {
      const inlineToken = tokens[currentIndex + 1]

      if (inlineToken.type === 'inline' && inlineToken.children !== null) {
        const inlineTokenText = inlineToken.children[0]

        return inlineTokenText.type === 'text' && inlineTokenText.content.startsWith('Class: ')
      }
    }

    return false
  }

  for (let i = 0, token = tokens[0]; i < tokens.length; i++, token = tokens[i]) {
    flags.hasH1 = token.type === 'heading_open' && token.tag === 'h1'
    flags.hasH2MethodsOrEvents = isH2MethodsOrEvents(token, i, tokens)
    flags.hasH2Class = isH2Class(token, i, tokens)
  }

  if (flags.hasH1 && flags.hasH2MethodsOrEvents) {
    return 'Module'
  } else if (!flags.hasH1 && flags.hasH2Class) {
    return 'Class'
  }
}

parse('./input.md')
