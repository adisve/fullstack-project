export function nrOfExrcisesWithinWeek(data: any) {
    const weekStart = new Date();
    weekStart.setHours(0, 0, 0, 0);

    const day = weekStart.getDay();
    const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1);
    weekStart.setDate(diff);
    const weekEnd = new Date(weekStart.getTime());
    weekEnd.setDate(weekEnd.getDate() + 6);
    const filteredData = data.filter((item: any) => {
        const date = new Date(item.created_at);
        console.log(weekStart, date);
        return date >= weekStart && date <= weekEnd;
    });
    return filteredData;
}

export function completedExercises(data: any) {
    return nrOfExrcisesWithinWeek(data).filter(
        (status: any) => status.completed
    ).length;
}

export function notCompletedExercises(data: any) {
    return (
        nrOfExrcisesWithinWeek(data).length -
        nrOfExrcisesWithinWeek(data).filter((status: any) => status.completed)
            .length
    );
}

export function numberOfExercises(data: any) {
    return nrOfExrcisesWithinWeek(data).length;
}

// 2nd graph
export function todoExercises(data: any, day: string) {
    return getDataByDayOfWeek(data, day).length - doneExercises(data, day);
}

export function doneExercises(data: any, day: string) {
    return getDataByDayOfWeek(data, day).filter(
        (status: any) => status.completed
    ).length;
}

function getDataByDayOfWeek(data: any, dayOfWeek: string) {
    const filteredDates = nrOfExrcisesWithinWeek(data).filter((item: any) => {
        const date = new Date(item.created_at);
        const itemDayOfWeek = date.toLocaleString('en-US', {
            weekday: 'short',
        });
        return itemDayOfWeek === dayOfWeek;
    });

    return filteredDates;
}
