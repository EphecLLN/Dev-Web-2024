import React, { useState, useEffect } from "react";
import DataHeader from "./DataTable/DataHeader";
import DataLine from "./DataTable/DataLine";

export default function DataTable() {
    const [dataLines, setDataLines] = useState([]);

    useEffect(() => {
        addLine(); 
    }, []);

    const addLine = () => {
        setDataLines([...dataLines, <DataLine key={dataLines.length} onDelete={deleteLine} index={dataLines.length} />]);
    };

    const deleteLine = (indexToDelete) => {
        setDataLines(dataLines.filter((_, index) => index !== indexToDelete));
    };

    return (
        <div>
            <div className="text-gray-900">
                <div className="px-3 py-4 flex justify-center">
                    <table className="w-full text-md bg-green-700 shadow-md rounded mb-4">
                        <tbody>
                            <DataHeader />
                            {dataLines.map((line, index) => (
                                <DataLine key={index} index={index} onDelete={deleteLine} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={addLine}>
                        Ajouter une ligne
                    </button>
                </div>
            </div>
        </div>
    );
}






