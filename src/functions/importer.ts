import { importPixiVNJson } from "@drincs/pixi-vn-json";
import StoryMateType from "../types/StoryMateType";
import { logger } from "../utility/log-utility";
import { convertStoryMate } from "./storymate-to-pixivn";

export async function importStoryMate(texts: string | StoryMateType | (string | StoryMateType)[]): Promise<void[]> {
    if (typeof texts === "string") {
        texts = [texts];
    }
    if (!Array.isArray(texts)) {
        texts = [texts];
    }
    const promises = texts.map(async (text) => {
        if (typeof text === "string") {
            try {
                text = JSON.parse(text) as StoryMateType;
            } catch (e) {
                logger.error("Error parsing imported StoryMate JSON", e);
                return;
            }
        }
        let data = await convertStoryMate(text);
        if (data) {
            await importPixiVNJson(data);
        }
    });
    return await Promise.all(promises);
}
