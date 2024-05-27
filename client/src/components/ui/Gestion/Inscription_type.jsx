import Joueur_form from './Joueur_form.jsx'
import Staff_form from './Staff_form.jsx'
import { useState } from 'react'

function Inscription_type(){

    const [value, setValue] = useState(<Joueur_form/>)

    const options = [
        {label: "Joueur sans inscription", value: 1},
        {label: "Staff sans inscription", value: 2}
    ];

    function handleSelect(event){
        if(event.target.value == 1){
            setValue(<Joueur_form/>);
        }else{
            setValue(<Staff_form/>);
        }
    }

    return (
        <div>
            <h1>Inscription</h1>
            <select name="membre" id="liste" onChange={handleSelect}>
                {options.map(option => (<option value={option.value}>{option.label}</option>))}
            </select>
            {value}
        </ div>
    );
}

export default Inscription_type;