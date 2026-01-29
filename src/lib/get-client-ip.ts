import { headers } from "next/headers"

export const getClientIp = async()=>{
    const h = headers();
    return(
        (await h).get("x-forwarded-for")?.split(",")[0] ??
    (await h).get("x-real-ip") ??
    "unknown"
    )
}