class NewDrinkForm extends React.Component {
    state = {
        strDrink: '',
        strDrinkThumb: '',
        strIngredient1: '',
        strMeasure1: '',
        strIngredient2: '',
        strMeasure2: '',
        strIngredient3: '',
        strMeasure3: '',
        strIngredient4: '',
        strMeasure4: '',
        strIngredient5: '',
        strMeasure5: '',
        strGlass: '',
        strInstructions: '',
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
                    <label htmlFor='strMeasure1'>Measure</label> 
                    <input id='strMeasure1' type='text' value={this.state.strMeasure1} onChange={this.handleChange}/>
                    <label htmlFor='strIngredient1'>Ingredient</label>
                    <input id='strIngredient1' type='text' value={this.state.strIngredient1} onChange={this.handleChange}/>
                    <label htmlFor='strMeasure2'>Measure</label> 
                    <input id='strMeasure2' type='text' value={this.state.strMeasure2} onChange={this.handleChange}/>
                    <label htmlFor='strIngredient2'>Ingredient</label>
                    <input id='strIngredient2' type='text' value={this.state.strIngredient2} onChange={this.handleChange}/>
                    <label htmlFor='strMeasure3'>Measure</label> 
                    <input id='strMeasure3' type='text' value={this.state.strMeasure3} onChange={this.handleChange}/>
                    <label htmlFor='strIngredient3'>Ingredient</label>
                    <input id='strIngredient3' type='text' value={this.state.strIngredient3} onChange={this.handleChange}/>
                    <label htmlFor='strMeasure4'>Measure</label> 
                    <input id='strMeasure4' type='text' value={this.state.strMeasure4} onChange={this.handleChange}/>
                    <label htmlFor='strIngredient4'>Ingredient</label>
                    <input id='strIngredient4' type='text' value={this.state.strIngredient4} onChange={this.handleChange}/>
                    <label htmlFor='strMeasure5'>Measure</label> 
                    <input id='strMeasure5' type='text' value={this.state.strMeasure5} onChange={this.handleChange}/>
                    <label htmlFor='strIngredient5'>Ingredient</label>
                    <input id='strIngredient5' type='text' value={this.state.strIngredient5} onChange={this.handleChange}/>
                    <label htmlFor='strInstructions'>Instructions</label>
                    <input id='strInstructions' type='text' value={this.state.strInstructions} onChange={this.handleChange}/>
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

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        fetch('/cocktails')
            .then(response => response.json())
            .then(data => this.setState({communityCocktails: data}))
    }

    // deleteCocktail = (id, indexOfItemInArray) => {
    //     console.log(this.states.communityCocktails)
    //     fetch(`/cocktails/${id}`, {
    //         method: "DELETE"
    //     }).then(()=>{
    //         this.setState({
    //             cocktails:[
    //                 ...this.state.communityCocktails.slice(0,indexOfItemInArray), ...this.state.communityCocktails.slice(indexOfItemInArray +1)
    //             ]
    //         })
    //     })
    // }

    render(){
        return (
            <div>
            <NewDrinkForm cocktails={this.state.communityCocktails} handleSubmit={this.handleSubmit}/>
            {this.state.communityCocktails && this.state.communityCocktails.map(drink => {
                            return (
                                <div>
                                <p>{drink.strDrink}</p>
                                <img src={drink.strDrinkThumb}></img>
                                {/* <button>{this.deleteCocktail}Delete</button> */}
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
                    <h2>Try these drinks below, and add your own.</h2>
                    <CommunityCocktail  />
                    <button onClick={this.swapCommunity}>test</button>
                </div>
                }
                {this.state.community === false &&

                <div>
                    <h1>Cocktails</h1>
                    <h2>Find your next favorite drink</h2>
                    <button onClick={this.swapCommunity}>Community Posted Cocktails</button>
                    {this.state.cocktails.drinks && this.state.cocktails.drinks.map(drink => {
                            return (
                                <div>
                                <h3>Try this next time:</h3>
                                <p>{drink.strDrink}</p>
                                <img src={drink.strDrinkThumb}></img>
                                <p>Ingredients:</p>
                                    <p>{drink.strIngredient1}  {drink.strMeasure1}</p>
                                    <p>{drink.strIngredient2}  {drink.strMeasure2}</p>
                                    <p>{drink.strIngredient3}  {drink.strMeasure3}</p>
                                    <p>{drink.strIngredient4}  {drink.strMeasure4}</p>
                                    <p>{drink.strIngredient5}  {drink.strMeasure5}</p>
                                    <p>{drink.strInstructions}</p>
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