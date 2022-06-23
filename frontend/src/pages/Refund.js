import { useEffect } from 'react';
import styles from '../styles/components/privacy.module.css'
const Refund = ()=>{
    useEffect(()=>{
        window.scrollTo(0,0);
    })
    return (
        <>
        <div className={styles.privacyWrap}>
    <h1>Refund and Cancellation Policy</h1>


<p>Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.<br/>

To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.<br/>

Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers or magazines cannot be returned. <br/>

<br/>
To complete your return, we require a receipt or proof of purchase.<br/>
Please do not send your purchase back to the manufacturer.<br /></p>
<br />
<p>There are certain situations where only partial refunds are granted: (if applicable)<br />
* Book with obvious signs of use<br />
* CD, DVD, VHS tape, software, video game, cassette tape, or vinyl record that has been opened.<br />
* Any item not in its original condition, is damaged or missing parts for reasons not due to our error.<br />
* Any item that is returned more than 30 days after delivery</p>
<h2>Refunds (if applicable)</h2>
<p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.<br />
If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.
</p>
<h2>Late or missing refunds (if applicable)</h2>
<p>If you haven’t received a refund yet, first check your bank account again.<br />
Then contact your credit card company, it may take some time before your refund is officially posted.<br />
Next contact your bank. There is often some processing time before a refund is posted.<br />
If you’ve done all of this and you still have not received your refund yet, please contact us at nmandureja@gmail.com.</p>
<h2>Sale items (if applicable)</h2>
<p>Only regular priced items may be refunded, unfortunately sale items cannot be refunded.
</p>
<h2>Exchanges (if applicable)</h2>
<p>We only replace items if they are defective or damaged.  If you need to exchange it for the same item, send us an email at nmandureja@gmail.com and send your item to: E-195 Kamla Nagar, Agra, UP, 282005, India.
</p>
<h2>Gifts</h2>
<p>If the item was marked as a gift when purchased and shipped directly to you, you’ll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.<br/>
If the item wasn’t marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and he will find out about your return.</p>
<h2>Shipping</h2>
To return your product, you should mail your product to: E-195 Kamla Nagar, Agra, UP, 282005, India.<br />

You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund. <br/>

Depending on where you live, the time it may take for your exchanged product to reach you, may vary.<br />

If you are shipping an item over Rs.75, you should consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.</div></>);
}
export default Refund;