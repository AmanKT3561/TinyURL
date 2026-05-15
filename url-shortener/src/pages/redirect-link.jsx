import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();

  const { loading, data, fn } = useFetch(getLongUrl);           // ✅ no options
  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks); // ✅ no options

  useEffect(() => {
    fn(id);  // ✅ pass id at call time
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats({                        // ✅ pass live data at call time
        id: data.id,
        originalUrl: data.original_url,
      });
    }
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
};

export default RedirectLink;