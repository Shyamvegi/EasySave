import React from "react";

export class Counter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count:this.props.val
        };
    }

    render(){
        return(
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={()=>this.setState({count:this.props.val})}>Reset</button>
                <button onClick={()=>this.setState({count:this.state.count+1})}>Increment</button>
            </div>
        );
    }
}