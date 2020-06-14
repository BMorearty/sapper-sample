export function post(req, res) {
  console.log(
    `Setting session, isBrian = ${req.session.isBrian ? 'true' : 'false'}`
  );
  req.session.isBrian = true;
  res.end('');
}
