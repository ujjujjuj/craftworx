import { useEffect, useRef } from 'react'
import countriesJson from '../utils/countries.json'

const Countries = ({ states, updateUserInfo, currentValue }) => {
    let selectState = useRef()
    let countryIndex = useRef([])
    useEffect(() => {
        if (currentValue?.length > 0) {
            states(countriesJson.data[countryIndex.current[currentValue]].states)
            selectState.current.selectedIndex = countryIndex.current[currentValue] + 1
            selectState.current.style.color = "#000000"
        }else{
            selectState.current.value=""
            selectState.current.style.color = "rgba(0, 0, 0, 0.5)"
        }
    }, [currentValue])
    return (
        <>
            <select id="country" name="country" ref={selectState} required onChange={(e) => {
                let elem = e.target
                if (elem.value > 0 || elem.value) {
                    elem.style.color = "#000000"
                    states(countriesJson.data[elem.value].states)
                    updateUserInfo((userPayInfo) => ({
                        ...userPayInfo,
                        country: countriesJson.data[elem.value].name,
                        state:""
                    }))
                }
                else {
                    elem.style.color = "rgba(0, 0, 0, 0.5)"
                    states([])
                    updateUserInfo((userPayInfo) => ({
                        ...userPayInfo,
                        country: "",
                    }))
                }
            }}>
                <option value={""} >Select a Country</option>
                {
                    countriesJson.data.length ? countriesJson.data.map((x, n) => {
                        countryIndex.current[x.name] = n
                        return <option value={n} data-key={n} key={n}>{x.name}</option>
                    }) : <></>
                }
            </select></>
    )
}

export default Countries;