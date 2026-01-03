'use client'

import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns'

interface ScheduledVideo {
  id: string
  date: Date
  title: string
  status: 'planned' | 'published' | 'draft'
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [scheduledVideos, setScheduledVideos] = useState<ScheduledVideo[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [formData, setFormData] = useState({ title: '', status: 'planned' as const })

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setShowModal(true)
    setFormData({ title: '', status: 'planned' })
  }

  const handleSave = () => {
    if (selectedDate && formData.title) {
      const newVideo: ScheduledVideo = {
        id: Date.now().toString(),
        date: selectedDate,
        title: formData.title,
        status: formData.status,
      }
      setScheduledVideos([...scheduledVideos, newVideo])
      setShowModal(false)
      setFormData({ title: '', status: 'planned' })
    }
  }

  const getVideosForDate = (date: Date) => {
    return scheduledVideos.filter(video => 
      format(video.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Content Calendar</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            ← Prev
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Next →
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map(day => {
            const videos = getVideosForDate(day)
            const isCurrentMonth = isSameMonth(day, currentDate)
            const isCurrentDay = isToday(day)
            
            return (
              <div
                key={day.toString()}
                onClick={() => handleDateClick(day)}
                className={`min-h-24 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                  !isCurrentMonth ? 'opacity-30' : ''
                } ${isCurrentDay ? 'border-primary-500 border-2 bg-primary-50' : 'border-gray-200'}`}
              >
                <div className={`text-sm font-semibold mb-1 ${isCurrentDay ? 'text-primary-600' : 'text-gray-700'}`}>
                  {format(day, 'd')}
                </div>
                {videos.map(video => (
                  <div
                    key={video.id}
                    className={`text-xs p-1 rounded mb-1 truncate ${
                      video.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : video.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                    title={video.title}
                  >
                    {video.title}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              Schedule Video for {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter video title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="planned">Planned</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
