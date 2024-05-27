import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table.jsx";
import Dropdown from '@components/Dropdown/Dropdownmain/Dropdown.jsx'
import DropdownItem from "@components/Dropdown/DropdownItem/DropdownItem.jsx"

//Axios est utilisé pour faire des requêtes à l'API
import axios from 'axios';

function Liste_attente(){

    const [list, setData] = useState([]);
    useEffect(() => {
            axios.get("http://localhost:8000/gestionnaire")
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    //Trier sur nom puis prénom
    list.sort((a,b) => {
        if (a.nom > b.nom){
            return 1;
        }else if (a.nom < b.nom){
            return -1;
        }else if (a.prenom > b.prenom){
            return 1;
        }else if (a.prenom < b.prenom){
            return -1;
        }else{
            return 0;
        }
    });

    const items = ["Décision", "Profil"]

    const membre_list = list.map(person => <TableRow>
        <TableCell className="font-medium">{person.poste}</TableCell>
        <TableCell>{person.nom}</TableCell>
        <TableCell>{person.prenom}</TableCell>
        <TableCell className="text-right">{person.status}</TableCell>
        <TableCell><Dropdown buttonText="Option" content={<>{items.map(item => <DropdownItem key={item}>{item}</DropdownItem>)}</>} /></TableCell>
        </TableRow>);
    
    return(
        <div class="listesection1">
            <div class="listeheader1">
                <h2>Liste d'attente</h2>
            </div>
            <div class="listebody1">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Poste</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Prénom</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                            <TableHead>Profils</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {membre_list}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default Liste_attente;