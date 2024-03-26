/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// These initial Types are based on bindings that don't exist in the project yet,
// you can follow the links to learn how to implement them.
import type { Env, ReturnResponse } from "./interfaces";
import { GetDocument, PostDocument } from "./documents";

export default {
	async fetch(
		request: Request,
		env: Env,
		// ctx: ExecutionContext
	): ReturnResponse {
		if (request.method === "GET") {
			return GetDocument(request, env);
		} else if (request.method === "POST") {
			return PostDocument(request, env);
		}
		return new Response(`Hello World from ${request.method}!`);
	},
};