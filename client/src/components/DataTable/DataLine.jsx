import React from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const DataLine = ({ index, onDelete }) => {

    const handleDelete = () => {
        onDelete(index);
    };

    return (
        <tr className="border-b hover:bg-green-100 bg-gray-100">
            <td className="p-3 px-5">
                <Input type="number" placeholder='1' />
            </td>
            <td className="p-3 px-5 focus:outline-none">
                <Input type="text" placeholder="Nom du joueur" />
            </td>
            <td className="p-3 px-5">
            <Select>
            <SelectTrigger className="w-[180px] active:outline-none focus:outline-none">
              <SelectValue placeholder="Choisir un poste" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="defender">Défenseur</SelectItem>
                <SelectItem value="midfielder">Milieu</SelectItem>
                <SelectItem value="attacker">Attaquant</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
            </td>
            <td className="p-3 px-5 flex justify-end">
                <Button
                    type="button"
                    className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 font-semibold rounded focus:outline-none focus:shadow-outline">
                        Save
                </Button>
                <Button
                    type="button"
                    onClick={handleDelete}
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                    Delete
                </Button>
            </td>
        </tr>
    );
}

export default DataLine;

























