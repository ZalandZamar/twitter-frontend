import { useEffect } from "react";
import { useDataContext } from "../context/useDataContext";
import { feed } from "../functions/feed";
import useAxiosPrivate from "../functions/useAxiosPrivate";
import { logout } from "../functions/logout";
import { useNavigate } from "react-router";
import { ROUTES } from "../functions/routes";

export const UserFeed = () => {
  const { posts, setPosts, cursor, setCursor } = useDataContext();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserFeed = async () => {
      const res = await feed(axiosPrivate, null); // Always start with null cursor for initial load
      setPosts(res.posts);
      setCursor(res.nextCursor);
    };

    if (posts.length === 0) {
      // Only fetch if no posts loaded yet
      getUserFeed();
    }
  }, [axiosPrivate, posts.length, setPosts, setCursor]);

  const loadMore = async () => {
    if (cursor) {
      const res = await feed(axiosPrivate, cursor);
      setPosts((prev) => [...prev, ...res.posts]);
      setCursor(res.nextCursor);
    }
  };

  return (
    <div className="bg-white text-black">
      {posts.map((item) => {
        return (
          <div key={item._id}>
            <p>{item._id}</p>
          </div>
        );
      })}
      {cursor && <button onClick={loadMore}>Load More</button>}
      <button
        className="bg-red-600 py-2.5 px-3.5 border-0 rounded[4px]  block"
        onClick={() => {
          logout();
          navigate(ROUTES.AUTHPAGE);
        }}
      >
        Log out
      </button>
    </div>
  );
};
