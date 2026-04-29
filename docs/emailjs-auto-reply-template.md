# EmailJS Auto-Reply Template

هذا الملف يجهز قالب الرد التلقائي للعميل على `EmailJS` باستخدام:
- `template_sfek6x5`
- نفس المتغيرات التي يرسلها الموقع حاليًا
- اتجاه تلقائي: عربي `RTL` وإنجليزي `LTR`

## Paste Into EmailJS
- افتح القالب: `template_sfek6x5`
- ادخل على `Edit Content`
- استبدل المحتوى الحالي بالكامل بمحتوى الملف:
  - [emailjs-auto-reply-template.html](/e:/Work_Websites/ريق/V2/app/docs/emailjs-auto-reply-template.html)

## Recommended Template Fields
- Subject:
```text
{{auto_reply_subject}} | {{brand_name}}
```
- To Email:
```text
{{email}}
```
- From Name:
```text
{{brand_name}}
```
- Reply To:
```text
saadsaad50begiseralex6@gmail.com
```

## Best Use
- مناسب كرسالة تأكيد فورية بعد إرسال نموذج التواصل
- مناسب أيضًا لو نفس التدفق يرسل طلبًا من السلة وتريد تأكيد استلامه للعميل

## Supported Variables
القالب يعتمد على المتغيرات الحالية إضافة إلى متغيرات النصوص الذكية:

```text
title
request_type
source
time
name
email
phone
subject
message
order_items
whatsapp_number
lang
direction
text_align
brand_name
name_label
email_label
auto_reply_subject
auto_reply_overline
auto_reply_heading
auto_reply_greeting
auto_reply_intro
auto_reply_summary_label
auto_reply_request_type_label
auto_reply_time_label
auto_reply_message_label
auto_reply_order_note
auto_reply_support_label
auto_reply_signature
footer_note
```

## Behavior
- الرسالة تظهر للعميل بصيغة لطيفة ومهنية بدل الرسالة الخام
- لو اللغة عربية: القالب يظهر من اليمين
- لو اللغة إنجليزية: القالب يظهر من اليسار
- لو فيه `order_items`: يظهر تنبيه إضافي أن الفريق سيتواصل لتأكيد الطلب
