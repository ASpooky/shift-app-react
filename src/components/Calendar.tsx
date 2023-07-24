import { useNavigate } from 'react-router-dom'
import { useCallback, useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import allLocales from '@fullcalendar/core/locales-all'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { useQueryShifts } from '../hooks/useQueeyShift'

//icons
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { useQueryClient } from '@tanstack/react-query'

export function Calendar() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const handleDateClick = useCallback((arg: DateClickArg) => {
    navigate('/create-shift', { state: { date: arg.dateStr } })
  }, [])
  const { data, isLoading } = useQueryShifts()
  const { logoutMutation } = useMutateAuth()
  const logout = async () => {
    await logoutMutation.mutateAsync()
    queryClient.removeQueries(['shifts'])
  }

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locales={allLocales}
        locale="ja"
        events={data?.map((shift) => ({
          id: shift.id.toString(),
          start: shift.starttime,
          endTime: shift.endtime,
        }))}
        dateClick={handleDateClick}
        eventClick={function (info) {
          navigate('/update-shift', {
            state: {
              id: info.event.id,
            },
          })
        }}
      />
      <ArrowRightOnRectangleIcon
        onClick={logout}
        className="h-6 w-6 my-6 text-blue-500 cursor-pointer"
      />
      {isLoading ? <p>予定取得中</p> : ''}
    </div>
  )
}
