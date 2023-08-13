<div>
    <div className="sidebar product, scrollable">
    <ul className="menu p-4 w-80">
            {product.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
    </div>
    <div>

    <div className=" flex flex-row items-center justify-center">
            <div className>
              <iframe
                width="560"
                height="315"
                src={embed}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>

    </div>
    <div className="comment sidebar, scrollable"> 

    </div>
</div>