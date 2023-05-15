import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { TimeFrame } from './TimeFrame';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

import {
    nrOfExrcisesWithinWeek,
    missedExercises,
    doneExercises,
} from './progressHelperFunctions';

export function PerDayProgress() {
    const { user } = useSelector((state: RootState) => state);
    const exercises = user.exercises;
    const data: any = [];

    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach((day) => {
        data.push({
            day: day,
            done: doneExercises(nrOfExrcisesWithinWeek(exercises), day),
            missed: missedExercises(nrOfExrcisesWithinWeek(exercises), day),
        });
    });
    return (
        <div className="workouts-done">
            <h4>Workouts per day and week</h4>
            <TimeFrame />
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="done" stackId="a" fill="#8884d8" />
                <Bar dataKey="missed" stackId="a" fill="#8884d888" />
            </BarChart>
        </div>
    );
}
