const axios = require('axios');
const db = require('../models/index.js');
const { User } = db;
const { generateToken } = require('../auth.js');
require('dotenv').config();

exports.googleAuth = (req, res) => {
  const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    response_type: 'code',
    scope: 'openid profile email',
    access_type: 'offline'
  });

  res.redirect(`${googleAuthUrl}?${params.toString()}`);
};

exports.googleAuthCallback = async (req, res) => {
  const code = req.query.code;
  const tokenUrl = 'https://oauth2.googleapis.com/token';
  const tokenParams = {
    code: code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: 'authorization_code'
  };

  try {
    // Google에서 액세스 토큰과 ID 토큰 받기
    const tokenResponse = await axios.post(tokenUrl, tokenParams);
    const { access_token } = tokenResponse.data;

    // Google API를 통해 사용자 정보 받기
    const userInfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const userInfoResponse = await axios.get(userInfoUrl, {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const user = userInfoResponse.data;

    console.log(user); // 디버깅 코드

    // 데이터베이스에서 사용자 검색 또는 생성
    const [userInstance, created] = await User.findOrCreate({
      where: { id: user.sub },
      defaults: {
        email: user.email,
        name: user.name
      }
    });

    // JWT 생성
    const jwtToken = generateToken(userInstance);

    res.cookie('jwt', jwtToken, { httpOnly: true, secure: true });
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error);
  }
};