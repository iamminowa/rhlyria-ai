# Deploy Rhlyria AI without a terminal

This guide uses only the Cloudflare dashboard and a web browser. It works on Windows, macOS, Linux, Android, iPhone, and iPad.

Estimated time: 15 to 20 minutes. Cloudflare changes its dashboard labels from time to time. If a name below differs slightly, choose the closest match.

## What you need

1. A Cloudflare account. Sign up at https://dash.cloudflare.com.
2. The file `dist/worker.js` from the project. It is also provided as `rhlyria-ai-worker.js`. This is the whole application in one file.
3. An API key from your language model provider, for example OpenRouter (https://openrouter.ai/keys).
4. Optional: an API key from a text-to-speech provider, for example Fish Audio. Without it, replies are text only.

## Step 1: Get the file

- **Computer:** open the downloaded `rhlyria-ai.zip`, then open the `dist` folder and find `worker.js`.
- **Phone or tablet:** open the zip with the Files app, or download `rhlyria-ai-worker.js` directly. You only need this one file. Do not edit its contents.

## Step 2: Create the Worker

1. Open https://dash.cloudflare.com and choose **Workers & Pages**.
2. Choose **Create**, then **Create Worker** (or **Start with Hello World**).
3. Give it a name, for example `rhlyria-ai`. This name becomes part of the web address.
4. Choose **Deploy**. The Worker goes live with sample code.
5. Choose **Edit code**.

## Step 3: Paste the application

1. In the code editor, select everything and delete it.
2. Open `worker.js` in any text viewer or editor, select all, and copy.
3. Paste into the editor.
4. Choose **Deploy**.

If the editor is slow or refuses the paste, try a desktop browser. The file is about 450 KB.

## Step 4: Add the storage (KV)

KV stores your settings and chat history.

1. Go to **Storage & Databases > Workers KV** and choose **Create instance** (or **Create namespace**).
2. Name it `rhlyria-ai-kv` and create it.
3. Back in your Worker, open **Settings > Bindings** and choose **Add binding**.
4. Choose **KV namespace**.
5. Set **Variable name** to exactly `AI_KV`, and select the namespace you created.
6. Save and deploy.

## Step 5 (optional but recommended): Add file storage (R2)

R2 stores uploaded images and VRM models. Without it, uploads still work but are limited to smaller files.

1. Go to **R2 Object Storage** and choose **Create bucket**. Name it `rhlyria-ai-files`.
2. Back in your Worker, open **Settings > Bindings** and choose **Add binding**.
3. Choose **R2 bucket**.
4. Set **Variable name** to exactly `AI_R2`, and select the bucket.
5. Save and deploy.

Cloudflare may ask you to enable R2 first. R2 has a free tier; follow the prompts.

## Step 6: Add your API key (secret)

1. In your Worker, open **Settings > Variables and Secrets** and choose **Add**.
2. Set **Type** to **Secret**.
3. Set **Variable name** to exactly `LLM_API_KEY`.
4. Paste your language model key as the value.
5. Save and deploy.

For text-to-speech, add a second secret named `TTS_API_KEY` in the same way.

Names are case sensitive. Copy them exactly as written.

## Step 7: Open the app

1. Open your Worker's address. It is shown at the top of the Worker page, for example `https://rhlyria-ai.<your-subdomain>.workers.dev`.
2. Go to **Settings**, check the model name, and choose **Save**.
3. Type "hello" in **Chat**. A reply should appear.
4. Optional: open **Live** to try the microphone. Your browser will ask for permission.

## Step 8 (optional): Protect the app with Cloudflare Access

Without this step, anyone with the address can use your app and spend your credits. Do this as soon as you can.

1. Go to **Zero Trust** in the Cloudflare dashboard. Set up a team name if asked.
2. Go to **Access > Applications** and choose **Add an application**, then **Self-hosted**.
3. Enter an application name and the domain of your Worker, for example `rhlyria-ai.<your-subdomain>.workers.dev`.
4. Add a policy with **Action: Allow** and **Include: Emails**, then enter the emails that may use the app.
5. Save. Copy the **Application Audience (AUD) tag** from the application's overview.
6. Back in your Worker, open **Settings > Variables and Secrets** and add these variables (not secrets):
   - `ACCESS_TEAM_DOMAIN`: your team domain, for example `yourteam.cloudflareaccess.com`
   - `ACCESS_AUD`: the AUD tag from step 5
   - `ALLOWED_EMAILS` (optional): the same emails, separated by commas
7. Save and deploy.

The app now checks every request, and a user who is not on the list sees an access error.

## Updating later

1. Download the new `dist/worker.js`.
2. In your Worker, choose **Edit code**, replace everything with the new file, and choose **Deploy**.

Your settings, chat history, and uploads are kept, because they live in KV and R2.

## Troubleshooting

| What you see | What to do |
| --- | --- |
| The page shows "Can't reach the server" | Reload. If Access is on, sign in again. |
| "Not authenticated" | Reload the page and sign in. Check that the email is in the Access policy. |
| "Cloudflare Access is only half configured" | Set both `ACCESS_TEAM_DOMAIN` and `ACCESS_AUD`, or delete both. |
| "No language model API key is set" | Check the secret name is exactly `LLM_API_KEY`, then deploy again. |
| "The language model was not found" | Check the model name in Settings. Use the exact name from your provider. |
| "Rate limit reached" | Wait, or choose another model in Settings. Free models have daily limits. |
| "Internal error" or a missing KV message | Check that the KV binding variable name is exactly `AI_KV`. |
| Voice does not play | Check `TTS_API_KEY` is set. Text still works without it. |
| Microphone does not work | Allow microphone access in the browser for this site, then reload. |

For more detail, open **Settings** and download the log file.

## Getting help

Open an issue in the project repository. Include the error message and the log file, but remove any keys before sharing.
