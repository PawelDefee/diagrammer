# Testing GPT-4 Vision API

This is a **very** quick proto to see how well GPT-4 Vision API converts hand-written diagrams into DrawIO compatible XML. Plus an integration of actually opening DrawIO.

For a video clip, see [this LinkedIn post](https://www.linkedin.com/posts/topisantakivi_openai-gpt4-activity-7127773479994597376-NB6E?utm_source=share&utm_medium=member_desktop)

# Trying it out

Basically, show any hand-written diagram to the webcam, click 'Capture', the image then gets uploaded to OpenAI, and the returned XML (hopefully valid) is then passed on to DrawIO for viewing and editing.

It's just a React frontend project, so first enter your OpenAI API Key into `src/upload.js`, variable `OAI_APIKEY`, and then start the frontend as usual:

```
npm install
npm start
```
