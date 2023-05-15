import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
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
import { fetchAllExercises } from '../../../../store/features/user/userSlice';
import { useEffect } from 'react';
import { PageStatus } from '../../../../enums/pageStatus';
import LoadingSpinner from '../../../general/LoadingSpinner';
import dummyData from './dummyData.json';
import {
    nrOfExrcisesWithinWeek,
    todoExercises,
    doneExercises,
} from './progressHelperFunctions';

const data: any = [];

['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach((day) => {
    data.push({
        day: day,
        done: doneExercises(nrOfExrcisesWithinWeek(dummyData), day),
        todo: todoExercises(nrOfExrcisesWithinWeek(dummyData), day),
    });
});

export function PerDayProgress() {
    // const { user } = useSelector((state: RootState) => state);

    return (
        <div className="workouts-done">
            <h4>Exercises per day and week</h4>
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
                <Bar dataKey="todo" stackId="a" fill="#8884d888" />
            </BarChart>
        </div>
    );
}
