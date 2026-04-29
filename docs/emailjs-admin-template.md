# EmailJS Admin Template

هذا الملف يجهز القالب الإداري الذكي الخاص بـ `EmailJS` لاستخدامه مع:
- رسائل التواصل
- الطلبات القادمة من السلة

## Paste Into EmailJS
- افتح القالب: `template_l26577p`
- ادخل على `Edit Content`
- بدّل المحتوى الحالي بالكامل بمحتوى الملف:
  - [emailjs-admin-template.html](/e:/Work_Websites/ريق/V2/app/docs/emailjs-admin-template.html)

## Recommended Template Fields
- Subject:
```text
{{title}} | {{name}}
```
- To Email:
```text
saadsaad50begiseralex6@gmail.com
```
- From Name:
```text
{{name}}
```
- Reply To:
```text
{{email}}
```

## Supported Variables
القالب متوافق مع المتغيرات التي يرسلها الموقع حاليًا:

```text
title
request_type
source
time
name
from_name
email
from_email
reply_to
phone
subject
message
user_message
order_items
order_total
subtotal
delivery_fee
discount
total_items
address
notes
whatsapp_number
to_email
lang
direction
text_align
intro_overline
brand_name
intro_text
time_label
sender_info_label
name_label
phone_label
email_label
subject_label
source_label
message_label
order_details_label
total_items_label
subtotal_label
delivery_fee_label
discount_label
order_total_label
address_label
notes_label
reply_button_label
whatsapp_admin_label
footer_note
```

## Smart Behavior
- القسم الأساسي للرسالة يظهر دائمًا عبر `{{message}}`
- قسم الطلب يظهر فقط عند وجود `{{order_items}}`
- زر الرد يظهر فقط عند وجود `{{reply_to}}`
- اتجاه القالب يصبح `RTL` تلقائيًا بالعربي و`LTR` تلقائيًا بالإنجليزي
- كل العناوين الداخلية تتبدل تلقائيًا حسب اللغة القادمة من الموقع

## Why This Works
بحسب EmailJS:
- HTML emails مدعومة رسميًا
- Sections الشرطية مدعومة باستخدام:
```text
{{#variable}} ... {{/variable}}
```

المراجع الرسمية:
- https://www.emailjs.com/docs/faq/can-i-send-html-emails/
- https://www.emailjs.com/docs/user-guide/dynamic-variables-templates/
