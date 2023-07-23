import { create } from 'zustand'

type EditedEvent = {
  id: number
  starttime: string
  endtime: string
}

type eventState = {
  editedEvent: EditedEvent
  updateEditedEvent: (payload: EditedEvent) => void
  resetEditedEvent: () => void
}

export const useeventState = create<eventState>((set) => ({
  editedEvent: {
    id: 0,
    starttime: '0001-01-01T00:00',
    endtime: '0001-01-01T00:00',
  },
  updateEditedEvent: (payload) =>
    set({
      editedEvent: payload,
    }),
  resetEditedEvent: () =>
    set({
      editedEvent: {
        id: 0,
        starttime: '0001-01-01T00:00',
        endtime: '0001-01-01T00:00',
      },
    }),
}))
