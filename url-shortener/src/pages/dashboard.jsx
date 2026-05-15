import { BarLoader } from "react-spinners"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter } from "lucide-react"
import { useEffect, useState } from "react"
import { UrlState } from "@/context"
import useFetch from "@/hooks/use-fetch"
import { getUrls } from "@/db/apiUrls"
import { getClicksforUrls } from "@/db/apiClicks"
import LinkCard from "@/components/link-card"
import { CreateLink } from "@/components/create-link"
import Error from "@/components/error"


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
    (url.title || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );


  return (

    <div className="flex flex-col gap-8">
      {loading || loadingClicks && <BarLoader color="#00BFFF" width={"100%"} />}

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>

          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>

        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clicks</CardTitle>

          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>

        </Card>
      </div>

      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>

      <div className="relative ">
        <Input
          type="text"
          placeholder="Filter links"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        >
        </Input>
        <Filter className="absolute right-2 top-2 p-1" />
      </div>

      {error && <Error message={error?.message} />}
      {(filteredUrls || []).map((url, i) => (
        <LinkCard key={i} url={url} fetchUrls={fnUrls} userId={user?.id} />  
      ))}

    </div>


  )
}

export default Dashboard