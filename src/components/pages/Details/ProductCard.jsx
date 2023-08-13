const ProductCard = ({ product }) => {
  return (
    <div className="card card-compact w-48 bg-base-100 shadow-xl mb-4">
      <a href={product.productLink} target="_blank" rel="noreferrer">
        <figure>
          <img src={product.productImage} alt={product.productName} />
        </figure>
        <div className="card-body">
          <p>{product.productName}</p>
          <p>{product.productPrice}</p>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
