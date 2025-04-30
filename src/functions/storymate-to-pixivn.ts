import { PixiVNJson, PixiVNJsonLabels, PixiVNJsonLabelStep } from "@drincs/pixi-vn-json";
import StoryMateType, { StoryMateNodesDataType } from "../types/StoryMateType";

export async function convertStoryMate(text: StoryMateType): Promise<PixiVNJson> {
    const res: PixiVNJson = {
        labels: await convertStoryMateNodes(text.nodesData),
    };
    return res;
}

async function convertStoryMateNodes(nodesData: StoryMateNodesDataType[]): Promise<PixiVNJsonLabels> {
    const res: PixiVNJsonLabels = {};
    const promises = nodesData.map(async (node) => {
        const data: PixiVNJsonLabelStep[] = [];
        data.push({
            dialogue: node.text,
            choices: node.choicesText.map((choice) => ({
                text: choice.choiceText,
                label: StoryMateIdToPixiVNId(choice.id),
                type: "jump",
                props: {},
            })),
            labelToOpen:
                node.choicesText.length === 0 && node.childrenIds.length > 0
                    ? {
                          label: StoryMateIdToPixiVNId(node.childrenIds[0]),
                          type: "jump",
                          props: {},
                      }
                    : undefined,
        });
        res[StoryMateIdToPixiVNId(node.id)] = data;
    });
    await Promise.all(promises);
    return res;
}

function StoryMateIdToPixiVNId(id: number): string {
    return `storymate-${id}`;
}
