import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "react-router-dom"

const Auth = () => {
   let [useSearchParamsarams] = useSearchParams();
  return (
    <div className="mt-36 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        Login / Signup
      </h1>
      </div>
  )
}

export default Auth

// test push 123

