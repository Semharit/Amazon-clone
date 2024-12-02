import React from 'react'
import numeral from 'numeral'

function CurrencyFormat({amount}) {
    const CurrencyFormatted=numeral(amount).format("$0'0.00")
  return (
    <div>
        {CurrencyFormatted}

    </div>
  )
}

export default CurrencyFormat