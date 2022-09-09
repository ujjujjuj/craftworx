import { useEffect, useRef } from "react"

const States = ({states,updateUserInfo,currentValue})=>{
    let selectState = useRef()
    useEffect(()=>{
        if(currentValue.length>0){
            selectState.current.value = currentValue
            selectState.current.style.color="#000000"
        }
    })
    useEffect(()=>{
        if(currentValue.length===0)
        {selectState.current.value=""
        selectState.current.style.color = "rgba(0, 0, 0, 0.5)"}

    },[states,currentValue])
    return (
        <>
         <select id="state" name="state" ref={selectState} required onChange={(e)=>{
                let elem = e.target
                if(elem.value.length){
                elem.style.color = "#000000"
                updateUserInfo((userPayInfo) => ({
                    ...userPayInfo,
                    state:elem.value,
                }))
            }
                else{
                    elem.style.color = "rgba(0, 0, 0, 0.5)"
                    updateUserInfo((userPayInfo) => ({
                        ...userPayInfo,
                        state:""
                    }))
                }
            }} >
                <option value={""} >State</option>
                {
                     states?.length>0?states.map((x,n)=>{
                        return <option value={x.name} key={n}>{x.name}</option>
                    }):<></>
                }
        </select>
        </>
    )
}

export default States;