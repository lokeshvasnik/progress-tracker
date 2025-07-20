import {create} from 'zustand'

const useUserStore = create((set) => ({
    user: null,
    entries: [],
    setUser: (user) => set({user}),
    setEntries: (entries) => set({entries}),
}))

export default useUserStore;