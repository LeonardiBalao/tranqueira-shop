export function generateSlug(text: string): string {
  const accentsMap = new Map<string, string>([
    ["á", "a"],
    ["à", "a"],
    ["ã", "a"],
    ["â", "a"],
    ["ä", "a"],
    ["é", "e"],
    ["è", "e"],
    ["ê", "e"],
    ["ë", "e"],
    ["í", "i"],
    ["ì", "i"],
    ["î", "i"],
    ["ï", "i"],
    ["ó", "o"],
    ["ò", "o"],
    ["õ", "o"],
    ["ô", "o"],
    ["ö", "o"],
    ["ú", "u"],
    ["ù", "u"],
    ["û", "u"],
    ["ü", "u"],
    ["ç", "c"],
    ["ñ", "n"],
    ["Á", "A"],
    ["À", "A"],
    ["Ã", "A"],
    ["Â", "A"],
    ["Ä", "A"],
    ["É", "E"],
    ["È", "E"],
    ["Ê", "E"],
    ["Ë", "E"],
    ["Í", "I"],
    ["Ì", "I"],
    ["Î", "I"],
    ["Ï", "I"],
    ["Ó", "O"],
    ["Ò", "O"],
    ["Õ", "O"],
    ["Ô", "O"],
    ["Ö", "O"],
    ["Ú", "U"],
    ["Ù", "U"],
    ["Û", "U"],
    ["Ü", "U"],
    ["Ç", "C"],
    ["Ñ", "N"],
  ]);

  const slug = text
    .split("")
    .map((char) => accentsMap.get(char) || char) // Use the original character if not found in the map
    .join("")
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s-]/g, "") // Remove non-word characters except spaces and hyphens
    .trim() // Trim spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
    .slice(0, 50); // Limit to 50 characters
  return slug;
}

export function removeFormatting(text: string): string {
  return text
    .replaceAll('"', "")
    .replaceAll("/", "")
    .replaceAll("\n\n", "")
    .replaceAll("\n", "")
    .replaceAll("-", "")
    .trim();
}
