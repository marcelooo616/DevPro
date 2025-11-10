export interface Topic {
    id: string;
    title: string;
    description: string;
    content: string; // Markdown content for learning
    activityPrompt: string;
}

export interface Module {
    id: string;
    title: string;
    description: string;
    objective: string;
    topics: Topic[];
    finalProject: string;
}

export interface UserProgress {
    completedTopics: string[]; // list of topic IDs
    moduleScores: Record<string, number>; // moduleID -> score (0-100)
}

export interface AIInteraction {
    topicId: string;
    userSubmission: string;
    aiFeedback: string;
    timestamp: number;
}
