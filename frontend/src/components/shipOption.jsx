import classnames from "classnames";
import styles1 from "../styles/components/checkout.module.css";

const ShipOption = ({selectShipElement,shippingOptions,index,ship}) => {
    return (
        <>
            <div onClick={ (e) => { selectShipElement(e, ship.rate, index); } }
                className={ classnames(styles1.shipOption, index === shippingOptions.currentSelected && styles1.selected) }
                key={index}>
                <label htmlFor={"ship-" + index} key={index}>
                    { ship.courier_name }: ₹ { Math.ceil(ship.rate).toFixed(2) }
                    <br/>
                    <small>
                    Estimated shipping in { ship.estimated_delivery_days }
                    - { parseInt(ship.estimated_delivery_days) + 2 } days 
                    </small>
                </label>
            </div>
        </>
    )
}

export default ShipOption;