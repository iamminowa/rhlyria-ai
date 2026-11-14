<div align="center">

# Rhlyria AI 

**可自托管的语音与文字 AI 伴侣**，以单个 Cloudflare Worker 运行。

[English](README.md) · [ไทย](README.th.md) · 中文

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/iamminowa/rhlyria-ai)

</div>

Rhlyria AI 让你可以通过文字或语音与一个友好的 AI 角色对话。回复可以翻译成第二种语言并朗读出来，角色可以以 3D VRM 模型或两张 PNG 图片的形式出现。一切都运行在一个 Cloudflare Worker 中：它提供网页应用、保存设置和聊天记录，并代你调用模型服务商，因此 API 密钥永远不会传到浏览器。

## 目录

- [安全](#安全)
- [背景](#背景)
- [安装](#安装)
- [用法](#用法)
- [配置](#配置)
- [服务商](#服务商)
- [开发](#开发)
- [项目结构](#项目结构)
- [API](#api)
- [致谢](#致谢)
- [贡献](#贡献)
- [许可证](#许可证)


## 安全

本应用没有自己的登录功能。请把它放在 Cloudflare Access 之后，或设置 `ACCESS_TEAM_DOMAIN` 和 `ACCESS_AUD`，让 Worker 自行验证 Access 令牌。两者都不设置时，任何知道网址的人都可以使用应用并消耗你的服务商额度。API 密钥以 Worker secret 保存，不会发送到浏览器，也不会写入日志。参见 [ADR: Protect with optional Cloudflare Access](contributing/decisions/2026-11-09-protect-with-optional-cloudflare-access.md)。

## 背景

Rhlyria AI 改编自 [Riko Project](https://github.com/rayenfeng/riko_project)（MIT），后者是一个本地运行的 Python 语音伴侣。本版本把这个想法做成运行在 Cloudflare Workers 上的网页应用，因此可以在手机、平板和电脑上使用，无需安装。玻璃效果界面使用 Liquid Glass SDK，它基于 [glisse](https://github.com/0kzh/glisse)（MIT）。架构决策记录在 [contributing/decisions](contributing/decisions/README.md) 中。

## 安装

**依赖：** 一个 Cloudflare 账户（免费套餐即可）。如果使用终端，还需要 Node.js 20 或更高版本以及 npm。

**方式 A：无需终端（推荐）。** 按照 [DEPLOY.md](DEPLOY.md) 操作。简要步骤：下载 `dist/worker.js`，在 Cloudflare 控制台创建 Worker，粘贴该文件，将 KV 命名空间绑定为 `AI_KV`，添加名为 `LLM_API_KEY` 的 secret，然后部署。

**方式 B：开发者，使用终端。**

```bash
npm install
npx wrangler login
npm run setup
```

请在你的 Cloudflare 账户中创建 KV 命名空间（以及可选的 R2 bucket），然后把它们的 ID 填入 `wrangler.jsonc` 的 `kv_namespaces` 和 `r2_buckets`。

**更新：** 用新的 `dist/worker.js` 替换 Worker 代码后重新部署，或执行 `git pull` 后运行 `npm run deploy`。

## 用法

打开你的 Worker 网址，例如 `https://rhlyria-ai.<your-subdomain>.workers.dev`，然后：

1. 打开 **设置**，检查语言模型名称并保存。默认模型是有配额限制的免费模型。
2. 在 **聊天** 中输入消息，或在 **Live** 中点击麦克风。

如需直接调用 API，发送消息并读取流式返回的 JSON 行：

```bash
curl -X POST https://your-worker.example.workers.dev/horizon/api/chat \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello!"}'
```

如果应用由 Cloudflare Access 保护，直接调用时必须附带 Access 令牌。

## 配置

在 Cloudflare 控制台的 **Settings > Variables and Secrets** 中设置；secret 也可以用 `wrangler secret put` 设置。

| 名称 | 是否必需 | 默认值 | 用途 |
| --- | --- | --- | --- |
| `LLM_API_KEY` | 是 | 无 | 语言模型的密钥；未单独设置时也用于语音转文字 |
| `LLM_BASE_URL` | 否 | `https://openrouter.ai/api/v1` | 任何兼容 OpenAI 的 base URL |
| `LLM_MODEL` | 否 | 无 | 设置页为空时使用的模型 |
| `TTS_API_KEY` | 否 | 无 | 文字转语音的密钥。不设置则回复只有文字 |
| `TTS_URL` | 否 | `https://api.fish.audio/v1/tts` | 文字转语音的端点 |
| `TTS_FORMAT` | 否 | `fish` | `fish` 或 `openai` |
| `STT_URL` | 否 | OpenRouter 转写端点 | 语音转文字的端点 |
| `STT_FORMAT` | 否 | `openrouter` | `openrouter` 或 `openai`（multipart 表单） |
| `STT_API_KEY` | 否 | `LLM_API_KEY` 的值 | 语音转文字的独立密钥 |
| `ACCESS_TEAM_DOMAIN` | 否 | 无 | Access 团队域名，需与 `ACCESS_AUD` 同时设置 |
| `ACCESS_AUD` | 否 | 无 | Access 应用的 audience 标签 |
| `ALLOWED_EMAILS` | 否 | 无 | 验证 Access 时允许的邮箱，以逗号分隔 |

绑定：`AI_KV` 为必需。`AI_R2` 为可选；未绑定时上传的文件保存在 KV 中，上限更低。

旧名称 `OPENROUTER_API_KEY` 和 `FISH_API_KEY` 仍然有效。

## 服务商

语言模型、语音转文字和文字转语音分别是 `src/providers/` 中的适配器。如果想让所有功能都使用兼容 OpenAI 的服务，请设置：

```
LLM_BASE_URL=https://api.openai.com/v1
LLM_API_KEY=...
STT_FORMAT=openai
TTS_URL=https://api.openai.com/v1/audio/speech
TTS_FORMAT=openai
TTS_API_KEY=...
```

除非设置了 `STT_URL`，语音转文字会以 `LLM_BASE_URL` 作为基础地址。如需新的请求格式，请在对应适配器中添加分支。参见 [ADR: Add provider adapters](contributing/decisions/2026-11-14-add-provider-adapters.md)。

## 开发

```bash
npm install
npm run build
npm test
npm run dev
```

`npm run build` 会把应用打包为 `dist/worker.js`。`npm test` 会先构建，然后检查文档并运行 API 测试。测试不需要网络，使用模拟的服务商。

## 项目结构

```
src/
  worker.js        HTTP 路由
  chat.js          对话轮次、翻译、长度限制、记忆摘要
  config.js        默认值、校验和共享常量
  auth.js          可选的 Cloudflare Access 令牌验证
  store.js         KV 与 R2 存储、上传、日志
  ui.js            提供应用页面并设置安全响应头
  providers/       语言模型、语音转文字、文字转语音适配器
  ui/              浏览器应用（React、i18n、组件）
  vendor/          随项目提供的 React 与 Liquid Glass SDK
contributing/decisions/   架构决策记录
tests/                    文档与 API 测试
build.mjs                 生成 dist/worker.js
```

## API

所有路由都位于 `/horizon/api` 之下，写入请求必须来自同一来源。

- `GET /health`、`GET /bootstrap`：状态、设置、历史记录和构建信息
- `GET`、`PUT`、`DELETE /settings`：读取、保存或重置设置
- `GET`、`PUT`、`DELETE /memory`：读取或编辑摘要，用 `?scope=summary` 或 `?scope=all` 清除
- `POST /chat`：发送消息，响应为包含 `stage`、`done` 或 `error` 事件的 JSON 行流
- `POST /tts`：把文字合成为语音
- `POST /stt`：转写 WAV 录音，返回 `{ "text": "..." }`
- `GET /audio/:id`：获取最近回复的语音
- `POST /assets?kind=pngTalk|pngIdle|bg|vrm`：上传文件；`POST /assets/import` 通过 https 链接获取图片
- `GET`、`DELETE /assets/:id`：获取或删除已上传的文件
- `GET`、`POST`、`DELETE /logs`：读取、追加或清除日志；`?download=1` 返回 `.log` 文件
- `GET /secrets`：只显示每个密钥是否已设置，不显示值

## 致谢

- [Riko Project](https://github.com/rayenfeng/riko_project)，作者 rayenfeng，原始构想（MIT）。
- [glisse](https://github.com/0kzh/glisse)，作者 Kelvin Zhang，是 Liquid Glass SDK 的基础（MIT）。
- [React](https://react.dev) 及其贡献者（MIT）。

## 贡献

欢迎在本仓库以 issue 提问或报告问题，也欢迎提交 pull request。提交前请运行 `npm test`，保留版权与许可证声明，为每个新的界面文字补充翻译，并阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。如果是架构层面的改动，请先在 [contributing/decisions](contributing/decisions/README.md) 中提出 ADR。

## 许可证

[MIT](LICENSE)。版权所有 (c) 2026 CERETOSPHERE（隶属于 COSVerses），经 MiNoWa Industry 特别许可使用。第三方组件保留其各自的许可证，详见 [NOTICE.md](NOTICE.md)。
