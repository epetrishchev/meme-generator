import React, { useEffect } from 'react'
import InputText from './InputText'
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

function MemeGenerator(props: any) {

    const [topText, setTopText] = useMemStore(
        (state) => [state.topText, state.setTopText]
    );
    const [bottomText, setBottomText] = useMemStore(
        (state) => [state.bottomText, state.setBottomText]
    );
    const [randomImage, setRandomImage] = useMemStore(
        (state) => [state.randomImage, state.setRandomImage]
    );
    const [allMemImages, fetchAllMemImages] = useMemStore(
        (state) => [state.allMemImages, state.fetchAllMemImages]
    );
    const [isLoading, setIsLoading] = useMemStore(
        (state) => [state.isLoading, state.setIsLoading]
    );

    useEffect(() => {
        setIsLoading(true);
        fetchAllMemImages();
        setIsLoading(false);
        console.log('This is data')
    }, [fetchAllMemImages, setIsLoading]);

    const clearText = () => {
        setTopText('');
        setBottomText('');
    }

    const handleChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.target;
        switch (name) {
            case 'topText':
                setTopText(value);
                break;
            case 'bottomText':
                setBottomText(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let imgUrl = allMemImages[Math.floor(Math.random() * allMemImages.length)].url
        setRandomImage(imgUrl);
        clearText();
    }

    return (
        <div>
            <form className='meme-form' onSubmit={handleSubmit}>
                <InputText
                    name="topText"
                    placeholder="Top Text"
                    value={topText}
                    handleChange={handleChange}
                />
                <InputText
                    name="bottomText"
                    placeholder="Bottom Text"
                    value={bottomText}
                    handleChange={handleChange}
                />
                <button
                    name='gen_button'
                >Gen
                </button>
            </form>
            <div className='meme'>
                <img src={randomImage} alt="" />
                <h2 className='top' >{topText}</h2>
                <h2 className='bottom' >{bottomText}</h2>
            </div>
        </div>
    )
}

export default MemeGenerator
