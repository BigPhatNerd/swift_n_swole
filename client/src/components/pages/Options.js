import React from 'react'


const Options = ({ options, selectProduct, history }) => {
  const handlePurchase = option => () => {
    selectProduct(option)
    history.push('/checkout')
  }

  return options.map(option => (
    <div className="product" key={option.id}>
      <section>
        <h2>{option.name}</h2>

        <p>{option.descr}</p>
        <h3>{'$' + option.price}</h3>
        <button type="button" onClick={handlePurchase(option)}>
          PURCHASE
        </button>
      </section>
    </div>
  ))
}

export default Options
