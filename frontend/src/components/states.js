
const States = (states)=>{
    

    return (
        <>
         <select id="state" name="state"  required onChange={(e)=>{
                let elem = e.target
                if(elem.value.length)
                elem.style.color = "#000000"
                else{
                    elem.style.color = "rgba(0, 0, 0, 0.5)"
                }
            }} >
                <option value={""} >State</option>
                {
                     states.states.length>0?states.states.map((x,n)=>{
                        return <option value={x.value} key={n}>{x.name}</option>
                    }):<></>
                }
        </select>
        </>
    )
}

export default States;