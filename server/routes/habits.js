import User from '../models/user.js';

/**
 * Defines routes related to user habits.
 *
 * @param {Object} router - Express router.
 * @returns {Object} - Express router.
 */
export default function (router) {
  // ------------ HABITS ROUTE ------------

    /**
     * GET: Fetches all habits for a user.
     */
    router.route('/users/:email/habits').get(async (req, res) => {
        try {
        const email = req.params.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ message: 'User not found' });
        }

        const habits = user.habits;
        res.json({ habits });
        } catch (err) {
        res.status(500).json({ message: 'ERROR: Unknown error occurred.', data: {} });
        }
    });

    /**
     * POST: Adds a new habit for a user.
     */
    router.route('/users/:email/habits').post(async (req, res) => {
        try {
        const email = req.params.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const newHabitName = req.body.name;
        const existingHabit = await User.findOne({
            email,
            habits: { $elemMatch: { name: newHabitName } },
        });

        if (existingHabit) {
            return res.status(409).json({ message: 'Habit already exists!' });
        }

        const newHabit = {
            name: newHabitName,
            colour: req.body.colour,
            type: req.body.type,
            state: {},
        };

        await User.updateOne({ email }, { $push: { habits: newHabit } });
        const updatedUser = await User.findOne({ email });

        return res.json({
            message: 'New habit successfully added!',
            data: updatedUser,
        });
        } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'ERROR: Unknown error occurred.' });
        }
    });

    // ------------ HABIT ROUTE ------------

    /**
     * PUT: Updates details of a specific habit for a user.
     */
    router.route('/users/:email/habits/:habitName').put(async (req, res) => {
        try {
        const email = req.params.email;
        const existingHabitName = req.params.habitName;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'ERROR: User not found!' });
        }

        const existingHabit = await User.findOne({
            email,
            habits: { $elemMatch: { name: existingHabitName } },
        });

        if (!existingHabit) {
            return res.status(404).json({ message: 'Habit does not exist!' });
        }

        const newName = req.body.name;

        if (!newName) {
            return res.json({ message: 'ERROR: Name is required!' });
        }

        const foundIndex = existingHabit.habits.findIndex(
            (x) => x.name == existingHabitName
        );

        const newColour = req.body.colour ? req.body.colour : existingHabit.habits[foundIndex].colour;
        const newStateDate = req.body.stateDate;
        const newState = req.body.state;

        if (newState !== null && newStateDate) {
            existingHabit.habits[foundIndex].state[newStateDate] = newState;
        }

        const modifiedHabit = {
            name: newName,
            colour: newColour,
            type: existingHabit.habits[foundIndex].type,
            state: existingHabit.habits[foundIndex].state,
        };

        existingHabit.habits[foundIndex] = modifiedHabit;
        await User.updateOne(
            { email },
            { habits: existingHabit.habits }
        );

        const replacedHabits = await User.findOne({ email });

        res.json({
            message: 'Habit details successfully changed',
            data: replacedHabits,
        });
        } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'ERROR: Unknown error occurred.' });
        }
    });

    /**
     * DELETE: Removes a specific habit for a user.
     */
    router.route('/users/:email/habits/:habitName').delete(async (req, res) => {
        try {
        const email = req.params.email;
        const existingHabitName = req.params.habitName;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'ERROR: User not found!' });
        }

        const existingHabit = await User.findOne({
            email,
            habits: { $elemMatch: { name: existingHabitName }},
        });

        if (!existingHabit) {
            return res.status(409).json({ message: 'Habit does not exist!' });
        }

        const foundIndex = existingHabit.habits.findIndex(
            (x) => x.name == existingHabitName
        );

        existingHabit.habits.splice(foundIndex, 1);
        await User.updateOne(
            { email },
            { habits: existingHabit.habits }
        );

        const replacedHabits = await User.findOne({ email });

        res.json({
            message: 'Habit deleted',
            data: replacedHabits,
        });
        } catch (err) {
        res.status(500).json({ message: 'ERROR: Unknown error occurred.' });
        }
    });

    return router;
};