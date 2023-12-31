import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import videoService from "../../../services/video";
import Navbar from "../../Navbar";
import ProductCard from "./ProductCard";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

const Details = ({ user, setUser }) => {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery(["details", id], async () => {
    const [commentData, productData] = await Promise.all([
      videoService.getCommentOfVideo({ queryKey: ["details", id] }),
      videoService.getProductOfVideo({ queryKey: ["details", id] }),
    ]);
    return { commentData, productData };
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg justify-items-center"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { commentData, productData } = data;

  const product = productData;
  const comment = commentData;
  const embed =
    "https://" + product[0].productVideo.replace("watch?v=", "embed/");
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <div className="flex space-between">
        <div className="flex flex-col">
          <div className="p-4">
            <h1 className="text-xl font-bold text-center">Products</h1>
          </div>
          <div className="sticky max-h-screen overflow-y-scroll">
            <ul className="menu">
              {product.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-grow flex flex-row items-center justify-center">
          <div>
            <iframe
              width="560"
              height="315"
              src={embed}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"
            />
          </div>
        </div>

        <div className=" w-1/4 p-4">
          <div>
            <h1 className="text-xl font-bold text-center">Comments</h1>
          </div>
          <div className="sticky overflow-y-scroll max-h-screen p-4">
            <ul>
              {comment.map((comment) => (
                <li key={comment.id}>
                  <CommentCard comment={comment} />
                </li>
              ))}
            </ul>
          </div>
          <CommentForm user={user} />
        </div>
      </div>
    </>
  );
};

export default Details;
