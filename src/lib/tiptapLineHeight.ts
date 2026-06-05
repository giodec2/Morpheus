import { Extension } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineHeight: {
      setLineHeight: (lineHeight: string) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
  }
}

export const LineHeight = Extension.create({
  name: 'lineHeight',

  addOptions() {
    return {
      types: ['paragraph', 'heading'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => element.style.lineHeight || '',
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) return {};
              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight:
        (lineHeight: string) =>
        ({ editor, chain }) => {
          const nodeType = editor.state.selection.$from.parent.type.name;
          if (!this.options.types.includes(nodeType)) return false;
          return chain().updateAttributes(nodeType, { lineHeight }).run();
        },
      unsetLineHeight:
        () =>
        ({ editor, chain }) => {
          const nodeType = editor.state.selection.$from.parent.type.name;
          if (!this.options.types.includes(nodeType)) return false;
          return chain().updateAttributes(nodeType, { lineHeight: null }).run();
        },
    };
  },
});
