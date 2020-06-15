import { NowRequest, NowResponse } from '@vercel/node';

export default function post(req: NowRequest, res: NowResponse) {
  console.log(
    `Setting cookie, isBrian = ${req.cookies.isBrian ? 'true' : 'false'}`
  );
  req.cookies.isBrian = 'true';
  res.send('');
}
