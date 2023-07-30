// Determining how long it will take to read the blog
export const readTime = (content: string) => {
  const words = content.split(" ");
  const minutesToRead = Math.ceil(words.length / 200);
  return minutesToRead;
};
