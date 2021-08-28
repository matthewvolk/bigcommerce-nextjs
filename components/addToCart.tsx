import React from 'react';
import type {MouseEvent} from 'react';
import fetchStoreApi from '../lib/fetchStoreApi';

const AddToCart: React.FC<{entityId: number; renderButton: boolean}> = ({
  entityId,
  renderButton,
}) => {
  const [disable, setDisable] = React.useState(false);
  const [added, setAdded] = React.useState(false);

  const addToCart = async (e: MouseEvent<HTMLButtonElement>) => {
    setAdded(false);
    setDisable(true);
    e.preventDefault();
    const res = await fetchStoreApi('/v3/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        line_items: [
          {
            quantity: 1,
            product_id: (e.target as HTMLElement).id,
          },
        ],
        channel_id: 776474,
      }),
    });
    console.log(res);
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
          <div className="fw-bold" style={{color: 'green'}}>
            Added!
          </div>
        )}
      </div>
    );
  }
  if (!renderButton) {
    return (
      <div className="d-flex justify-content-between align-items-baseline">
        <button disabled className="btn btn-dark">
          Choose Options
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
