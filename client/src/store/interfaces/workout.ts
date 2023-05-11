export interface Exercise {
    interests?: string[];
    name: string;
    sets: number;
    reps: number;
    weight: number;
    description: string;
}

export interface Workout {
    user_id: string;
    date: Date;
    exercises: Exercise[];
    created_at: Date;
    updated_at: Date;
}
