import { PieChart, Pie, Cell } from 'recharts';
import { TimeFrame } from './TimeFrame';
import {
    completedExercises,
    numberOfExercises,
} from './progressHelperFunctions';
import { Tooltip } from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

interface Data {
    name: string;
    value: number;
    color: string;
}

export function WeeklyProgress() {
    const { user } = useSelector((state: RootState) => state);
    const userExercises = user.exercises;

    let exercises = numberOfExercises(userExercises);
    let completed = completedExercises(userExercises);
    let workoutProgress = Math.round((completed / exercises) * 100);
    if (isNaN(workoutProgress)) {
        workoutProgress = 0;
        completed = 0;
        exercises = 0;
    }

    const RADIAN = Math.PI / 180;
    const data: Data[] = [
        {
            name: 'Planned exercises for the week',
            value: exercises,
            color: '#727ee588',
        },
    ];

    const cx = 150;
    const cy = 200;
    const iR = 50;
    const oR = 100;
    const value = completed;

    const needle = (
        value: number,
        data: Data[],
        cx: number,
        cy: number,
        iR: number,
        oR: number,
        color: string
    ) => {
        let total = 0;
        data.forEach((v) => {
            total += v.value;
        });

        const ang = 180.0 * (1 - value / total);
        const length = (iR + 2 * oR) / 3;
        const sin = Math.sin(-RADIAN * ang);
        const cos = Math.cos(-RADIAN * ang);
        const r = 5;
        const x0 = cx + 5;
        const y0 = cy + 5;
        const xba = x0 + r * sin;
        const yba = y0 - r * cos;
        const xbb = x0 - r * sin;
        const ybb = y0 + r * cos;
        const xp = x0 + length * cos;
        const yp = y0 + length * sin;

        return [
            <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
            <path
                d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
                stroke="#none"
                fill={color}
            />,
        ];
    };

    return (
        <div className="overall-progress">
            <h4>Overall weekly progress</h4>
            <TimeFrame />
            <p>{!userExercises ? 0 : workoutProgress}% done</p>
            <PieChart
                className="user-pie-chart pie-style"
                width={400}
                height={350}
            >
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={data}
                    cx={cx}
                    cy={cy}
                    innerRadius={iR}
                    outerRadius={oR}
                    fill="#8884d8"
                    stroke="none"
                >
                    {data.map((entry: Data, index: number) => (
                        <Cell key={index} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                {needle(value, data, cx, cy, iR, oR, '#727ee5')}
            </PieChart>
        </div>
    );
}
