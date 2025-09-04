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
  ├─ parseResult(parsedIframeSrc)
  │       └─ POST /capture/parse
  │           └─ logs backend parse in console
  │
  ├─ capturePdf(parsedIframeSrc)
  │       └─ POST /capture/pdf
  │           └─ Downloads report.pdf
  │
  └─ capturePng(parsedIframeSrc)
          └─ POST /capture/png
              └─ Downloads report.png
  │
Click "Get Result" Button
  │
  ▼
+---------------------------+
| getGeneratedResult()      |
+---------------------------+
  │
  ├─ Checks if parsedIframeSrc exists
  │
  ├─ Sends POST /capture/parse with iframe
  │
  └─ Updates textarea (#output)
       └─ textAreaResult.value = data.code || JSON.stringify(data,null,2)
  │
Click "Copy" Button
  │
  ▼
+----------------------+
| copyResult()         |
+----------------------+
  │
  ├─ Selects textarea content
  ├─ Copies it to clipboard
  └─ Shows alert / console log (optional)