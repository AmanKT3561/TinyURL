import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { deleteUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { BeatLoader } from "react-spinners";

const LinkCard = ({ url = [], fetchUrls, userId }) => {

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;


    document.body.appendChild(anchor);


    anchor.click();


    document.body.removeChild(anchor);
  };


  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl);
  return (
    <div className="flex flex-col md:flex-row gap-6 border border-gray-800 p-5 bg-black rounded-2xl hover:border-blue-500 transition-all duration-300">

      <img
        src={url?.qr}
        className="w-32 h-32 object-cover rounded-xl self-start"
        alt="qr code"
      />

      <Link
        to={`/link/${url?.id}`}
        className="flex flex-col flex-1 min-w-0"
      >
        <span className="text-xl md:text-2xl font-bold text-white truncate">
          {url?.title || "Untitled Link"}
        </span>

        <span className="text-blue-400 text-lg font-semibold hover:underline break-all">
          https://tiny-url-nine-rose.vercel.app/
          {url?.custom_url ? url?.custom_url : url?.short_url}
        </span>

        <span className="flex items-center gap-2 text-gray-300 mt-2 break-all hover:text-white transition">
          <LinkIcon size={18} />
          {url?.original_url}
        </span>

        <span className="mt-auto pt-4 text-sm text-gray-500">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() =>
            navigator.clipboard.writeText(`https://tiny-url-nine-rose.vercel.app/${url?.short_url}`)
          }
        >
          <Copy />
        </Button>
        <Button variant="ghost" onClick={downloadImage}>
          <Download />
        </Button>
        <Button
          variant="ghost"
          onClick={() => fnDelete(url.id).then(() => fetchUrls(userId))}
          disable={loadingDelete}
        >
          {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;