import axios from "axios";

const OAI_APIKEY = "<ENTER YOUR OPENAI API KEY HERE>";

const editor = "https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&proto=json";

const loadDrawIO = (xmlData) => {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("width", "1200");
  iframe.setAttribute("height", "800");
  iframe.setAttribute("frameborder", "0");

  const receive = (evt) => {
    console.log("got evt");
    console.dir(evt);
    if (evt.data.length > 0) {
      const msg = JSON.parse(evt.data);
      if (msg.event === "init") {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            action: "load",
            autosave: 0,
            xml: xmlData,
          }),
          "*"
        );
      }
    }
  };

  window.addEventListener("message", receive);
  iframe.setAttribute("src", editor);
  document.body.appendChild(iframe);
};

export const upload = async (base64_img) => {
  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: `You are a software architect with expertise in drawing diagrams.
              Please list the objects, the text in each and the relationships between
              the objects, and formulate the output as draw.io compatible inline xml.
              ONLY answer with xml, no text before or after`,
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: base64_img,
              },
            },
          ],
        },
      ],
      max_tokens: 2048,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OAI_APIKEY}`,
      },
    }
  );
  let msg = res.data.choices[0].message.content;
  const lines = msg.split("\n");
  if (lines.length > 1 && lines[0].includes("```")) {
    msg = msg.split("\n").slice(1, -1).join("\n");
  }
  console.log(msg);
  loadDrawIO(msg);
};
