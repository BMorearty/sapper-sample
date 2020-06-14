import posts from './_posts.js';

const lookup = new Map();
posts.forEach(post => {
	lookup.set(post.slug, JSON.stringify(post));
});

export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

  res.setHeader('X-Is-Brian', req.session.isBrian ? 'true' : 'false');

	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
