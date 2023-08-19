// For lengthy text, limiting it to specified number only
export const truncateText = (text: string, limit: number) => {
  if (text.split(" ").length > limit) {
    return text.split(" ").slice(0, limit).join(" ").concat("...") || "";
  }
};
