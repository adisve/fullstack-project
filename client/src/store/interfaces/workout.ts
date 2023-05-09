export interface Exercise {
    _id: string;
    name: string;
    sets: number;
    reps: number;
    weight: number;
    description: string;
}

export interface Workout {
    _id: string;
    user_id: string;
    date: Date;
    exercises: Exercise[];
    created_at: Date;
    updated_at: Date;
}
