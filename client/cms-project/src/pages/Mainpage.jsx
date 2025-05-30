import React from 'react';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

// Extend Day.js with the plugin
dayjs.extend(isSameOrAfter);

const RECURRENCE_OPTIONS = ['None', 'Daily', 'Weekly', 'Monthly'];

export default function Mainpage() {
  const navigate = useNavigate();
  const [schedules, setSchedules] = React.useState([]);
  const [task, setTask] = React.useState('');
  const [currentMonth, setCurrentMonth] = React.useState(dayjs());
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [currentTime, setCurrentTime] = React.useState(dayjs());
  const [hour, setHour] = React.useState('12');
  const [minute, setMinute] = React.useState('00');
  const [amPm, setAmPm] = React.useState('AM');
  const [recurrence, setRecurrence] = React.useState('None');
  const [toastMsg, setToastMsg] = React.useState('');
  const [showToast, setShowToast] = React.useState(false);
  const [editingTaskId, setEditingTaskId] = React.useState(null);
  const [editingTaskValue, setEditingTaskValue] = React.useState('');

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  // Live time update
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load schedules from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('schedules');
    if (saved) setSchedules(JSON.parse(saved));
  }, []);

  React.useEffect(() => {
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }, [schedules]);

  // Show toast helper
  const showToastMsg = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Safe setSelectedDate
  const setSafeSelectedDate = (date) => {
    if (dayjs.isDayjs(date)) {
      setSelectedDate(date);
    } else {
      console.warn('Attempted to set invalid selectedDate:', date);
      setSelectedDate(dayjs());
    }
  };

  // Helper to generate all instances of recurring tasks for a date
  const tasksForSelectedDate = React.useMemo(() => {
    if (!selectedDate || !dayjs.isDayjs(selectedDate)) {
      console.warn('selectedDate is invalid:', selectedDate);
      return [];
    }

    return schedules
      .filter((taskItem) => {
        const taskDate = dayjs(taskItem.datetime);
        const selDateStr = selectedDate.format('YYYY-MM-DD');

        if (taskItem.recurrence === 'None') {
          return taskDate.format('YYYY-MM-DD') === selDateStr;
        } else if (taskItem.recurrence === 'Daily') {
          return selectedDate.isSameOrAfter(taskDate, 'day');
        } else if (taskItem.recurrence === 'Weekly') {
          return (
            selectedDate.isSameOrAfter(taskDate, 'day') &&
            selectedDate.day() === taskDate.day()
          );
        } else if (taskItem.recurrence === 'Monthly') {
          return (
            selectedDate.isSameOrAfter(taskDate, 'day') &&
            selectedDate.date() === taskDate.date()
          );
        }
        return false;
      })
      .sort((a, b) => dayjs(a.datetime).diff(dayjs(b.datetime))); // Sort by time
  }, [schedules, selectedDate]);

  // Determine task status based on current time and completion
  const getTaskStatus = (task) => {
    if (task.completed) return 'Completed';
    const taskTime = dayjs(task.datetime);
    if (currentTime.isAfter(taskTime)) return 'In Progress';
    return 'Upcoming';
  };

  // Add new task with recurrence
  const addSchedule = () => {
    if (!task.trim()) {
      showToastMsg('Please enter a task');
      return;
    }
    if (!selectedDate || !dayjs.isDayjs(selectedDate)) {
      showToastMsg('Invalid date selected');
      console.error('Invalid selectedDate:', selectedDate);
      return;
    }

    const timeString = `${hour.padStart(2, '0')}:${minute} ${amPm}`;
    const fullDateTime = dayjs(
      `${selectedDate.format('YYYY-MM-DD')} ${timeString}`,
      'YYYY-MM-DD hh:mm A'
    );

    setSchedules((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        task,
        datetime: fullDateTime.toISOString(),
        completed: false,
        recurrence,
      },
    ]);
    setTask('');
    setHour('12');
    setMinute('00');
    setAmPm('AM');
    setRecurrence('None');
    showToastMsg('Task added!');
  };

  // Remove task by id
  const removeSchedule = (id) => {
    setSchedules((prev) => prev.filter((item) => item.id !== id));
    showToastMsg('Task removed');
  };

  // Toggle completion by id
  const toggleCompletion = (id) => {
    setSchedules((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Handle drag end for reorder within selected day's tasks
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasksForSelectedDate);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const exactTasks = tasksForSelectedDate.filter((t) => t.recurrence === 'None');
    if (exactTasks.length === 0) return;

    const exactTaskIds = exactTasks.map((t) => t.id);
    const sourceIndexInExact = exactTaskIds.indexOf(result.draggableId);
    if (sourceIndexInExact === -1) return;

    const reorderedExactTasks = Array.from(exactTasks);
    const [removed] = reorderedExactTasks.splice(result.source.index, 1);
    reorderedExactTasks.splice(result.destination.index, 0, removed);

    let newSchedulesCopy = [...schedules];
    let reorderIndex = 0;
    for (let i = 0; i < newSchedulesCopy.length; i++) {
      if (
        exactTaskIds.includes(newSchedulesCopy[i].id) &&
        newSchedulesCopy[i].recurrence === 'None' &&
        dayjs(newSchedulesCopy[i].datetime).format('YYYY-MM-DD') ===
          selectedDate.format('YYYY-MM-DD')
      ) {
        newSchedulesCopy[i] = reorderedExactTasks[reorderIndex];
        reorderIndex++;
      }
    }

    setSchedules(newSchedulesCopy);
  };

  // Start and end days for calendar grid
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

  // Count tasks per day for calendar badge
  const taskCountForDate = (date) => {
    if (!date) return 0;

    const dateStr = date.format('YYYY-MM-DD');
    return schedules.reduce((count, t) => {
      if (t.recurrence === 'None') {
        if (dayjs(t.datetime).format('YYYY-MM-DD') === dateStr) return count + 1;
      } else if (t.recurrence === 'Daily') {
        if (date.isSameOrAfter(dayjs(t.datetime), 'day')) return count + 1;
      } else if (t.recurrence === 'Weekly') {
        if (
          date.isSameOrAfter(dayjs(t.datetime), 'day') &&
          date.day() === dayjs(t.datetime).day()
        )
          return count + 1;
      } else if (t.recurrence === 'Monthly') {
        if (
          date.isSameOrAfter(dayjs(t.datetime), 'day') &&
          date.date() === dayjs(t.datetime).date()
        )
          return count + 1;
      }
      return count;
    }, 0);
  };

  // Handle inline edit start
  const startEditing = (id, currentTask) => {
    setEditingTaskId(id);
    setEditingTaskValue(currentTask);
  };

  // Handle inline edit save
  const saveEditing = (id) => {
    if (!editingTaskValue.trim()) {
      showToastMsg('Task cannot be empty');
      return;
    }
    setSchedules((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: editingTaskValue } : item))
    );
    setEditingTaskId(null);
    setEditingTaskValue('');
    showToastMsg('Task updated');
  };

  // Cancel editing on blur or ESC
  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingTaskValue('');
  };

  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Schedule Tracker</h1>
          <p className="text-sm text-gray-600">
            {dayjs().format('dddd, MMMM D, YYYY')} | {currentTime.format('hh:mm:ss A')}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Calendar */}
      <section className="max-w-md mx-auto mb-8 bg-blue-100 rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}
            aria-label="Previous month"
            className="p-2 rounded-full hover:bg-blue-200 transition"
          >
            ←
          </button>
          <h2 className="text-xl font-semibold text-gray-800">{currentMonth.format('MMMM YYYY')}</h2>
          <button
            onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}
            aria-label="Next month"
            className="p-2 rounded-full hover:bg-blue-200 transition"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold mb-3 text-gray-600">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysArray.map((day, idx) => {
            const isSelected = day && selectedDate && day.isSame(selectedDate, 'day');
            const isToday = day && day.isSame(dayjs(), 'day');
            const taskCount = taskCountForDate(day);

            return (
              <button
                key={idx}
                disabled={!day}
                onClick={() => day && setSafeSelectedDate(day)}
                className={`relative rounded-lg p-2 text-sm
                  ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'}
                  ${isToday && !isSelected ? 'border-2 border-blue-500' : ''}
                  ${!day ? 'opacity-0' : ''}
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition-colors duration-200
                `}
                aria-label={day ? `Select date ${day.format('MMMM D, YYYY')}` : 'Empty date'}
              >
                {day ? day.date() : ''}
                {taskCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5
                    flex items-center justify-center font-bold select-none"
                    aria-label={`${taskCount} task${taskCount > 1 ? 's' : ''} on this day`}
                  >
                    {taskCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Task input */}
      <section className="max-w-md mx-auto mb-8 p-4 border rounded-lg shadow-lg bg-white">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Add Task for {selectedDate ? selectedDate.format('MMMM D, YYYY') : '...'}
        </h3>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Task description"
          />

          <div className="flex gap-2 items-center">
            <label htmlFor="hour" className="sr-only">
              Hour
            </label>
            <select
              id="hour"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[...Array(12)].map((_, i) => {
                const h = (i + 1).toString().padStart(2, '0');
                return (
                  <option key={h} value={h}>
                    {h}
                  </option>
                );
              })}
            </select>
            <span className="text-gray-600">:</span>
            <label htmlFor="minute" className="sr-only">
              Minute
            </label>
            <select
              id="minute"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {['00', '15', '30', '45'].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <label htmlFor="amPm" className="sr-only">
              AM/PM
            </label>
            <select
              id="amPm"
              value={amPm}
              onChange={(e) => setAmPm(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {['AM', 'PM'].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="recurrence" className="block mb-1 font-medium text-gray-700">
              Recurrence
            </label>
            <select
              id="recurrence"
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select task recurrence"
            >
              {RECURRENCE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={addSchedule}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </div>
      </section>

      {/* Tasks list - Updated to show selected date and added media queries */}
      <section className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 task-list-section">
        <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2 task-list-header">
          <span>Task for</span>
          <span className="text-blue-600 animate-dateFadeIn">
            {selectedDate ? selectedDate.format('dddd, MMMM D, YYYY') : '...'}
          </span>
          <span>🎯</span>
        </h3>

        {tasksForSelectedDate.length === 0 ? (
          <p className="italic text-gray-500 select-text">
            No tasks for this day.
          </p>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-3 bg-blue-100 font-semibold text-gray-800 task-list-grid-header">
              <div>Time</div>
              <div>Task</div>
              <div>Status</div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="tasks-droppable">
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="divide-y divide-gray-200"
                  >
                    {tasksForSelectedDate.map((item, idx) => {
                      const status = getTaskStatus(item);
                      return (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={idx}
                          isDragDisabled={item.recurrence !== 'None'}
                        >
                          {(provided, snapshot) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`grid grid-cols-3 gap-4 p-3 items-center task-list-item
                                ${snapshot.isDragging ? 'bg-blue-50' : 'bg-white'}
                                transition-colors duration-200
                              `}
                            >
                              <div className="text-gray-700">
                                {dayjs(item.datetime).format('hh:mm A')}
                              </div>
                              <div className="flex items-center gap-2">
                                {editingTaskId === item.id ? (
                                  <input
                                    type="text"
                                    value={editingTaskValue}
                                    onChange={(e) => setEditingTaskValue(e.target.value)}
                                    onBlur={() => saveEditing(item.id)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') saveEditing(item.id);
                                      else if (e.key === 'Escape') cancelEditing();
                                    }}
                                    autoFocus
                                    className="p-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    aria-label="Edit task"
                                  />
                                ) : (
                                  <p
                                    onDoubleClick={() => startEditing(item.id, item.task)}
                                    className={`truncate cursor-text ${
                                      item.completed ? 'line-through text-gray-400' : ''
                                    }`}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') startEditing(item.id, item.task);
                                    }}
                                    role="textbox"
                                    aria-readonly="true"
                                  >
                                    {item.task}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-medium
                                    ${
                                      status === 'Completed'
                                        ? 'bg-green-100 text-green-800'
                                        : status === 'In Progress'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }
                                  `}
                                >
                                  {status}
                                </span>
                                <button
                                  onClick={() => removeSchedule(item.id)}
                                  aria-label={`Remove task ${item.task}`}
                                  className="text-red-500 hover:text-red-600 transition"
                                >
                                  ✕
                                </button>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}
      </section>

      {/* Toast */}
      {showToast && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          bg-blue-500 text-white px-5 py-3 rounded-lg shadow-lg
          opacity-0 animate-fadeIn"
          style={{ animationFillMode: 'forwards' }}
          role="alert"
          aria-live="assertive"
        >
          {toastMsg}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translate(-50%, -55%);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
        @keyframes dateFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-dateFadeIn {
          animation: dateFadeIn 0.6s ease forwards;
        }
        .task-list-header {
          white-space: nowrap; /* Prevent wrapping */
          overflow: hidden; /* Hide overflow */
          text-overflow: ellipsis; /* Add ellipsis if text overflows */
        }
        /* Media Queries */
        @media (max-width: 640px) {
          .task-list-section {
            padding: 1rem; /* Reduce padding on smaller screens */
          }
          .task-list-header {
            font-size: 1rem; /* Smaller font size */
            gap: 0.5rem; /* Reduce gap between elements */
          }
          .task-list-grid-header {
            font-size: 0.875rem; /* Smaller header text */
            padding: 0.5rem; /* Reduce padding */
          }
          .task-list-item {
            font-size: 0.875rem; /* Smaller text in task items */
            gap: 0.5rem; /* Reduce gap between columns */
            padding: 0.5rem; /* Reduce padding */
          }
          .task-list-item .grid-cols-3 {
            grid-template-columns: 1fr 2fr 1fr; /* Adjust column proportions */
          }
        }
        @media (max-width: 480px) {
          .task-list-section {
            max-width: 100%; /* Full width on very small screens */
          }
          .task-list-header {
            font-size: 0.875rem; /* Even smaller font size */
          }
          .task-list-grid-header {
            font-size: 0.75rem; /* Smaller header text */
          }
          .task-list-item {
            font-size: 0.75rem; /* Smaller text */
            padding: 0.25rem; /* Further reduce padding */
          }
        }
      `}</style>
    </div>
  );
}