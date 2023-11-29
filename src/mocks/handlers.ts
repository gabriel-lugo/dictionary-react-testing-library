import { HttpResponse, http } from "msw";
import wordData from "./wordData";

const handlers = [
  http.get("https://api.dictionaryapi.dev/api/v2/entries/en/hello", () =>
    HttpResponse.json([wordData[0]])
  ),
  http.get("https://api.dictionaryapi.dev/api/v2/entries/en/test", () =>
    HttpResponse.json([wordData[1]])
  ),
  http.get("https://api.dictionaryapi.dev/api/v2/entries/en/fantabulous", () =>
    HttpResponse.json([wordData[2]])
  ),
];

export default handlers;
