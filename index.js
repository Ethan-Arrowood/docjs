var iterator = require('markdown-it-for-inline');

var md = require('markdown-it')()
  .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
    // console.log(tokens)
    tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
  });

// md.inline.ruler.after('text', 'my_rule_2', state => {
//   console.log(state)
// })

md.block.ruler.after('heading', 'my_rule', state => {
  var x = 1 + 1
  console.log(state.tokens)
  // return true
})

// md.block.ruler.push('foobar', (state) => {
//   var i, blkIdx, inlineTokens;

//   for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
//     if (state.tokens[blkIdx].type !== 'block') {
//       continue;
//     }

//     inlineTokens = state.tokens[blkIdx].children;

//     for (i = inlineTokens.length - 1; i >= 0; i--) {
//       if (inlineTokens[i].type !== tokenType) {
//         continue;
//       }

//       iteartor(inlineTokens, i);
//     }
//   }
// })

var tokens = md.parse(`# foobar

Im just a paragraph

# fuzz

### xyz

## buzz

### abc
`)

// console.log(tokens)
