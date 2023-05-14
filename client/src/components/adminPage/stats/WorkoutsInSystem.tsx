import { PieChart, Pie } from 'recharts';
import workouts from '../../../assets/resources/workouts.json';

export function WorkoutsInSystem() {
    function getWorkoutData() {
        const data = workouts.map(({ workoutCategory, workouts }) => ({
            name: `${workoutCategory} ${workouts.length}`,
            value: workouts.length,
        }));
        return data;
    }

    return (
        <div className="workouts-in-system">
            <h4>Number of Workouts in database</h4>
            <PieChart className="pie-chart style" width={400} height={350}>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={getWorkoutData()}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ name }) => name}
                />
            </PieChart>
        </div>
    );
}
