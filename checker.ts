import { Message } from "https://deno.land/x/discordeno/mod.ts";


export async function check(message: Message) {
  const urls = message.attachments.map(attachment => attachment.url);
  const result: { [key: string]: string[] } = {};
  for (const url of urls) {
    const founds = await checkUrl(url);

    if (founds.length > 0) {
      result[url] = founds;
    }
  }

  return result;
}

async function checkUrl(url: string) {
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  return await checkBytes(bytes);
}

async function checkBytes(bytes: Uint8Array): Promise<string[]> {
  const words = [
    "token",
    "free",
    "grab",
    "post",
    "webhook",
    "discord",
    "bot",
    "send"
  ];

  const lowered = String.fromCharCode(...bytes).toLowerCase();
  const founds: string[] = [];

  for (const word of words) {
    if (lowered.includes(word)) {
      founds.push(word);
    }
  }

  return founds;
}