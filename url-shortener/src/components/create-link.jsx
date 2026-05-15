import {
    Dialog, DialogContent, DialogFooter,
    DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UrlState } from "@/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Globe, LinkIcon, Scissors, Tag } from "lucide-react";
import { BeatLoader } from "react-spinners";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import QRCode from "react-qrcode-logo";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "@/db/apiUrls";
import Error from "./error";

export function CreateLink() {
    const { user } = UrlState();
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const ref = useRef();
    const [errors, setErrors] = useState({});
    const [formValues, setFormValues] = useState({
        title: "",
        longUrl: longLink ? longLink : "",
        customUrl: "",
    });

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        longUrl: yup.string().url("Must be a valid URL").required("Long URL is required"),
        customUrl: yup.string(),
    });

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.id]: e.target.value });
    };

    const { loading, error, data, fn: fnCreateUrl } = useFetch(createUrl, {
        ...formValues,
        user_id: user?.id,
    });

    useEffect(() => {
        if (error === null && data) {
            navigate(`/link/${data[0].id}`);
        }
    }, [error, data]);

    const createNewLink = async () => {
        setErrors({});  // ✅ was seterror([])
        try {
            await schema.validate(formValues, { abortEarly: false });

            const canvas = ref.current.canvasRef.current;
            const blob = await new Promise((resolve) => canvas.toBlob(resolve));

            await fnCreateUrl({ ...formValues, user_id: user.id }, blob);
        } catch (e) {
            const newErrors = {};
            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    };

    return (
        <div>
            <Dialog
                defaultOpen={longLink}
                onOpenChange={(res) => { if (!res) setSearchParams({}); }}
            >
                <DialogTrigger asChild>
                    <Button variant="destructive" className="rounded-full gap-2">
                        <Scissors className="w-4 h-4" />
                        Create New Link
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md bg-[#1a1a1a] border border-white/8 rounded-2xl p-7">
                    <DialogHeader>
                        {formValues?.longUrl && (
                            <QRCode ref={ref} size={250} value={formValues?.longUrl} />
                        )}
                        <DialogTitle className="flex items-center gap-3 text-white">
                            <div className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center">
                                <Scissors className="w-4 h-4 text-red-400" />
                            </div>
                            Create new
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-3 mt-2">
                        <div className="relative">
                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <Input
                                id="title"
                                placeholder="Short link's title"
                                className="pl-10 rounded-full bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11 focus-visible:ring-0 focus-visible:border-white/30"
                                value={formValues.title}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.title && <Error message={errors.title} />}  {/* ✅ errors */}

                        <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <Input
                                id="longUrl"
                                placeholder="Long URL to shorten"
                                className="pl-10 rounded-full bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11 focus-visible:ring-0 focus-visible:border-white/30"
                                value={formValues.longUrl}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.longUrl && <Error message={errors.longUrl} />}  {/* ✅ errors */}

                        <div className="flex items-center bg-white/5 border border-white/10 rounded-full h-11 overflow-hidden">
                            <div className="flex items-center gap-1.5 px-4 border-r border-white/10 h-full shrink-0">
                                <LinkIcon className="w-3.5 h-3.5 text-white/40" />
                                <span className="text-[13px] font-medium text-white/60">tiny-url-nine-rose.vercel.app</span>
                            </div>
                            <span className="text-[13px] text-white/25 px-2 shrink-0">/</span>
                            <Input
                                id="customUrl"
                                placeholder="custom-slug (optional)"
                                className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 font-mono text-[13px] text-white placeholder:text-white/25 px-0 h-full"
                                value={formValues.customUrl}
                                onChange={handleChange}
                            />
                        </div>
                        {error && <Error message={error.message} />}  {/* ✅ error.message */}
                    </div>

                    <DialogFooter className="mt-4 pt-4 border-t border-white/7 flex items-center justify-between sm:justify-between">
                        <p className="text-xs text-white/30">Your link will be ready instantly</p>
                        <Button variant="destructive" className="rounded-full gap-2"
                            onClick={createNewLink} disabled={loading}>
                            <Scissors className="w-3.5 h-3.5" />
                            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}