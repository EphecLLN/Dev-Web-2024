import { useState } from 'react'

import axios from "axios";

function Joueur_form(){

    const [nom, setName] = useState("");
    const [prenom, setSur] = useState("");
    const [naissance, setBirth] = useState(Date.now());
    const [email, setMail] = useState("");
    const [telephone, setTel] = useState("");
    const [adresse, setAdresse] = useState("");
    const [postal, setPostal] = useState(1000);
    const [postejeu, setEmplacement] = useState("Ailier");
    const [vma, setVma] = useState("0");
    const [fitness, setFit] = useState("");
    const [saut, setSaut] = useState(0);
    const poste = "Joueur";
    const status = "En attente";


    function handleVMA(){
        let pal = document.getElementById("VMApalier").value;
        let res = document.getElementById("VMAres").value;
        document.getElementById("VMAtable").innerHTML += "<tr><td>"+pal+"</td><td>"+res+"</td></tr>";
        setVma(pal)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8000/gestionnaire/add", {
            nom,
            prenom,
            naissance,
            email,
            telephone,
            adresse,
            postal,
            postejeu,
            vma,
            fitness,
            saut,
            poste,
            status,
          });
        } catch (error) {
          console.log("Erreur au POST");
          console.error(error.message);
        }
    };

    return (
        <>
            <h2>Formulaire pour joueur (Sans inscription)</h2>
            <form onSubmit={handleSubmit}>
                <hr/>
                <h3>Donnée personnelles</h3>
                <fieldset className="name-field">
                    <label for="nomId"> Nom : </label>
                    <input type="text" name="nom" id="nomId" onChange={(e) => setName(e.target.value)}/>
                </fieldset>
                <fieldset className="surname-field">
                    <label for="prenomId"> Prénom : </label>
                    <input type="text" name="prenom" id="prenomId" onChange={(e) => setSur(e.target.value)}/>
                </fieldset>
                <fieldset className="age-field">
                    <label for="ageId"> Date de naissance : </label>
                    <input type="Date" name="age" id="ageid" onChange={(e) => setBirth(e.target.value)}/>
                </fieldset>
                <fieldset className="mail-field">
                    <label for="mailId"> E-mail : </label>
                    <input type="email" name="email" id="mailId" onChange={(e) => setMail(e.target.value)}/>
                </fieldset>
                <fieldset className="phone-field">
                    <label for="telId"> Téléphone : </label>
                    <input type="text" name="phone" id="telId" onChange={(e) => setTel(e.target.value)}/>
                </fieldset>
                <fieldset className="addresse-field">
                    <label for="addId"> Adresse : </label>
                    <input type="text" name="adresse" id="addId" onChange={(e) => setAdresse(e.target.value)}/>
                </fieldset>
                <fieldset className="code-field">
                    <label for="codeId"> Code postal : </label>
                    <input type="text" name="codePostal" id="codeId" onChange={(e) => setPostal(e.target.value)}/>
                </fieldset>
                <fieldset className="poste-field">
                    <label for="posteId"> Poste de jeu : </label>
                    <select name="poste" id="posteId" onChange={(e) => setEmplacement(e.target.value)}>
                        <option value="Ailier">Ailier</option>
                        <option value="Attaquant de pointe">Attaquant de pointe</option>
                        <option value="Milieu offensif">Milieu offensif</option>
                        <option value="Milieu défensif">Milieu défensif</option>
                        <option value="Défenseur centrale">Défenseur centrale</option>
                        <option value="Latérale">Latérale</option>
                        <option value="Gardien de but">Gardien de but</option>
                    </select>
                </fieldset>
                <h3>Tests</h3>
                <fieldset>
                    <legend>VAMEVAL</legend>
                    <div class="container">
                        <div id="VMAdata">
                            <input type="text" id="VMApalier" placeholder="Entrer un palier" />
                            <input type="text" id="VMAres" placeholder="Entrer un kilomètre par heure" />
                            <input type="button" value="Add" onClick={handleVMA}/>
                        </div>
                        <table id="VMAtable">
                            <thead>
                                <tr>
                                    <th>Paliers</th>
                                    <th>Résultats</th>
                                </tr>
                            </thead>
                            <tbody id="VMAtable">
                            </tbody>
                        </table>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>30 - 15 Fitness test</legend>
                    <label for="fitness">Vitesse Maximal Intermittente : </label>
                    <input type="text" name="fitnesstest" id="fitness" required onChange={(e) => setFit(e.target.value)}></input>
                </fieldset>
                <fieldset>
                    <legend>Saut</legend>
                    <label for="saut">Hauteur maximale : </label>
                    <input type="number" placeholder="En centimètre" required onChange={(e) => setSaut(e.target.value)}></input>
                </fieldset>
                <button type="submit">Enregistrer</button>
            </form>
        </>
    );
}

export default Joueur_form;