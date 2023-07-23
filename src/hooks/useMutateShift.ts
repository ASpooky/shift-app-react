import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useeventState } from '../store'
import { useError } from './useError'
import { Shift } from '../types'
import { P } from '@fullcalendar/core/internal-common'

export const useMutateShift = () => {
  const queryClient = useQueryClient()
  const { switchErrorHandling } = useError()
  const navigate = useNavigate()
  const resetEditedEvent = useeventState((state) => state.resetEditedEvent)

  const createShiftMutation = useMutation(
    (shift: Omit<Shift, 'id' | 'created_at' | 'updated_at'>) =>
      axios.post<Shift>(`${process.env.REACT_APP_API_URL}/shifts`, shift),
    {
      onSuccess: (res) => {
        const previousShifts = queryClient.getQueryData<Shift[]>(['shifts'])
        if (previousShifts) {
          queryClient.setQueryData(['shifts'], [...previousShifts, res.data])
        }
        resetEditedEvent()
        navigate('/calendar')
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )

  const updateShiftMutation = useMutation(
    (shift: Omit<Shift, 'created_at' | 'updated_at'>) =>
      axios.put<Shift>(
        `${process.env.REACT_APP_API_URL}/shifts/${shift.id}`,
        shift
      ),
    {
      onSuccess: (res, variables) => {
        const previousShifts = queryClient.getQueryData<Shift[]>(['shifts'])
        if (previousShifts) {
          queryClient.setQueryData<Shift[]>(
            ['shifts'],
            previousShifts.map((shift) =>
              shift.id == variables.id ? res.data : shift
            )
          )
        }
        resetEditedEvent()
        navigate('/calendar')
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )
  const deleteShiftMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/shifts/${id}`),
    {
      onSuccess: (_, variables) => {
        const previousShifts = queryClient.getQueryData<Shift[]>(['shifts'])
        if (previousShifts) {
          queryClient.setQueryData<Shift[]>(
            ['shifts'],
            previousShifts.filter((shift) => shift.id !== variables)
          )
        }
        resetEditedEvent()
        navigate('/calendar')
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )
  return {
    createShiftMutation,
    updateShiftMutation,
    deleteShiftMutation,
  }
}
