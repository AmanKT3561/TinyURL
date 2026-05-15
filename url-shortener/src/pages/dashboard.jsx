import { BarLoader } from "react-spinners"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Link2, MousePointerClick, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { UrlState } from "@/context"
import useFetch from "@/hooks/use-fetch"
import { getUrls } from "@/db/apiUrls"
import { getClicksforUrls } from "@/db/apiClicks"
import LinkCard from "@/components/link-card"
import { CreateLink } from "@/components/create-link"
import Error from "@/components/error"

const StatCard = ({ icon, label, value, accent }) => (
  <Card className="border border-white/[0.07] bg-white/[0.03] rounded-2xl hover:border-indigo-500/25 transition-all duration-300">
    <CardHeader className="pb-2">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1 ${accent}`}>
        {icon}
      </div>
      <CardTitle className="text-white/40 text-xs font-medium uppercase tracking-widest">
        {label}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-4xl font-black text-white tabular-nums">
        {value ?? <span className="text-white/20">—</span>}
      </p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();
  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls);
  const { loading: loadingClicks, data: clicks, fn: fnClicks } = useFetch(getClicksforUrls);

  useEffect(() => {
    if (user?.id) fnUrls(user.id);
  }, [user?.id]);

  useEffect(() => {
    if (urls?.length) fnClicks(urls.map((url) => url.id));
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    (url.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Loading bar */}
      {(loading || loadingClicks) && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <BarLoader color="#6366f1" width="100%" height={3} />
        </div>
      )}

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-white/30 text-sm mt-1">
            {user?.email && `Logged in as ${user.email}`}
          </p>
        </div>
        <CreateLink />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<Link2 size={17} className="text-indigo-400" />}
          label="Links Created"
          value={urls?.length}
          accent="bg-indigo-500/15"
        />
        <StatCard
          icon={<MousePointerClick size={17} className="text-violet-400" />}
          label="Total Clicks"
          value={clicks?.length}
          accent="bg-violet-500/15"
        />
      </div>

      {/* My Links section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white/80">My Links</h2>
          <span className="text-white/25 text-sm">{filteredUrls?.length ?? 0} links</span>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 w-4 h-4" />
          <Input
            type="text"
            placeholder="Filter links by title…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 h-11 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl focus-visible:ring-indigo-500 focus-visible:border-indigo-500/50"
          />
        </div>

        {error && <Error message={error?.message} />}

        {/* Link cards */}
        <div className="flex flex-col gap-3">
          {(filteredUrls || []).map((url, i) => (
            <LinkCard key={i} url={url} fetchUrls={fnUrls} userId={user?.id} />
          ))}

          {filteredUrls?.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-dashed border-white/10">
              <Link2 className="text-white/15 mb-3" size={32} />
              <p className="text-white/30 text-sm">
                {searchQuery ? "No links match your search." : "No links yet — create your first one!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
