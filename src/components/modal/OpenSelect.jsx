import React from 'react';
import Select from 'react-select';

export default function OpenSelect({ stocks, selectedOption, setSelectedOption }) {
    const [isDisable, setIsDisable] = React.useState(false);

    // Wenn ein Trade geupdatet wird, wird diese Componente nicht klickbar sein!
    React.useEffect(() => {
        if (selectedOption === "") {
            setIsDisable(false);
        } else {
            setIsDisable(true);
        }
    }, [])

    console.log("selectedOption:", selectedOption);
    return (
        <Select
            isDisabled={isDisable}
            defaultInputValue={selectedOption}
            isSearchable={true}
            options={stocks}
            onChange={setSelectedOption}
        />
    )
}








