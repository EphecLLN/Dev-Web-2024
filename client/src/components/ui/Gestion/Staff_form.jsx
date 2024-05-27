function Staff_form(){
    return (
        <>
            <form method="post" action="">
                <h2>Formulaire pour staff (Sans inscription)</h2>
                <hr/>
                <h3>Donnée personnelles</h3>
                <fieldset className="name-field">
                    <label for="nomId"> Nom : </label>
                    <input type="text" name="nom" id="nomId" />
                </fieldset>
                <fieldset className="surname-field">
                    <label for="prenomId"> Prénom : </label>
                    <input type="text" name="prenom" id="prenomId" />
                </fieldset>
                <fieldset className="age-field">
                    <label for="ageId"> Age : </label>
                    <input type="number" name="age" id="ageid" placeholder="Au moins 5 ans" min={5}/>
                </fieldset>
                <fieldset className="mail-field">
                    <label for="mailId"> E-mail : </label>
                    <input type="email" name="email" id="mailId"/>
                </fieldset>
                <fieldset className="phone-field">
                    <label for="telId"> Téléphone : </label>
                    <input type="text" name="phone" id="telId"/>
                </fieldset>
                <fieldset className="addresse-field">
                    <label for="addId"> Adresse : </label>
                    <input type="text" name="adresse" id="addId"/>
                </fieldset>
                <fieldset className="code-field">
                    <label for="codeId"> Code postal : </label>
                    <input type="text" name="codePostal" id="codeId"/>
                </fieldset>
                <fieldset className="poste-field">
                    <label for="posteId"> Poste de jeu : </label>
                    <select name="poste" id="posteId">
                        <option value="Staff médical">Médicales</option>
                        <option value="Staff administratif">Administratif</option>
                        <option value="Entraineurs">Entraineur</option>
                    </select>
                </fieldset>
            </form>
        </>
    );
}

export default Staff_form;