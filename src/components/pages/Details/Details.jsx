import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import videoService from "../../../services/video";
import Navbar from "../../Navbar";

const CommentForm = ({ user }) => {
  const { id } = useParams();

  const [comment, setComment] = useState("");

  if (!user) {
    return <button type="submit">you need to login</button>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🚀 ~ file: Details.jsx:20 ~ handleSubmit ~ id:", id);
    console.log("🚀 ~ file: Details.jsx:20 ~ handleSubmit ~ comment:", comment);
    const request = await videoService.postCommentOfVideo({
      queryKey: ["details", id, comment],
    });
    console.log("🚀 ~ file: Details.jsx:25 ~ handleSubmit ~ request:", request);
    if (request.status === 201) {
      setComment("");
    }
  };

  return (
    <div className="comment-form">
      <h2>Leave a comment</h2>
      <h3>{user.username}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const CommentContainer = ({ comments }) => {
  return (
    <div className="comment-container">
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <p>{comment.comment}</p>
          <p>{comment.username}</p>
        </div>
      ))}
    </div>
  );
};

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

const Details = ({ user, setUser }) => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery(["details", id], async () => {
    const [commentData, productData] = await Promise.all([
      videoService.getCommentOfVideo({ queryKey: ["details", id] }),
      videoService.getProductOfVideo({ queryKey: ["details", id] }),
    ]);
    return { commentData, productData };
  });

  console.log("🚀 ~ file: Details.jsx:32 ~ Details ~ data:", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { commentData, productData } = data;

  const product = productData;
  console.log("🚀 ~ file: Details.jsx:44 ~ Details ~ product:", product);
  const comment = commentData;
  console.log("🚀 ~ file: Details.jsx:46 ~ Details ~ comment:", comment);

  const embed =
    "https://" + product[0].productVideo.replace("watch?v=", "embed/");

  console.log("🚀 ~ file: Details.jsx:105 ~ Details ~ embed:", embed);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <div className="flex space-between">
        <div className="sidebar w-1/4 p-4 ">
          <ul className="menu relative overflow-y-scroll">
            {product.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-grow flex flex-row items-center justify-center">
          <div>
            <iframe
              width="560"
              height="315"
              src={embed}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>

        <div className="comment sidebar w-1/4 p-4 scrollable">
          <div className="comments-sidebar overflow-scroll">
            <CommentContainer comments={comment} />
            <CommentForm user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
