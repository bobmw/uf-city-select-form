import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useUfCityController() {
    const [data, setData] = useState([]);
    const [ufSelected, setUFSelected] = useState(null);
    const [districtSelected, setDistrictSelected] = useState(null);
    const [ufError, setUfError] = useState(false);
    const [districtError, setDistrictError] = useState(false);

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/distritos')
            .then(({ data }) => setData(data))
            .catch(error => console.error(error));
    }, []);

    const districtByUFList = data.reduce((acc, crr) => {
        const {
            municipio: {
                "regiao-imediata": {
                    "regiao-intermediaria": {
                        UF: { nome, sigla }
                    }
                }
            }
        } = crr;

        const UF = `${nome} (${sigla})`;
        const districtInfo = { id: crr.id, name: crr.nome };

        if (!acc[UF]) {
            acc[UF] = [];
        }

        acc[UF].push(districtInfo);

        return acc;
    }, {});


    const handleSortList = (list) => {
        if (Array.isArray(list)) {
            return list.sort((a, b) => a.localeCompare(b));
        } else {
            return [];
        }
    };

    const ufList = handleSortList(Object.keys(districtByUFList) || []);
    const districtListByUFSelected = districtByUFList[ufSelected] || [];

    const handleUFChange = (_, value) => {
        setDistrictSelected(null);
        setUFSelected(value);
        setUfError(false);
    };

    const handleDistrictChange = (_, value) => {
        setDistrictSelected(value);
        setDistrictError(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setUfError(!ufSelected);
        setDistrictError(!districtSelected);
    };

    return {
        ufSelected,
        districtSelected,
        ufError,
        districtError,
        ufList,
        districtListByUFSelected,
        handleUFChange,
        handleDistrictChange,
        handleSubmit
    };
};
