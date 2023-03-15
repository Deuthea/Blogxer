import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { currentBlog, getBlog } from "../../features/blog/blogSlice";
import { api } from "../../config.js";
import ReactHtmlParser from "html-react-parser";
import Loader from "../Loader/Loader";

const endPoint = api.endPoint;

const Blogs = () => {
  const blogs1 = useSelector((state) => state.blog.blogs);
  const [state, setState] = useState(blogs1);
  const dispatch = useDispatch();
  const avgWordsPM = 250;
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(`${endPoint}/api/blog/`);
      const data = await response.json();
      console.log(data);
      setState(data.Blogs);
      dispatch(getBlog(data.Blogs));
      setLoading(false);
    })();
  }, []);

  const blogs = useSelector((state) => state.blog.blogs);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  else {
    return (
      <div>
        {!loading && state?.length == 0 && (
          <p className="text-center"> OOPs! No blogs Found</p>
        )}
        {!loading ? (
          state?.map((blog) => (
            <div key={blog._id} className="mb-3 mt-2 bg-white border-bottom">
              <Link
                to={`/blog`}
                onClick={() => dispatch(currentBlog(blog))}
                class="mb-10 block    rounded-lg p-4  shadow-3xl  shadow-gray-100"
              >
                <img
                  alt="Home"
                  src="https://source.unsplash.com/random"
                  class="h-56 md:h-80 w-full    mr-5 rounded-md object-cover"
                />

                <div class="mt-2">
                  <dl>
                    <div>
                      <dt class="sr-only">Title</dt>

                      <dd class=" text-xl font-medium mb-2"> {blog.title}</dd>
                    </div>
                    <div>
                      <dt class="sr-only">Date</dt>

                      <dd class="text-sm text-gray-500">
                        {" "}
                        {blog.updatedBy.name} ·{" "}
                        {new Date(blog.createdAt).toDateString()} ·{" "}
                        {Math.ceil(
                          blog?.content.split(" ").length / avgWordsPM
                        )}{" "}
                        min read
                      </dd>
                    </div>
                  </dl>

                  <div class="mt-6 flex items-center gap-5 text-xs">
                    {blog.tags?.map((tag) => (
                      <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <div class="mt-1.5 sm:mt-0">
                          <p class="font-medium border px-2 py-2 rounded-full hover:shadow-md">
                            {tag}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    );
  }
};

export default Blogs;
