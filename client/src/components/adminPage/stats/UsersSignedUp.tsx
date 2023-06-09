import { useSelector } from 'react-redux';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import { RootState } from '../../../store/store';

export function UsersSignedUp() {
    const { admin } = useSelector((state: RootState) => state);
    const users = admin.users;

    function month() {
        return new Date().toLocaleString('default', { month: 'long' });
    }
    function day() {
        return new Date().getDate();
    }

    function getSignUpDate() {
        const createdDates = users.map((user: any) => user.created_at);
        return createdDates;
    }

    function getCountByDate(dates: any) {
        const countsByDate: { [key: string]: number } = {};
        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
        });

        const currentMonth = new Date().getMonth();

        dates.forEach((date: any) => {
            const dateObj = new Date(date);
            if (dateObj.getMonth() === currentMonth) {
                const formattedDate = dateFormatter.format(dateObj);
                if (formattedDate in countsByDate) {
                    countsByDate[formattedDate]++;
                } else {
                    countsByDate[formattedDate] = 1;
                }
            }
        });

        const countsArray = [];
        for (const [date, count] of Object.entries(countsByDate)) {
            countsArray.push({ date, count });
        }

        countsArray.sort(
            (a: any, b: any) => +new Date(a.date) - +new Date(b.date)
        );
        return countsArray;
    }

    function userCount() {
        let data = getCountByDate(getSignUpDate());
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const startDate = new Date(currentYear, currentMonth, 1);
        const endDate = new Date(currentYear, currentMonth, day());

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
        });

        const missingDates = [];
        let currentDateObj = startDate;
        while (currentDateObj <= endDate) {
            const formattedDate = dateFormatter.format(currentDateObj);
            if (!data.some((d) => d.date === formattedDate)) {
                missingDates.push({ date: formattedDate, count: 0 });
            }
            currentDateObj.setDate(currentDateObj.getDate() + 1);
        }
        return [...data, ...missingDates];
    }

    function sortByDateUserCount() {
        const sortedData = userCount()
            .map((item) => ({
                date: new Date(`2023 ${item.date}`).getTime(),
                count: item.count,
            }))
            .sort((a, b) => a.date - b.date);

        const finalData = sortedData.map((item) => ({
            date: new Date(item.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            }),
            count: item.count,
        }));

        return finalData;
    }

    return (
        <div className="users-joined">
            <h4>Users joined in {month()}</h4>
            <LineChart
                width={500}
                height={200}
                data={sortByDateUserCount()}
                syncId="anyId"
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    fill="#8884d8"
                />
            </LineChart>
        </div>
    );
}
