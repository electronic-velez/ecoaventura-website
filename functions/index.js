const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { GoogleAI } = require("@google/generativelanguage");

admin.initializeApp();

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.GEMINI_API_KEY; // Te mostraré cómo configurar esto en Vercel

exports.generateContent = functions.https.onCall(async (data, context) => {
  if (!API_KEY) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "La función debe estar configurada con una variable de entorno GEMINI_API_KEY."
    );
  }

  const genAI = new GoogleAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const { prompt } = data;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return { text };
  } catch (error) {
    console.error(error);
    throw new functions.https.HttpsError(
      "internal",
      "Ocurrió un error al generar el contenido."
    );
  }
});