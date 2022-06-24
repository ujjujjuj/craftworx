import countriesJson from '../utils/countries.json'

const Countries = ({states}) => {

    return (
        <>
            <select id="country" name="country"  required onChange={(e)=>{
                let elem = e.target
                if(elem.value>0|| elem.value)
                {
                    elem.style.color = "#000000"
                    states(countriesJson.data[elem.value].states)
                }
                else{
                    elem.style.color = "rgba(0, 0, 0, 0.5)"
                    states([])
                }
            }}>
                <option value={""} >Select a Country</option>
                {
                    countriesJson.data.length?countriesJson.data.map((x,n)=>{
                        return  <option value={n} data-key={n} key={n}>{x.name}</option>
                    }):<></>
                }
            </select></>
    )
}

export default Countries;