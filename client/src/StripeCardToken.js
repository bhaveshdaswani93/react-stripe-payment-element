import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const SaveCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      const { token } = await stripe.createToken(cardElement);

      // Use the token to save the card on your backend
      console.log(token);

      // Reset the form and show success message
      setError(null);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="card-element">Card Details</label>
        <CardElement
          id="card-element"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      {error && <div>{error}</div>}
      <button type="submit" disabled={!stripe || isLoading}>
        {isLoading ? 'Saving...' : 'Save Card'}
      </button>
    </form>
  );
};

export default SaveCardForm;