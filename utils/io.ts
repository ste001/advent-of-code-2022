import { readline } from "https://deno.land/x/readline@v1.1.0/mod.ts";

export async function readTextFile(input: string): Promise<string> {
  const text = await Deno.readTextFile(input);
  return text;
}

export async function readLinesIntoStringArray(input: string): Promise<string[]> {
  const array = [];
  const f = await Deno.open(input);
  for await (const line of readline(f)) {
    array.push(new TextDecoder().decode(line));
  }
  f.close();
  return array;
}

export async function readLinesIntoNumberArray(input: string): Promise<number[]> {
  const array = [];
  const f = await Deno.open(input);
  for await (const line of readline(f)) {
    array.push(parseInt(new TextDecoder().decode(line), 10));
  }
  f.close();
  return array;
}