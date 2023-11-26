import { useGetPostsQuery } from "../../shared/api";
import { useEffect, useState } from "react";
import { Posts } from "../../shared/api";
import { useNavigate } from "react-router-dom";

import "./index.css";
import "../../shared/ui/global/index.css";
import "../../shared/ui/post/index.css";

function MainPage() {
  const navigate = useNavigate();
  const [post, setPost] = useState(1);
  const {
    data = [],
    isLoading,
    error,
    isFetching,
  } = useGetPostsQuery<any>(post);

  const postNav = (item: any) => {
    navigate(`/testprj/${item.id}`);
    navigate(0);
  };

  useEffect(() => {
    console.log(data, isLoading, error);
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        setPost(post + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [data, isFetching]);

  return (
    <>
      <div className="wrapper">
        {isLoading ? (
          <h1 className="postWrapper">Loading...</h1>
        ) : (
          data.map((item: Posts) => (
            <div key={item.title} className="post">
              <div className="title">
                {item.id} {item.title}
              </div>
              <li>
                {item.body.length > 30
                  ? item.body.slice(0, 120) + "..."
                  : item.body}
              </li>
              <button className="btn" onClick={() => postNav(item)}>
                Просмотр
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default MainPage;
