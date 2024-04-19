interface CreateBrainProps {
    title: string;
    description: string;
    model: string;
    status: string;
    tags: string[];
    prompt_uuid: string;
    promptName: string;
    promptDescription: string;
    promptStatus: string;
}

export type { CreateBrainProps };
