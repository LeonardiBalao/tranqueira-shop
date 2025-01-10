const apiURL =
  process.env.NODE_ENV === "production"
    ? "https://tranqueira.shop"
    : "http://147.79.82.202";

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

export const translatePrompt = async (prompt: string, promptType: string) => {
  const translation = await fetchAI(
    `Translate the following text to Brazilian Portuguese: ${prompt}`,
    promptType
  );
  return translation;
};

export const fetchAI = async (
  prompt: string | undefined,
  type: string | undefined
) => {
  if (prompt === undefined || type === undefined) return "";
  console.log(`Gerando ${type}`);
  const url = `${apiURL}:11434/api/generate`;
  const promptData = {
    model: "qwen2.5:14b",
    prompt,
  };

  const response = await fetch(url, {
    method: "POST",
    referrerPolicy: "unsafe-url",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promptData),
  });

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Failed to get reader from response body");
  }

  const decoder = new TextDecoder("utf-8");

  let result = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split("\n").filter(Boolean); // Split by new lines and filter out empty lines
    for (const line of lines) {
      try {
        // console.log("Parsing line:", line); // Add this line to log the content
        if (line.trim().startsWith("{") && line.trim().endsWith("}")) {
          // Check if the line looks like a JSON object
          const json = JSON.parse(line);
          console.log(line);
          if (json.response) {
            result += json.response;
          }
        } else {
          console.warn("Skipping invalid JSON."); // Warn about invalid JSON lines
        }
      } catch (e) {
        console.error("Failed to parse JSON:", e);
      }
    }
  }

  result += decoder.decode(); // Decode any remaining bytes
  return result;
};
