import React from 'react';
import type {MouseEvent} from 'react';

const AddToCart: React.FC<{
  entityId: number;
  renderButton: boolean;
  cartId: string;
  setCartId: React.Dispatch<React.SetStateAction<string>>;
  checkoutUrl: string;
  setCheckoutUrl: React.Dispatch<React.SetStateAction<string>>;
}> = ({entityId, renderButton, cartId, setCartId, checkoutUrl, setCheckoutUrl}) => {
  const [disable, setDisable] = React.useState(false);
  const [added, setAdded] = React.useState(false);

  const addToCart = async (e: MouseEvent<HTMLButtonElement>) => {
    setAdded(false);
    setDisable(true);
    e.preventDefault();
    const productId = (e.target as HTMLElement).id;
    const data = {product_id: productId, cartId: cartId};
    const res = await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    setCartId(resData.cartId);
    setCheckoutUrl(resData.url);
    setDisable(false);
    setAdded(true);
  };

  if (renderButton) {
    return (
      <div className="d-flex justify-content-between align-items-baseline">
        <button
          disabled={disable}
          className="btn btn-dark"
          id={entityId.toString()}
          onClick={addToCart}
        >
          {disable ? 'Adding to Cart...' : 'Add to Cart'}
        </button>
        {added && (
          <a className="fw-bold" href={checkoutUrl} target="_blank" rel="noreferrer">
            Checkout
          </a>
        )}
      </div>
    );
  }
  if (!renderButton) {
    return (
      <div className="d-flex justify-content-between align-items-baseline">
        <button disabled className="btn btn-dark">
          Not Available
        </button>
      </div>
    );
  }
  return (
    <div className="d-flex justify-content-between align-items-baseline">
      <button disabled className="btn btn-dark">
        Loading...
      </button>
    </div>
  );
};

export default AddToCart;
