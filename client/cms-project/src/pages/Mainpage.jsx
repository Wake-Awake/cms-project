import React from 'react';
import dayjs from 'dayjs';

export default function Mainpage() {
    const [schedules, setSchedules] = React.useState([]);
    const [task, setTask] = React.useState('');
    const [date, setDate] = React.useState(dayjs().format('YYYY-MM-DD'));
    const [currentMonth, setCurrentMonth] = React.useState(dayjs());
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [darkMode, setDarkMode] = React.useState(false);

    const addSchedule = () => {
        if (task && date) {
            setSchedules([...schedules, { task, date, completed: false }]);
            setTask('');
            setDate(dayjs().format('YYYY-MM-DD'));
        }
    };

    const removeSchedule = (index) => {
        setSchedules(schedules.filter((_, i) => i !== index));
    };

    const toggleCompletion = (index) => {
        setSchedules(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');
    const startDay = startOfMonth.day();
    const totalDays = endOfMonth.date();

    const daysArray = [];
    for (let i = 0; i < startDay; i++) {
        daysArray.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
        daysArray.push(dayjs(currentMonth).date(i));
    }

    const tasksForSelectedDate = selectedDate
        ? schedules.filter(s => s.date === selectedDate.format('YYYY-MM-DD'))
        : [];

    const pendingTasks = schedules.filter(item => !item.completed);
    const completedTasks = schedules.filter(item => item.completed);

    return (
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen p-6 transition-colors duration-300`}>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Schedule Tracker</h1>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-700"
                    >
                        Toggle {darkMode ? 'Light' : 'Dark'} Mode
                    </button>
                </div>

                {/* Add Task Form */}
                <div className="flex flex-col md:flex-row gap-3 mb-6">
                    <input
                        type="text"
                        placeholder="Task"
                        className="border rounded px-3 py-2 flex-1 text-black"
                        value={task}
                        onChange={e => setTask(e.target.value)}
                    />
                    <input
                        type="date"
                        className="border rounded px-3 py-2 text-black"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={addSchedule}
                    >
                        Add
                    </button>
                </div>

                {/* Pending Tasks */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-blue-600">Pending Tasks</h2>
                    {pendingTasks.length === 0 && <p className="text-gray-500">No pending tasks.</p>}
                    <ul>
                        {pendingTasks.map((item, idx) => (
                            <li key={idx} className="flex items-center justify-between bg-blue-100 rounded px-3 py-2 mb-2">
                                <span className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        onChange={() => toggleCompletion(schedules.indexOf(item))}
                                    />
                                    <span className="font-medium">{item.task}</span> — <span className="text-gray-600 ml-2">{item.date}</span>
                                </span>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => removeSchedule(schedules.indexOf(item))}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Completed Tasks */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-green-600">Completed Tasks</h2>
                    {completedTasks.length === 0 && <p className="text-gray-500">No completed tasks.</p>}
                    <ul>
                        {completedTasks.map((item, idx) => (
                            <li key={idx} className="flex items-center justify-between bg-green-100 rounded px-3 py-2 mb-2">
                                <span className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked
                                        className="mr-2"
                                        onChange={() => toggleCompletion(schedules.indexOf(item))}
                                    />
                                    <span className="line-through text-gray-700 font-medium">{item.task}</span> — <span className="text-gray-500 ml-2">{item.date}</span>
                                </span>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => removeSchedule(schedules.indexOf(item))}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Calendar */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-semibold">Calendar — {currentMonth.format('MMMM YYYY')}</h2>
                        <div className="space-x-2">
                            <button
                                onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}
                                className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400"
                            >
                                Prev
                            </button>
                            <button
                                onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}
                                className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400"
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center font-medium text-gray-700 dark:text-gray-300">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day}>{day}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2 mt-2">
                        {daysArray.map((day, idx) => {
                            const formatted = day?.format('YYYY-MM-DD');
                            const hasPending = schedules.some(s => s.date === formatted && !s.completed);
                            const hasCompleted = schedules.some(s => s.date === formatted && s.completed);
                            const isSelected = selectedDate && formatted === selectedDate.format('YYYY-MM-DD');

                            return (
                                <div
                                    key={idx}
                                    onClick={() => day && setSelectedDate(day)}
                                    className={`h-24 border rounded p-2 text-sm flex flex-col items-start justify-start cursor-pointer
                                        transition duration-200 ease-in-out
                                        ${day ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}
                                        ${isSelected ? 'border-blue-500 ring-2 ring-blue-400' : ''}
                                        ${hasPending ? 'bg-blue-100' : ''}
                                        ${hasCompleted && !hasPending ? 'bg-green-100' : ''}
                                        hover:scale-105 hover:shadow-md
                                    `}
                                >
                                    <div className="font-bold">{day ? day.date() : ''}</div>
                                    {hasPending && <div className="mt-1 text-xs text-blue-700">• Pending</div>}
                                    {hasCompleted && !hasPending && <div className="mt-1 text-xs text-green-700">• Done</div>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Tasks for Selected Date */}
                {selectedDate && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-3">
                            Tasks for {selectedDate.format('MMMM D, YYYY')}
                        </h2>
                        {tasksForSelectedDate.length > 0 ? (
                            <ul>
                                {tasksForSelectedDate.map((t, idx) => (
                                    <li key={idx} className={`rounded px-4 py-2 mb-2 ${t.completed ? 'bg-green-100 line-through' : 'bg-blue-100'}`}>
                                        {t.task}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-300">No tasks for this day.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
