import React from 'react';
import Header from './Component/Header';
import AddOption from './Component/AddOption';
import Action from './Component/Action';
import Options from './Component/Options';
import OptionModal from './Component/OptionModal';
import 'normalize.css/normalize.css';
import './App.scss';


class App extends React.Component{

    state = {
        options: [],
        selectedOption:undefined
    };

    handleAddOption=(option)=> {
        if (!option) {
            return 'Enter valid value to add item'; 
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        } 
        this.setState((prevState) =>({
            options:prevState.options.concat(option)
        } 
        ))     
    }
    handleDeleteOptions=()=>{
        this.setState(() => ({
            options:[]
        }))
    }
    handleDeleteOption=(optionToRemove)=> {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove!==option 
           })
        }))
    }
    handlePick=() =>{
        const randOption = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randOption];
        this.setState(() => ({
            selectedOption:option
        }))
    }
    closeModalHandler=()=> {
        this.setState(() => ({
            selectedOption:undefined
        }))
    }
    
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options) {
                
                this.setState(()=>({options}))
            } 
        } catch(e) {
           //do nothing
        }
        
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
            
        }
    
    }
    componentWillUnmount() {
        console.log('component WillUnmpount');
    }

    
    
    
    
    
    //handleDeleteOptions
    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';
        
        return (
            <div>
            <Header subtitle={subtitle} title={title} />
            <div className="container">
            <Action handlePick={this.handlePick} hasOptions={ this.state.options.length >0}/>
              <div className="widget">
              <Options options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions
                }
                handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={ this.handleAddOption}/>
              </div>
            </div>
               
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    closeModalHandler={this.closeModalHandler}
                />
            </div>  
    );
    }
}

export default App