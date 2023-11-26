import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetSinglePostQuery } from "../../shared/api";

import "../../shared/ui/center/index.css";
import "../../shared/ui/post/index.css";

const SinglePost = () => {
  const item = useParams();
  const { data, isLoading } = useGetSinglePostQuery(item);
  console.log(useParams());
  const navigate = useNavigate();

  return (
    <div className="postWrapper">
      <div>
        {isLoading ? (
          <h1>Loading.... </h1>
        ) : (
          <div className="post">
            <h1>
              {data?.id} {data?.title}
            </h1>
            <h3>{data?.body}</h3>
            <button onClick={() => navigate("/")}>Назад</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
