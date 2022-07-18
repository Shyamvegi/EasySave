import { Component } from "react";

export default class CountriesApp extends Component{
    constructor(props){
        super(props);
        this.state={
            countries:[],
            loading:false,
            text:'',
        };
    }

    search(){
        try{
        let url  = `https://restcountries.com/v3.1/name/${this.state.text}`
        console.log(url);
        fetch(url)
        .then((res)=>res.json())
        .then((countries)=>{
            if(countries.status===404){
                throw Error('Not Found');
            }
            this.setState({
                countries:countries,
                loading:false,
            });
        })
        .catch((err)=>{
            this.setState({
                countries:[],
                loading:false,
            });
        });
    }
    catch(err){
        console.log(err);
    }
    }

    changeHandler(value){
        this.setState({
            text:value,
            countries:[],
        });
        // if(this.state.text){
        //     this.search();
        // }
        this.search();
    }


    render(){
        return(
            <div>
            <div>
            <input onChange={(e)=>{
                this.changeHandler(e.target.value);
            }} placeholder="Enter Text"/>
            <button onClick={this.search.bind(this)}>Search</button>
            </div>

            <div>
               <p>{this.state.text}</p> 
               {/* <p>{this.state.countries}</p> */}
               {this.state.loading ? <h3>loading....</h3> : null}
            </div>
            
            <div>
                {this.state.countries!=[] ?this.state.countries.map((country)=>{
                    return(
                        <div style={{
                            padding:'20px 2px',
                            display:'flex',
                            alignItems:'center',
                            }}>
                            <img src={country.flags.png}></img>
                            <h2>{country.name.official}</h2>
                            <span>{country.population}</span>
                        </div>
                    );
                }):null}
            </div>

            </div>
        )
    }
}