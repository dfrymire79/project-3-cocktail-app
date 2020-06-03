class NewDrinkForm extends React.Component {
    state = {
        strDrink: '',
        strDrinkThumb: ''
    }

    handleChange = (event) => {
        // setState is a built-in method of the React library
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render(){
        return (
                <form className='newDrink' onSubmit={(ev) => this.props.handleSubmit(ev, this.state)}>
                    <label htmlFor='strDrink'>Drink Name</label>
                    <input id='strDrink' type='text' value={this.state.strDrink} onChange={this.handleChange}/>
                    <label htmlFor='strDrinkThumb'>Image Link</label>
                    <input id='strDrinkThumb' type='text' value={this.state.strDrinkThumb} onChange={this.handleChange}/>
                    <input type='submit' />
                </form>
        )
    }
}

class CommunityCocktail extends React.Component {
    state = {
        communityCocktails: [],

    }

    handleSubmit = (event, newFormState) => {
        event.preventDefault();
        console.log(newFormState)
        fetch('/cocktails', {
            body: JSON.stringify(newFormState),
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(newDrink => {
                // newDrink.strDrink = newFormState.strDrink
                // newDrink.strDrinkThumb = newFormState.strDrinkThumb
                console.log(newDrink)
                this.setState({
                    communityCocktails: [...this.state.communityCocktails, newDrink],
                    strDrink: '',
                    strDrinkThumb: ''
                })
                // console.log(this.state.cocktails)
            })
    }

    getData = () => {
        fetch('/cocktails')
            .then(response => response.json())
            .then(data => this.setState({communityCocktails: data}))
    }

    render(){
        return (
            <div>
            <NewDrinkForm cocktails={this.state.communityCocktails} handleSubmit={this.handleSubmit}/>
            {this.state.communityCocktails && this.state.communityCocktails.map(drink => {
                            return (
                                <div>
                                <p>{drink.strDrink}</p>
                                <img src={drink.strDrinkThumb}></img>
                                </div>
                    
                            )
                        })
                    }
            </div>
        )
    }
}


class App extends React.Component {
    state = {
        cocktails: [],
        baseURL: "https://www.thecocktaildb.com/api/json/v1/",
        apikey: "1/",
        query: "filter.php?i=",
        ingredient: '',
        searchURL: "",
        community: false
    }

    componentDidMount(){
        this.setState({
            // ingredient: 'scotch',
            query: 'random.php',
            searchURL: this.state.baseURL + this.state.apikey
        }, () => {
            fetch(this.state.searchURL + this.state.query)
            .then(response => response.json())
            .then(data => this.setState({cocktails: data}))
        })
        // fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
        // this.getData();
    }

    // getData = () => {
        // this.setState({
        //     ingredient: 'margarita',
        //     searchURL: this.state.baseURL + this.state.apikey + this.state.query + this.state.ingredient
        // })
        // console.log(this.state.ingredient)
        // console.log(this.state.searchURL)
        // // fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
        // fetch(this.state.searchURL + this.state.ingredient)
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        //     this.setState({cocktails: data})
        // })
    // }

    // handleChange = (event) => {
    //     // setState is a built-in method of the React library
    //     this.setState({
    //         [event.target.id]: event.target.value
    //     })
    // }

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     this.setState({
    //         searchURL: this.state.baseURL + this.state.apikey + this.state.query + this.state.ingredient
    //     }, () => {
    //         fetch(this.state.searchURL).then((response) => {
    //             return response.json();

    //         }).then((data) => {
    //             console.log(data);
    //             this.setState({
    //                 drink: data,
    //                 ingredient: ''
    //             })
    //         }, err => console.log(err));
    
    //     })
    // }

    // handleSubmit = (event, newFormState) => {
    //     event.preventDefault();
    //     fetch('/cocktails', {
    //         body: JSON.stringify(newFormState),
    //         method: "POST",
    //         headers: {
    //             'Accept': 'application/json, text/plain, */*',
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(response => response.json())
    //         .then(newDrink => {
    //             // newDrink.strDrink = newFormState.strDrink
    //             // newDrink.strDrinkThumb = newFormState.strDrinkThumb
    //             this.setState({
    //                 cocktails: {drinks: [...this.state.cocktails.drinks, newDrink]},
    //                 strDrink: '',
    //                 strDrinkThumb: ''
    //             })
    //             // console.log(this.state.cocktails)
    //         })
    // }

    swapCommunity = () => {
        this.setState({
            community: !this.state.community
        })
    }

    render(){
        // this for some reason prints out 2 console logs, one of the cocktails arr and one of just an object containing 5 drinks
        // i suspect the 2nd console log prints with the populated array b/c there is a delay as the brower awaits the fetch, and as the body re-renders it console.logs again
        // console.log(this.state.cocktails)
        return (
            <div>
                {this.state.community &&
                <div>
                    <h1>Community Posted Cocktails</h1>
                    <CommunityCocktail  />
                    <button onClick={this.swapCommunity}>test</button>
                </div>
                }
                {this.state.community === false &&

                <div>
                    <h1>Cocktails</h1>
                    <button onClick={this.swapCommunity}>test</button>
                    {this.state.cocktails.drinks && this.state.cocktails.drinks.map(drink => {
                            return (
                                <div>
                                <p>{drink.strDrink}</p>
                                <img src={drink.strDrinkThumb}></img>
                                </div>
                    
                            )
                        })
                    }
                </div>
                }
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));