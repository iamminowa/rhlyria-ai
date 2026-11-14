<div align="center">

# Rhlyria AI

**ผู้ช่วย AI แบบเสียงและข้อความที่โฮสต์เอง** ทำงานเป็น Cloudflare Worker ตัวเดียว

[English](README.md) · ไทย · [中文](README.zh.md)

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/iamminowa/rhlyria-ai)

</div>

Rhlyria AI ให้คุณคุยกับตัวละคร AI ได้ทั้งด้วยข้อความและเสียง คำตอบแปลเป็นภาษาที่สองและอ่านออกเสียงได้ ตัวละครแสดงเป็นโมเดล 3 มิติแบบ VRM หรือภาพ PNG สองรูปก็ได้ ทุกอย่างทำงานใน Cloudflare Worker ตัวเดียว ทั้งแสดงหน้าเว็บ เก็บการตั้งค่าและประวัติแชท และเรียกผู้ให้บริการโมเดลแทนคุณ คีย์ API จึงไม่ถูกส่งไปที่เบราว์เซอร์

## สารบัญ

- [ความปลอดภัย](#ความปลอดภัย)
- [ที่มา](#ที่มา)
- [การติดตั้ง](#การติดตั้ง)
- [การใช้งาน](#การใช้งาน)
- [การตั้งค่า](#การตั้งค่า)
- [ผู้ให้บริการ](#ผู้ให้บริการ)
- [การพัฒนา](#การพัฒนา)
- [โครงสร้างโปรเจกต์](#โครงสร้างโปรเจกต์)
- [API](#api)
- [ขอบคุณ](#ขอบคุณ)
- [การมีส่วนร่วม](#การมีส่วนร่วม)
- [สัญญาอนุญาต](#สัญญาอนุญาต)


## ความปลอดภัย

แอปไม่มีระบบล็อกอินของตัวเอง ควรวางไว้หลัง Cloudflare Access หรือกำหนด `ACCESS_TEAM_DOMAIN` และ `ACCESS_AUD` เพื่อให้ Worker ตรวจโทเคนของ Access เอง ถ้าไม่ทำอย่างใดอย่างหนึ่ง ใครก็ตามที่รู้ URL จะใช้แอปและใช้เครดิตผู้ให้บริการของคุณได้ คีย์ API เก็บเป็น Worker secrets ไม่ถูกส่งไปที่เบราว์เซอร์ และไม่ถูกบันทึกลง log ดู [ADR: Protect with optional Cloudflare Access](contributing/decisions/2026-11-09-protect-with-optional-cloudflare-access.md)

## ที่มา

Rhlyria AI พัฒนาต่อจาก [Riko Project](https://github.com/rayenfeng/riko_project) (MIT) ซึ่งเป็นผู้ช่วยเสียงภาษา Python ที่รันในเครื่อง เวอร์ชันนี้นำแนวคิดมาเป็นแอปบนเบราว์เซอร์ที่รันบน Cloudflare Workers จึงใช้ได้บนโทรศัพท์ แท็บเล็ต และคอมพิวเตอร์โดยไม่ต้องติดตั้งอะไร ส่วนหน้าตาแบบกระจกใสใช้ Liquid Glass SDK ซึ่งพัฒนาต่อจาก [glisse](https://github.com/0kzh/glisse) (MIT) การตัดสินใจด้านสถาปัตยกรรมบันทึกไว้ที่ [contributing/decisions](contributing/decisions/README.md)

## การติดตั้ง

**สิ่งที่ต้องมี:** บัญชี Cloudflare (แพ็กเกจฟรีใช้ได้) สำหรับผู้พัฒนาที่ใช้ terminal ต้องมี Node.js 20 ขึ้นไปและ npm ด้วย

**วิธี A: ไม่ต้องใช้ terminal (แนะนำ)** ทำตาม [DEPLOY.md](DEPLOY.md) โดยสรุปคือ ดาวน์โหลดไฟล์ `dist/worker.js` สร้าง Worker ในแดชบอร์ด Cloudflare วางโค้ดลงไป ผูก KV namespace เป็น `AI_KV` เพิ่ม secret ชื่อ `LLM_API_KEY` แล้วกด Deploy

**วิธี B: สำหรับผู้พัฒนา ใช้ terminal**

```bash
npm install
npx wrangler login
npm run setup
```

สร้าง KV namespace (และ R2 bucket ถ้าต้องการ) ในบัญชี Cloudflare ของคุณ แล้วใส่ ID ลงใน `wrangler.jsonc` ภายใต้ `kv_namespaces` และ `r2_buckets`

**การอัปเดต:** แทนที่โค้ด Worker ด้วย `dist/worker.js` ใหม่แล้ว Deploy อีกครั้ง หรือใช้ `git pull` ตามด้วย `npm run deploy`

## การใช้งาน

เปิด URL ของ Worker เช่น `https://rhlyria-ai.<your-subdomain>.workers.dev` แล้ว

1. เปิด **ตั้งค่า** ตรวจชื่อโมเดลภาษา แล้วบันทึก โมเดลเริ่มต้นเป็นโมเดลฟรีที่มีโควตาจำกัด
2. พิมพ์ข้อความในหน้า **แชท** หรือแตะไมโครโฟนในหน้า **Live**

ถ้าต้องเรียก API โดยตรง ให้ส่งข้อความแล้วอ่านบรรทัด JSON ที่ได้กลับมาเป็นสตรีม

```bash
curl -X POST https://your-worker.example.workers.dev/horizon/api/chat \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello!"}'
```

ถ้าแอปอยู่หลัง Cloudflare Access การเรียกโดยตรงต้องแนบโทเคนของ Access ด้วย

## การตั้งค่า

ตั้งค่าเหล่านี้ในแดชบอร์ด Cloudflare ที่ **Settings > Variables and Secrets** หรือใช้ `wrangler secret put` สำหรับ secret

| ชื่อ | จำเป็น | ค่าเริ่มต้น | หน้าที่ |
| --- | --- | --- | --- |
| `LLM_API_KEY` | ใช่ | ไม่มี | คีย์สำหรับโมเดลภาษา และสำหรับถอดเสียงถ้าไม่ได้ตั้ง `STT_API_KEY` |
| `LLM_BASE_URL` | ไม่ | `https://openrouter.ai/api/v1` | base URL ของบริการที่เข้ากับ OpenAI |
| `LLM_MODEL` | ไม่ | ไม่มี | โมเดลที่ใช้เมื่อหน้าตั้งค่าว่างอยู่ |
| `TTS_API_KEY` | ไม่ | ไม่มี | คีย์สำหรับแปลงข้อความเป็นเสียง ถ้าไม่ตั้ง คำตอบจะเป็นข้อความอย่างเดียว |
| `TTS_URL` | ไม่ | `https://api.fish.audio/v1/tts` | endpoint ของการแปลงข้อความเป็นเสียง |
| `TTS_FORMAT` | ไม่ | `fish` | `fish` หรือ `openai` |
| `STT_URL` | ไม่ | endpoint ถอดเสียงของ OpenRouter | endpoint ของการถอดเสียง |
| `STT_FORMAT` | ไม่ | `openrouter` | `openrouter` หรือ `openai` (multipart form) |
| `STT_API_KEY` | ไม่ | ค่าของ `LLM_API_KEY` | คีย์แยกสำหรับการถอดเสียง |
| `ACCESS_TEAM_DOMAIN` | ไม่ | ไม่มี | โดเมนทีมของ Access ต้องตั้งคู่กับ `ACCESS_AUD` |
| `ACCESS_AUD` | ไม่ | ไม่มี | audience tag ของแอปพลิเคชัน Access |
| `ALLOWED_EMAILS` | ไม่ | ไม่มี | อีเมลที่อนุญาต คั่นด้วยเครื่องหมายจุลภาค เมื่อตรวจ Access แล้ว |

Bindings: `AI_KV` จำเป็น ส่วน `AI_R2` เป็นตัวเลือก ถ้าไม่ผูก ไฟล์ที่อัปโหลดจะเก็บใน KV ซึ่งมีขีดจำกัดต่ำกว่า

ชื่อเก่า `OPENROUTER_API_KEY` และ `FISH_API_KEY` ยังใช้ได้

## ผู้ให้บริการ

การเรียกโมเดลภาษา ถอดเสียง และแปลงข้อความเป็นเสียงแยกเป็นอะแดปเตอร์ใน `src/providers/` หากต้องการใช้บริการที่เข้ากับ OpenAI ทั้งหมด ให้ตั้งค่าดังนี้

```
LLM_BASE_URL=https://api.openai.com/v1
LLM_API_KEY=...
STT_FORMAT=openai
TTS_URL=https://api.openai.com/v1/audio/speech
TTS_FORMAT=openai
TTS_API_KEY=...
```

การถอดเสียงจะใช้ `LLM_BASE_URL` เป็นฐาน เว้นแต่จะตั้ง `STT_URL` ถ้าต้องการรูปแบบคำขอใหม่ ให้เพิ่ม branch ในอะแดปเตอร์ที่เกี่ยวข้อง ดู [ADR: Add provider adapters](contributing/decisions/2026-11-14-add-provider-adapters.md)

## การพัฒนา

```bash
npm install
npm run build
npm test
npm run dev
```

`npm run build` รวมแอปเป็น `dist/worker.js` ส่วน `npm test` จะ build ตรวจเอกสาร และรันการทดสอบ API ทั้งหมดทดสอบโดยไม่ต้องเชื่อมต่ออินเทอร์เน็ต และใช้ผู้ให้บริการจำลอง

## โครงสร้างโปรเจกต์

```
src/
  worker.js        เส้นทาง HTTP
  chat.js          การสนทนา การแปล ขีดจำกัดความยาว และการสรุปความจำ
  config.js        ค่าเริ่มต้น การตรวจสอบค่า และค่าคงที่
  auth.js          การตรวจโทเคนของ Cloudflare Access (ไม่บังคับ)
  store.js         การเก็บข้อมูลใน KV และ R2 การอัปโหลด และ log
  ui.js            ให้บริการหน้าเว็บและตั้งค่าความปลอดภัยของ header
  providers/       อะแดปเตอร์โมเดลภาษา ถอดเสียง และแปลงข้อความเป็นเสียง
  ui/              แอปบนเบราว์เซอร์ (React, i18n, คอมโพเนนต์)
  vendor/          React และ Liquid Glass SDK ที่รวมมาในโปรเจกต์
contributing/decisions/   บันทึกการตัดสินใจด้านสถาปัตยกรรม
tests/                    การทดสอบเอกสารและ API
build.mjs                 สร้าง dist/worker.js
```

## API

เส้นทางทั้งหมดอยู่ภายใต้ `/horizon/api` และการเขียนข้อมูลต้องมาจาก origin เดียวกัน

- `GET /health`, `GET /bootstrap`: สถานะ การตั้งค่า ประวัติ และข้อมูล build
- `GET`, `PUT`, `DELETE /settings`: อ่าน บันทึก หรือรีเซ็ตการตั้งค่า
- `GET`, `PUT`, `DELETE /memory`: อ่านหรือแก้ไขสรุป ล้างด้วย `?scope=summary` หรือ `?scope=all`
- `POST /chat`: ส่งข้อความ คำตอบเป็นสตรีมของบรรทัด JSON ที่มี `stage`, `done` หรือ `error`
- `POST /tts`: แปลงข้อความเป็นเสียง
- `POST /stt`: ถอดเสียง WAV แล้วคืน `{ "text": "..." }`
- `GET /audio/:id`: ดึงเสียงจากคำตอบล่าสุด
- `POST /assets?kind=pngTalk|pngIdle|bg|vrm`: อัปโหลดไฟล์ `POST /assets/import` ดึงรูปจากลิงก์ https
- `GET`, `DELETE /assets/:id`: ดึงหรือลบไฟล์ที่อัปโหลด
- `GET`, `POST`, `DELETE /logs`: อ่าน เพิ่ม หรือล้าง log `?download=1` ได้ไฟล์ `.log`
- `GET /secrets`: บอกว่าแต่ละคีย์ถูกตั้งไว้หรือไม่ ไม่แสดงค่า

## ขอบคุณ

- [Riko Project](https://github.com/rayenfeng/riko_project) โดย rayenfeng แนวคิดเดิม (MIT)
- [glisse](https://github.com/0kzh/glisse) โดย Kelvin Zhang ซึ่งเป็นฐานของ Liquid Glass SDK (MIT)
- [React](https://react.dev) และผู้ร่วมพัฒนา (MIT)

## การมีส่วนร่วม

คำถามและรายงานบั๊กเปิดเป็น issue ในรีโพนี้ได้ ยินดีรับ pull request ก่อนเปิด ให้รัน `npm test` คงหัวข้อลิขสิทธิ์และไลเซนส์ไว้ เพิ่มคำแปลให้ทุกข้อความใหม่บนหน้าเว็บ และอ่าน [CONTRIBUTING.md](CONTRIBUTING.md) สำหรับการเปลี่ยนแปลงด้านสถาปัตยกรรม ให้เสนอ ADR ใน [contributing/decisions](contributing/decisions/README.md) ก่อน

## สัญญาอนุญาต

[MIT](LICENSE) ลิขสิทธิ์ (c) 2026 CERETOSPHERE (ภายใต้ COSVerses) ใช้ด้วยการอนุญาตพิเศษจาก MiNoWa Industry ส่วนประกอบของบุคคลที่สามคงไว้ซึ่งไลเซนส์เดิม ดู [NOTICE.md](NOTICE.md)
