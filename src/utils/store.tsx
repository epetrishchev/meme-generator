import { create } from "zustand"

type State = {
    topText: string
    bottomText: string
    randomImage: string
    allMemImages: any[]
    isLoading: boolean
}

type Action = {
    setTopText: (topText: State['topText']) => void
    setBottomText: (bottomText: State['bottomText']) => void
    setRandomImage: (randomImage: State['randomImage']) => void
    fetchAllMemImages: () => void
    setIsLoading: (isLoading: State['isLoading']) => void
}

const useMemStore = create<State & Action>((set) => ({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
    allMemImages: [],
    isLoading: false,
    setTopText: (topText) => set({ topText }),
    setBottomText: (bottomText) => set({ bottomText }),
    setRandomImage: (randomImage) => set({ randomImage: randomImage }),
    fetchAllMemImages: async () => {
        const response = await fetch('https://api.imgflip.com/get_memes')
        const data = await response.json()
        set({ allMemImages: data.data.memes })
    },
    setIsLoading: (isLoading) => set({ isLoading: isLoading }),
}))

export default useMemStore