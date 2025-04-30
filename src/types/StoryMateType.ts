export default interface StoryMateType {
    projectTitle: string;
    author: string;
    schemaVersion: string;
    projectId: string;
    creationDate: string;
    lastModifiedDate: string;
    version: "3";
    /**
     * Labels
     */
    nodesData: StoryMateNodesDataType[];
    storyImages: {
        nodeId: number;
        base64Data: string;
    }[];
    themeName: string;
    customData: {};
    editorMetadata: {
        zoom: number;
        nodeEditModalVisible: boolean;
        selectedNodeId: number;
    };
}

export interface StoryMateNodesDataType {
    passageTitle: string;
    id: number;
    text: string;
    prompt: string;
    position: {
        x: number;
        y: number;
    };
    parentIds: number[];
    childrenIds: number[];
    choicesText: {
        id: number;
        choiceText: string;
    }[];
    imagePrompt: string;
    imageURL: string;
    nodeType?: string;
    data?: {
        tag: string;
    };
}
