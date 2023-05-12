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
        <>
            <div style={{ position: 'relative', width: '100%', height: '85%' }}>
                <h4>Number of Workouts</h4>
                <PieChart
                    className="pie-chart"
                    width={400}
                    height={350}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
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
        </>
    );
}
