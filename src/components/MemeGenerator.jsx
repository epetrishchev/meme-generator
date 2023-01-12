import React, { Component } from 'react'

export default class MemeGenerator extends Component {

    constructor() {
        super()
        this.state = {
            topText: '',
            bottomText: '',
            randomImage: 'http://i.imgflip.com/1bij.jpg',
            allMemImages: [],
            isLoading: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // При создании компонента запрашиваем данные по API imgflip,
    // и получаем ссылки на 100 различных картинок
    componentDidMount() {
        this.setState({ isLoading: true })
        const apiUrl = 'https://api.imgflip.com/get_memes'
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                this.setState({ allMemImages: data.data.memes, isLoading: false })
                console.log('This is data: ', data.data.memes)
            })
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target
        type === 'checkbox' ?
            this.setState({ [name]: checked }) :
            this.setState({ [name]: value })

    }

    // Случайным образом url картинки из списка картинок форму
    handleSubmit(event) {
        event.preventDefault()
        let allImg = this.state.allMemImages
        let imgUrl = allImg[Math.floor(Math.random() * allImg.length)].url
        this.setState({ randomImage: imgUrl })
    }

    render() {
        return (
            <div>
                <form className='meme-form' onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button
                        name='gen_button'
                    >Gen
                    </button>
                </form>
                <div className='meme'>
                    <img src={this.state.randomImage} alt="" />
                    <h2 className='top' >{this.state.topText}</h2>
                    <h2 className='bottom' >{this.state.bottomText}</h2>
                </div>
            </div>

        )
    }
}
