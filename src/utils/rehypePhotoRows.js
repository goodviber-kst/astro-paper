// Group consecutive Markdown photos, keeping each optional italic caption
// with its photo. Prose, headings, and other blocks end a photo sequence.
const meaningful = node =>
  (node.children ?? []).filter(
    child => child.type !== "text" || child.value.trim() !== ""
  );

const isParagraphWith = (node, tag) => {
  if (node?.type !== "element" || node.tagName !== "p") return false;
  const children = meaningful(node);
  return (
    children.length === 1 &&
    children[0].type === "element" &&
    children[0].tagName === tag
  );
};

export default function rehypePhotoRows() {
  return tree => {
    const source = tree.children.map(node => {
      const children = meaningful(node);
      if (
        node.type === "element" &&
        node.tagName === "p" &&
        children.length > 1 &&
        children.every(
          child => child.type === "element" && child.tagName === "img"
        )
      ) {
        return {
          type: "element",
          tagName: "div",
          properties: { className: ["photo-gallery"] },
          children: children.map(image => ({
            type: "element",
            tagName: "figure",
            properties: {},
            children: [image],
          })),
        };
      }
      return node;
    });
    const result = [];
    const nextBlock = start => {
      let i = start;
      while (source[i]?.type === "text" && source[i].value.trim() === "") i++;
      return i;
    };

    for (let i = 0; i < source.length;) {
      if (!isParagraphWith(source[i], "img")) {
        result.push(source[i++]);
        continue;
      }
      const figures = [];
      const start = i;
      let end = i;
      while (isParagraphWith(source[i], "img")) {
        const children = meaningful(source[i]);
        end = i + 1;
        const captionIndex = nextBlock(end);
        if (isParagraphWith(source[captionIndex], "em")) {
          children.push({
            type: "element",
            tagName: "figcaption",
            properties: {},
            children: meaningful(source[captionIndex])[0].children,
          });
          end = captionIndex + 1;
        }
        figures.push({
          type: "element",
          tagName: "figure",
          properties: {},
          children,
        });
        i = nextBlock(end);
      }
      if (figures.length > 1) {
        result.push({
          type: "element",
          tagName: "div",
          properties: { className: ["photo-gallery"] },
          children: figures,
        });
      } else {
        result.push(...source.slice(start, end));
      }
      i = end;
    }
    tree.children = result;
  };
}
