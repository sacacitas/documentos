/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import * as localeEn from '../../lang/en.json';
import * as localeEs from '../../lang/es.json';

import { Tolgee, DevTools, FormatSimple, TolgeeInstance } from "@tolgee/web";

var SUBDOMAIN = 'en' // default

var i18nTagName = 'i18n-id'

const tg_base = Tolgee()
	.use(FormatSimple())


var tg: TolgeeInstance


function isTargetTitle(element) {
	return element.tagName === 'title'
}
function isTargetMetaDesc(element) {
	return element.tagName === 'meta' && (['description', 'og:description', 'twitter:description'].includes(element.getAttribute('name')))
}


class ElementReplacer {
	element(element) {
		// console.log(`Replacer element: ${element.tagName}`);


		var haveTranslation = element.getAttribute(i18nTagName)


		// Title handle
		if (haveTranslation && isTargetTitle(element)) {
			// console.log(`Replace Title:`)
			element.setInnerContent(tg.t(haveTranslation))
		} else if (isTargetTitle(element)) {
			// console.log("Remove Title")
			element.remove()
		}


		// Meta handle
		if (haveTranslation && isTargetMetaDesc(element)) {
			// console.log("Replace Meta")
			element.setAttribute('content', tg.t(haveTranslation))
		} else if (!haveTranslation && isTargetMetaDesc(element)) {
			// console.log("Remove Meta")
			element.remove()
		}

	}
}



async function ParseRequest(req) {
	const res = await fetch(req)
	// const res = await fetch('https://es.sacacitas.com/')


	const url = new URL(req.url)

	const subdom_lang = url.hostname.split(".")[0]

	if (subdom_lang.length == 2) { // es, en, etc.
		SUBDOMAIN = subdom_lang
	}


	// console.log(`sub: ${SUBDOMAIN}`);

	tg = tg_base.init({
		language: SUBDOMAIN,
		staticData: {
			en: localeEn,
			es: localeEs,
		}
	})

	// console.log("Start")

	// Check what can be done
	return new HTMLRewriter()
		.on(`meta,title`, new ElementReplacer())
		.transform(res)
}


addEventListener("fetch", (event) => {

	// console.log(event)
	event.respondWith(
		ParseRequest(event.request).catch(
			(err) => new Response(err.stack, { status: 500 })
		)
	);
});
