import React from 'react';
import type {MouseEvent} from 'react';

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
    setTimeout(() => {
      console.log(`Added Product ${(e.target as HTMLElement).id} to cart!`);
      setDisable(false);
      setAdded(true);
    }, 1000);
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
