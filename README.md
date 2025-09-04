User Input
  │
  ▼
+-------------------+
| Paste iframe HTML |
+-------------------+
  │
  ▼
Click "Generate" Button
  │
  ▼
+---------------------------+
| generateButtonListener()  |
+---------------------------+
  │
  ├─> parseResult(parsedIframeSrc)
  │       └─ Sends POST /capture/parse
  │           └─ Logs backend response (optional)
  │
  ├─> capturePdf(parsedIframeSrc)
  │       └─ Sends POST /capture/pdf
  │           └─ Downloads report.pdf
  │
  └─> capturePng(parsedIframeSrc)
          └─ Sends POST /capture/png
              └─ Downloads report.png
  │
  ▼
Click "Get Result" Button
  │
  ▼
+---------------------------+
| getGeneratedResult()      |
+---------------------------+
  │
  ├─ Checks that parsedIframeSrc exists
  │
  ├─ Sends POST /capture/parse with iframe
  │
  └─ Updates textarea (#output)
       └─ textAreaResult.value = data.code || JSON.stringify(data,null,2)
  │
  ▼
Click "Copy" Button
  │
  ▼
+----------------------+
| copyOutput()         |
+----------------------+
  │
  └─ Selects textarea content → Copies to clipboard
