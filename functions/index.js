const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('6c3804ce0567462baa582d1102ab31a2');
newsapi.v2.topHeadlines({
    sources: 'bbc-news',
    q: 'Labour',
    category: 'politics',
    language: 'en',
  }).then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
  });

  const gptCompletion = await openai.createCompletion('text-davinci-001', {
    prompt: `${tweets} Jim Cramer recommends selling the following stock tickers: `,
    temperature: 0.7,
    max_tokens: 32,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });