import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Shift } from '../types'
import { useError } from '../hooks/useError'

export const useQueryShifts = () => {
  const { switchErrorHandling } = useError()
  const getshifts = async () => {
    const { data } = await axios.get<Shift[]>(
      `${process.env.REACT_APP_API_URL}/shifts`,
      { withCredentials: true }
    )
    return data
  }
  return useQuery<Shift[], Error>({
    queryKey: ['shifts'],
    queryFn: getshifts,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
}
