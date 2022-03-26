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
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  organization: functions.config().openai.id, // REPLACE with your API credentials
  apiKey: functions.config().openai.key, // REPLACE with your API credentials
});
const openai = new OpenAIApi(configuration);
function news(){
newsapi.v2.everything({
    q: 'Labour Party',
    sources: 'bbc-news,',
  }).then(response => {
    console.log(response);
    return response;
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
  });
}

  const gptCompletion = await openai.createCompletion('text-davinci-001', {
    prompt: `is this article positive or negative: ${news}`,
    temperature: 0.7,
    max_tokens: 32,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const sentiment = gptCompletion.data