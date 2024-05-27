//Components
import Liste_membre from '@components/Gestion/Liste_membre.jsx'
import Liste_attente from '@components/Gestion/Liste_attente.jsx'

//React router
import { useNavigate } from 'react-router-dom'

//CSS
import "./CSS(S)/Gestionnaire.css"

function Gestionnaire(){

    const redirect = () => {
        document.location.href="/gestionnaire_inscription";
    }

    const getInscription = () => {
        useNavigate("/gestionnaire_inscription", {replace : true});
    }

    return (
        <>
            <Liste_membre />
            <Liste_attente />
            <button class="inscriptgestion" onClick={redirect}>Inscription</button>
        </>
    );
}

export default Gestionnaire