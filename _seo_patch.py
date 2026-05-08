# -*- coding: utf-8 -*-
"""SEO Patch for index.html — applies all SEO changes in one shot."""
import re

INDEX = r"z:\PROJECTS\PRICELIST_SCRIPT\index.html"
SEO_BLOCK = r"z:\PROJECTS\PRICELIST_SCRIPT\_seo_block.html"

# Read files
with open(INDEX, "r", encoding="utf-8-sig") as f:
    html = f.read()

with open(SEO_BLOCK, "r", encoding="utf-8") as f:
    seo_block = f.read()

print(f"Original size: {len(html)} chars")

# === 1. Replace title ===
old_title = "ИИ-помощники для бизнеса | Прейскурант 2026"
new_title = "ИИ-помощники для бизнеса — 13 решений с окупаемостью от 2 мес. | Денис Полоцк"
html = html.replace(old_title, new_title)
print(f"Title replaced: {new_title in html}")

# === 2. Replace meta description + add SEO meta tags ===
old_meta = '''  <meta name="description"
    content="13 готовых ИИ-решений для бизнеса от Дениса Полоцкого. Внедрение без остановки процессов, окупаемость от 2 месяцев.">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">'''

new_meta = '''  <meta name="description"
    content="13 готовых ИИ-решений для бизнеса: анализ клиентов, квалификация лидов, автоматизация продаж и маркетинга. Внедрение в Bitrix24 без остановки процессов, окупаемость от 2 месяцев.">
  <link rel="canonical" href="https://denjah.github.io/Ai-script-pricelist/">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://denjah.github.io/Ai-script-pricelist/">
  <meta property="og:title" content="ИИ-помощники для бизнеса — 13 решений | Денис Полоцк">
  <meta property="og:description" content="13 готовых ИИ-решений: анализ клиентов, квалификация лидов, автоматизация продаж. Внедрение в Bitrix24, окупаемость от 2 месяцев.">
  <meta property="og:image" content="https://denjah.github.io/Ai-script-pricelist/IMAGES/den_polock.webp">
  <meta property="og:locale" content="ru_RU">
  <meta property="og:site_name" content="AI-Помощники для бизнеса">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="ИИ-помощники для бизнеса — 13 решений | Денис Полоцк">
  <meta name="twitter:description" content="13 готовых ИИ-решений: анализ клиентов, квалификация лидов, автоматизация продаж. Окупаемость от 2 месяцев.">
  <meta name="twitter:image" content="https://denjah.github.io/Ai-script-pricelist/IMAGES/den_polock.webp">
  <!-- JSON-LD: ProfessionalService -->
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"ProfessionalService","name":"ИИ-помощники для бизнеса","description":"Внедрение ИИ-решений в бизнес-процессы и CRM-системы","url":"https://denjah.github.io/Ai-script-pricelist/","founder":{"@type":"Person","name":"Денис Полоцк"}}
  </script>
  <link rel="icon" type="image/svg+xml" href="favicon.svg">'''

# Try both line ending formats
if old_meta in html:
    html = html.replace(old_meta, new_meta)
    print("Meta replaced (LF)")
else:
    old_meta_crlf = old_meta.replace("\n", "\r\n")
    new_meta_crlf = new_meta.replace("\n", "\r\n")
    if old_meta_crlf in html:
        html = html.replace(old_meta_crlf, new_meta_crlf)
        print("Meta replaced (CRLF)")
    else:
        print("WARNING: Meta block not found!")

# === 3. Insert SEO block before footer ===
footer_marker = "  <!-- === FOOTER: SKILLS MARQUEE + NAVIGATION"
if footer_marker in html:
    # Find the full comment block (3 lines)
    idx = html.index(footer_marker)
    # Go back to find the <!-- === line before it
    search_back = html[:idx].rstrip()
    # Find the last <!-- === before footer
    separator = "  <!-- ============================================== -->"
    last_sep = search_back.rfind(separator)
    if last_sep > 0:
        insert_point = last_sep
        html = html[:insert_point] + seo_block + html[insert_point:]
        print(f"SEO block inserted at char {insert_point}")
    else:
        print("WARNING: Could not find separator before footer")
else:
    print("WARNING: Footer marker not found!")

print(f"New size: {len(html)} chars")

# Write back
with open(INDEX, "w", encoding="utf-8") as f:
    f.write(html)

print("File saved successfully!")
