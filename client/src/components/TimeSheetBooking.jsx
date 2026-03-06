import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

const TimeSheetBooking = ({ onTimeSlotSelect, duration = 30, title = "Select a Time Slot" }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Generate time slots (9 AM to 6 PM, 30-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += duration) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      setSubmitted(true);
      if (onTimeSlotSelect) {
        onTimeSlotSelect({ date: selectedDate, time: selectedTime });
      }
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Time Slot Selected!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {selectedDate} at {selectedTime}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Select your preferred date and time for a {duration}-minute session
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Select Date *
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            Select Time *
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-64 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  selectedTime === time
                    ? 'bg-yellow-400 text-primary-900 border-2 border-yellow-400 shadow-glow-yellow'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 border border-gray-200 dark:border-gray-600'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
          {selectedTime && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Selected: <span className="font-semibold">{selectedTime}</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!selectedDate || !selectedTime}
          className="w-full btn-cta shadow-glow-yellow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Time Slot
        </button>
      </form>
    </div>
  );
};

export default TimeSheetBooking;

