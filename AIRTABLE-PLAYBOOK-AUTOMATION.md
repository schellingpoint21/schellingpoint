# Airtable Automation — Email the Playbook

Built against your live **Schelling Point CRM** base. Your **Clients** table already has the exact fields needed:

| Field | Purpose | Values |
|---|---|---|
| **Lead Source** | Identifies playbook leads | `Playbook Download` |
| **Playbook Language** | Which edition to send | `English` / `Spanish` |
| **Playbook Sent** | Prevents duplicate emails | checkbox |
| **Email** | Recipient | — |
| **Full Name** | Personalisation | — |

Download links (live and confirmed):
- English → `https://schellingpoint.xyz/downloads/bitcoin-estate-playbook.pdf`
- Spanish → `https://schellingpoint.xyz/downloads/manual-patrimonio-bitcoin.pdf`

---

## Step 0 — Confirm Fillout is writing the fields

Before building the automation, submit your live form once and check the new row in **Clients** has:
- **Email** populated
- **Playbook Language** set to `English` or `Spanish` (this comes from the `lang` parameter the website passes — see note at the end)
- **Lead Source** = `Playbook Download` (set this in Fillout's field mapping if it isn't automatic)

If **Playbook Language** is blank, the branch can't route — fix the Fillout→Airtable mapping first.

---

## Step 1 — Create the automation

Airtable → **Automations** (top bar) → **Create automation**. Name it `Send Playbook`.

### Trigger
- **When a record matches conditions**
- Table: **Clients**
- Conditions (so it only fires for fresh playbook leads, not existing clients):
  - `Lead Source` is `Playbook Download`
  - **AND** `Playbook Sent` is unchecked
  - **AND** `Email` is not empty

> Using *matches conditions* (not *record created*) plus the `Playbook Sent` check is what prevents duplicate sends and avoids emailing existing clients who get re-touched.

---

## Step 2 — Branch by language

Add a **Conditional logic** action (the "branch" block).

### Branch A — English
Condition: `Playbook Language` is `English`

Add inside this branch → **Send email** (see Step 3, English).

### Branch B — Spanish
Condition: `Playbook Language` is `Spanish`

Add inside this branch → **Send email** (see Step 3, Spanish).

---

## Step 3 — The Send email actions

You want these coming from **charlie@schellingpoint.xyz** (Google Workspace), not Airtable's default sender, so they look personal and land in the inbox. In the Send email action, look for the **"From"** option — if your Airtable plan supports custom from-addresses or a Gmail connection, select your Workspace address. If not, see the Gmail alternative at the bottom.

For both: set **To** = the record's `Email` field (insert it as a token, don't type it).

### English email
**Subject:** `Your Bitcoin Estate Playbook`

**Body:**
```
Hi {Full Name},

Thanks for your interest in the Bitcoin Estate Playbook.

Here's your copy — a principled handbook for holding, securing, and passing
on Bitcoin within a family estate:

https://schellingpoint.xyz/downloads/bitcoin-estate-playbook.pdf

If you'd like to talk through your own setup, just reply to this email or
book a free strategy session here:
https://tally.so/r/KY0PX8

Best,
Charlie
Schelling Point
```

### Spanish email
**Subject:** `Tu Manual del Patrimonio en Bitcoin`

**Body:**
```
Hola {Full Name},

Gracias por tu interés en el Manual del Patrimonio en Bitcoin.

Aquí tienes tu copia — un manual fundamentado para custodiar, asegurar y
transmitir Bitcoin dentro del patrimonio familiar:

https://schellingpoint.xyz/downloads/manual-patrimonio-bitcoin.pdf

Si quieres hablar sobre tu propia configuración, responde a este correo o
agenda una sesión de estrategia gratuita aquí:
https://tally.so/r/KY0PX8

Un saludo,
Charlie
Schelling Point
```

> Insert `{Full Name}` by clicking the **+** / blue token button in the email body and choosing the **Full Name** field — don't type the literal braces.

---

## Step 4 — Mark as sent (in BOTH branches)

After each Send email action, add an **Update record** action:
- Table: **Clients**
- Record: the trigger record (**Use record from step 1**)
- Field: **Playbook Sent** → checked (true)

This flips the dedupe flag so the trigger condition (`Playbook Sent is unchecked`) won't fire again for this lead.

So each branch has two actions in order: **Send email → Update record (Playbook Sent = checked)**.

---

## Step 5 — Test, then turn on

1. With the automation still **off**, use Airtable's **Test** panel on each action — pick a test record that has Language set, and confirm the email preview shows the right link and name.
2. Toggle the automation **On** (top-right).
3. **Live end-to-end test:** go to your homepage, click *Get the Playbook*, submit with your own email. Confirm:
   - A Clients row appears with `Lead Source = Playbook Download`, `Playbook Language` set, `Playbook Sent` unchecked → then checked seconds later.
   - The email arrives within a minute with a **working** download link.
4. Repeat from `/es` to confirm the Spanish branch.

---

## If custom "From" isn't available — Gmail route

If your Airtable plan won't send from your Workspace address, swap the **Send email** action for a **Gmail → Send email** action:
1. In the action list, choose **Gmail** instead of **Send an email**.
2. Connect your `charlie@schellingpoint.xyz` Google account when prompted.
3. Same To / Subject / Body as above. This sends from your real Gmail, best deliverability and branding.

---

## Note on the language value

The website passes the visitor's language to Fillout as a hidden `lang` parameter (`en` on the English site, `es` on the Spanish `/es` site). For the branch to work, that must map to **Playbook Language** = `English` / `Spanish` in Airtable. Two ways to handle the en→English / es→Spanish translation:
- **In Fillout:** map the `lang` value to the Airtable single-select (set `en`→English, `es`→Spanish in the field mapping), or
- **A hidden Fillout field** that stores "English"/"Spanish" directly based on which page the form was opened from.

Confirm in Step 0 that the value landing in **Playbook Language** is exactly `English` or `Spanish` (matching the select options), or the branch conditions won't match.
