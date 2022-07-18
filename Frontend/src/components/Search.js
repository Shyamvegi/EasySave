import {getContent} from './getContent';

function Search(){
    return(
        <div className='App-Search'>
            <form id='url-form'>
                <input name='url' type='url' placeholder='Paste Link'/>
            </form>
            <button id='btn' onClick = {getContent} onKeyDown = {getContent} >Download</button>
        </div>
    );
}

const Download = ()=><h1 id='demo'></h1>;

export  {Search,Download};