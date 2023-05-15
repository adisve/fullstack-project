export function TimeFrame() {
    function startOfWeek(): Date {
        const today = new Date();
        const dayOfWeek = today.getDay() || 7;
        return new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1 - dayOfWeek
        );
    }

    function weekStart() {
        const fullDate = String(startOfWeek());
        return fullDate.split(' ').slice(0, 3).join(' ');
    }

    function weekEnd() {
        const startDate = startOfWeek();
        const fullDate = String(
            new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate() + 6
            )
        );
        return fullDate.split(' ').slice(0, 3).join(' ');
    }
    return (
        <p>
            {weekStart()} - {weekEnd()}
        </p>
    );
}
