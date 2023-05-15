export interface Exercise {
    _id?: string;
    name: string;
    sets: number;
    reps: number;
    weight: number;
    description: string;
    interests?: string[];
    fitnessLevel?: string;
}
