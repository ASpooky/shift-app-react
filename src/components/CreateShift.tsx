import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState, FormEvent, useEffect } from 'react'
import { TfiCalendar, TfiWrite, TfiUnlock } from 'react-icons/tfi'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { useMutateShift } from '../hooks/useMutateShift'

import { useeventState } from '../store'

//icons
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'

//formatter
function todatetimeString(date: Date): string {
  const pad = function (str: string): string {
    return ('0' + str).slice(-2)
  }
  const year = date.getFullYear().toString()
  const month = pad((date.getMonth() + 1).toString())
  const day = pad(date.getDate().toString())
  const hour = pad(date.getHours().toString())
  const min = pad(date.getMinutes().toString())
  return `${year}-${month}-${day}T${hour}:${min}`
}

export const CreateShift = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { editedEvent, updateEditedEvent } = useeventState()
  const back = async () => {
    navigate('/calendar')
  }
  const submitShiftHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('createdShift' + editedEvent.endtime)
    createShiftMutation.mutate({
      starttime: new Date(editedEvent.starttime).toISOString(),
      endtime: new Date(editedEvent.endtime).toISOString(),
    })
  }
  const startdate = location.state.date
  const Lstartdate = todatetimeString(new Date(startdate))
  const { createShiftMutation } = useMutateShift()

  useEffect(() => {
    updateEditedEvent({ id: 0, starttime: Lstartdate, endtime: Lstartdate })
  }, [])

  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div>新規シフト作成</div>
      <form onSubmit={submitShiftHandler}>
        <p>start time</p>
        <input
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          type="datetime-local"
          onChange={(e) =>
            updateEditedEvent({ ...editedEvent, starttime: e.target.value })
          }
          value={editedEvent.starttime}
        />
        <br />
        <p>end time</p>
        <input
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          type="datetime-local"
          onChange={(e) =>
            updateEditedEvent({ ...editedEvent, endtime: e.target.value })
          }
          value={editedEvent.endtime}
        />
        <button className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded">
          Create
        </button>
      </form>
      <button onClick={back}>カレンダーに戻る</button>
    </div>
  )
}
