import { UserProgress, AIInteraction } from "../types";

const PROGRESS_KEY = "rdp_user_progress";
const INTERACTIONS_KEY = "rdp_ai_interactions";

export const getProgress = (): UserProgress => {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (!stored) {
        return { completedTopics: [], moduleScores: {} };
    }
    try {
        return JSON.parse(stored) as UserProgress;
    } catch {
        return { completedTopics: [], moduleScores: {} };
    }
};

export const saveProgress = (progress: UserProgress) => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
};

export const markTopicComplete = (topicId: string) => {
    const progress = getProgress();
    if (!progress.completedTopics.includes(topicId)) {
        progress.completedTopics.push(topicId);
        saveProgress(progress);
    }
};

export const getInteractions = (): AIInteraction[] => {
    const stored = localStorage.getItem(INTERACTIONS_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const saveInteraction = (interaction: AIInteraction) => {
    const interactions = getInteractions();
    interactions.push(interaction);
    localStorage.setItem(INTERACTIONS_KEY, JSON.stringify(interactions));
};

export const getInteractionForTopic = (topicId: string): AIInteraction | undefined => {
     const interactions = getInteractions();
     // Return the latest interaction for this topic
     return interactions.filter(i => i.topicId === topicId).sort((a, b) => b.timestamp - a.timestamp)[0];
}
