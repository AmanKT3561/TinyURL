import DeviceStats from "@/components/device-stats";
import Location from "@/components/location-stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, LinkIcon, MousePointerClick, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

const LinkPage = () => {
  const downloadImage = () => {
    const anchor = document.createElement("a");
    anchor.href = url?.qr;
    anchor.download = url?.title;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const navigate = useNavigate();
  const { user } = UrlState();
  const { id } = useParams();
  const { loading, data: url, fn, error } = useFetch(getUrl);
  const { loading: loadingStats, data: stats, fn: fnStats } = useFetch(getClicksForUrl);
  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl);

  useEffect(() => { fn({ id, user_id: user?.id }); }, []);
  useEffect(() => { if (!error && loading === false) fnStats(id); }, [loading, error]);

  if (error) navigate("/dashboard");

  const link = url?.custom_url ?? url?.short_url ?? "";
  const shortUrl = `https://tiny-url-nine-rose.vercel.app/${link}`;

  return (
    <div className="pb-16">
      {(loading || loadingStats) && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <BarLoader width="100%" color="#6366f1" height={3} />
        </div>
      )}

      <div className="flex flex-col gap-8 sm:flex-row sm:items-start justify-between">
        {/* Left column */}
        <div className="flex flex-col gap-6 sm:w-2/5">
          {/* Title */}
          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2 font-medium">Link title</p>
            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight hover:text-indigo-300 transition-colors cursor-default">
              {url?.title}
            </h1>
          </div>

          {/* Short URL */}
          <div className="rounded-xl border border-indigo-500/25 bg-indigo-500/10 px-4 py-3">
            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1 font-medium">Short link</p>
            <a
              href={shortUrl}
              target="_blank"
              className="text-indigo-300 font-semibold text-base hover:text-indigo-200 transition-colors break-all"
            >
              {shortUrl}
            </a>
          </div>

          {/* Original URL */}
          <div className="flex items-start gap-2 text-white/35 text-sm">
            <LinkIcon size={14} className="mt-0.5 shrink-0 text-white/20" />
            <a
              href={url?.original_url}
              target="_blank"
              className="hover:text-white/60 transition-colors break-all"
            >
              {url?.original_url}
            </a>
          </div>

          {/* Created at */}
          <p className="text-white/20 text-xs">
            Created {url?.created_at ? new Date(url.created_at).toLocaleString() : "—"}
          </p>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              className="border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white rounded-lg flex items-center gap-1.5 text-xs"
            >
              <Copy size={13} />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadImage}
              className="border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white rounded-lg flex items-center gap-1.5 text-xs"
            >
              <Download size={13} />
              QR Code
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fnDelete(id).then(() => navigate("/dashboard"))}
              disabled={loadingDelete}
              className="border-red-500/20 bg-red-500/5 text-red-400/70 hover:bg-red-500/15 hover:text-red-400 rounded-lg flex items-center gap-1.5 text-xs ml-auto"
            >
              {loadingDelete ? <BeatLoader size={4} color="#f87171" /> : <><Trash2 size={13} /> Delete</>}
            </Button>
          </div>

          {/* QR code */}
          {url?.qr && (
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 flex items-center justify-center">
              <img
                src={url.qr}
                className="w-40 h-40 object-contain rounded-lg"
                alt="QR Code"
              />
            </div>
          )}
        </div>

        {/* Right column — Stats */}
        <Card className="sm:w-3/5 border border-white/[0.07] bg-white/[0.03] rounded-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-white">Analytics</CardTitle>
              {stats?.length !== undefined && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/25">
                  <MousePointerClick size={12} className="text-indigo-400" />
                  <span className="text-indigo-300 text-xs font-semibold">{stats.length} clicks</span>
                </div>
              )}
            </div>
          </CardHeader>

          {stats && stats.length ? (
            <CardContent className="flex flex-col gap-6">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-white/30 text-xs uppercase tracking-widest mb-1 font-medium">Location Data</p>
                <Location stats={stats} />
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-white/30 text-xs uppercase tracking-widest mb-1 font-medium">Device Info</p>
                <DeviceStats stats={stats} />
              </div>
            </CardContent>
          ) : (
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border border-dashed border-white/[0.07]">
                <MousePointerClick className="text-white/15 mb-3" size={28} />
                <p className="text-white/25 text-sm">
                  {loadingStats === false ? "No clicks yet" : "Loading statistics…"}
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default LinkPage;
