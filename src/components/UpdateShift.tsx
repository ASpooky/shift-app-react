import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState, FormEvent, useEffect } from 'react'
import { TfiCalendar, TfiWrite, TfiUnlock } from 'react-icons/tfi'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { useMutateShift } from '../hooks/useMutateShift'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Shift } from '../types'

import { useeventState } from '../store'

//icons
import { ArrowRightOnRectangleIcon, TrashIcon } from '@heroicons/react/24/solid'

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

export const UpdateShift = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { editedEvent, updateEditedEvent } = useeventState()
  const back = async () => {
    navigate('/calendar', { state: { message: 'ok' } })
  }
  const submitShiftHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateShiftMutation.mutate({
      id: Number(editedEvent.id),
      starttime: new Date(editedEvent.starttime).toISOString(),
      endtime: new Date(editedEvent.endtime).toISOString(),
    })
  }

  const id = location.state.id
  const one = queryClient
    .getQueryData<Shift[]>(['shifts'])!
    .filter((shift) => shift.id == id)
    .values()
    .next()

  console.log(one)

  const Lstartdate = todatetimeString(new Date(one.value.starttime))
  const Lenddate = todatetimeString(new Date(one.value.created_at))
  const { updateShiftMutation, deleteShiftMutation } = useMutateShift()

  useEffect(() => {
    updateEditedEvent({ id: id, starttime: Lstartdate, endtime: Lenddate })
  }, [])

  return (
    <div className="flex justify-center items-center  min-h-screen text-gray-600 font-mono">
      <div className="flex-col">
        <div>シフト更新</div>
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
            Update
          </button>
        </form>
        <button onClick={back}>カレンダーに戻る</button>
      </div>
      <div className="flex-col">
        <div>
          <br />
        </div>
        <div>
          <br />
        </div>
        <div>
          <br />
        </div>
        <div>
          <br />
        </div>
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => {
            deleteShiftMutation.mutate(id)
          }}
        />
      </div>
    </div>
  )
}
