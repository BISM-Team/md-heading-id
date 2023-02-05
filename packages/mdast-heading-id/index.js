/**
 * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
 * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownOptions
 * @typedef {import('./tree-extension').MdIdString} MdIdString
 */

/** Extension for `mdast-util-from-markdown` to enable IDs.
 * @type {FromMarkdownExtension}
 */
export const fromMarkdownExtension = {
  enter: {
    idString(token) {
      this.enter({type: 'idString', value: null}, token);
      this.buffer();
    },
  },
  exit: {
    idString(token) {
      const idString = this.resume();
      const node = /** @type {MdIdString} */ (this.exit(token));
      node.value = idString;
    },
  },
};

/** Extension for `mdast-util-to-markdown` to enable IDs.
 * @type {ToMarkdownOptions}
 */
export const toMarkdownExtension = {
  handlers: {
    idString: node => {
      if (node && node.value) return '${' + node.value + '}';
      else
        throw new Error(
          "Can't stringify empty id because parser hangs on empty ids"
        );
    },
  },
};
