import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();

  const { loading, data, fn } = useFetch(getLongUrl);
  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks);

  useEffect(() => {
    fn(id);
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats({
        id: data.id,
        originalUrl: data.original_url,
      });
    }
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center gap-6">
        <div className="w-full fixed top-0 left-0">
          <BarLoader width="100%" color="#6366f1" height={3} />
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-lg">
            🔗
          </div>
          <p className="text-white/40 text-sm font-medium tracking-wide">Redirecting you…</p>
        </div>
      </div>
    );
  }

  return null;
};

export default RedirectLink;
