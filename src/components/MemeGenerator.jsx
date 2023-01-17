import React, { useEffect, useState } from 'react'
import InputText from './InputText'

function MemeGenerator(props) {

    const [topText, setTopText] = useState('')
    const [bottomText, setBottomText] = useState('')
    const [randomImage, setRandomImage] = useState('http://i.imgflip.com/1bij.jpg')
    const [allMemImages, setAllMemImages] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const clearText = () => {
        setTopText('');
        setBottomText('');
    }

    useEffect(() => {
        setIsLoading(true);
        const apiUrl = 'https://api.imgflip.com/get_memes'
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setAllMemImages(data.data.memes);
                setIsLoading(false);
                console.log('This is data')
            });
    }, []);

    const handleChange = (e) => {
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

    const handleSubmit = (e) => {
        e.preventDefault()
        let imgUrl = allMemImages[Math.floor(Math.random() * allMemImages.length)].url
        setRandomImage(imgUrl)
        clearText()
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

MemeGenerator.propTypes = {}

export default MemeGenerator
