import cron from 'cron';
import { User } from '../db/model';

const job = new cron.CronJob('0 0 0 * * *', async function () {
    try {
        const users = await User.find({
            workoutsForToday: { $exists: true, $not: { $size: 0 } },
        });

        for (const user of users) {
            while (user.workoutsForToday.length > 0) {
                const workout = user.workoutsForToday.pop();
                user.workouts.push(workout);
            }
            await user.save();
        }

        console.log(
            `Moved workouts from workoutsForToday to workouts for ${users.length} user(s).`
        );
    } catch (error) {
        console.error(error);
    }
});
export { job };
