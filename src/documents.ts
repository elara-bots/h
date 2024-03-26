import type { Env, ReturnResponse } from "./interfaces";
import { error, html, json, generateHTML, fetchBin, createBin } from "./utils";

export const GetDocument = async (
    request: Request,
    env: Env,
): ReturnResponse => {
    const url = new URL(request.url);
    if (url.pathname.includes("/documents/")) {
        const [, id] = url.pathname.split("/documents/");
        const r = await fetchBin(env, id.split(".")[0]);
        if (!r) {
            return error(`I was unable to fetch the haste contents`);
        }
        return json({ status: true, ...r.data, data: r.data.content });
    }
    return html(generateHTML());
}

export const PostDocument = async (
    request: Request,
    env: Env,
): ReturnResponse => {
    const content = await request.text();
    if (!content) {
        return error(`You failed to provide any content.`);
    }
    const r = await createBin(env, content);
    if (!r) {
        return error(`I was unable to create the haste.`);
    }
    return json({ status: true, ...r.data, data: r.data.content });
}