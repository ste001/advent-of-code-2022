export async function readTextFile(input: string): Promise<string> {
  const text = await Deno.readTextFile(input);
  return text;
}