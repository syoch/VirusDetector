import { DiscordenoMessage } from "https://deno.land/x/discordeno/mod.ts";
import { findUrls } from "./find_url.ts";

const ignoredExtensions = [
  "png", "gif", "jpg",
  "mp4", "mov", "avi", "wmv",
  "mp3", "ogg", "wav"
];

function toLowered(bytes: Uint8Array): string {
  let str = "";
  for (const byte in bytes) {
    str += String.fromCharCode(bytes[byte]);
  }
  return str.toLowerCase();
}

async function tryFetch(url: string) {
  try {
    return await fetch(url);
  } catch (err) {
    return null;
  }
}

export async function check(message: DiscordenoMessage) {
  const urls = [
    ...message.attachments.map(attachment => attachment.url),
    ...findUrls(message.content)
  ]
    .filter(value => !ignoredExtensions.some(ext => value.endsWith(ext)))
    .filter(value => !value.startsWith("https://youtube.com"))
    .filter(value => !value.startsWith("https://youtu.be"))
	.filter(value => !value.startsWith("https://www.instagram.com"))
	.filter(value => !value.startsWith("https://twitter.com"));



  const result: { [key: string]: string[] } = {};
  for (const url of urls) {
    const founds = await checkUrl(url);

    if (founds.length > 0) {
      result[url] = founds;
    }
  }

  console.log("Done checking");

  return result;
}

async function checkUrl(url: string) {

  const res = await tryFetch(url);

  if (!res) {
    console.log(`Fail ${url}`);
    return [];
  }

  const arrayBuffer = await res.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  console.log(`Scanned ${url}`);
  return await checkBytes(bytes);
}

async function checkBytes(bytes: Uint8Array): Promise<string[]> {
  const words = [
    "token",
    "free",
    "grab",
    "post",
    "webhook",
    "bot",
    "send"
  ];

  const lowered = toLowered(bytes);
  const founds: string[] = [];

  for (const word of words) {
    if (lowered.includes(word)) {
      founds.push(word);
    }
  }

  return founds;
}