import React from 'react'
import './invoice.css'
function InvoiceList() {
  return (
    <div className='invoice_list'>
      <div className='invoice_list-amount'>
         <div className='invoice_list-amount-1'>
          <h4>Paid Balance</h4>
          <p>2000.00</p>
         </div>
         <div className='invoice_list-amount-2'>
          <h4>Pending Balance</h4>
          <p>300</p>
         </div>
      </div>
      <div className='invoice_list-dashboard'>
        <div></div>
      </div>
    </div>
  )
}

export default InvoiceList
