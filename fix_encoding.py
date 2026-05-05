with open(r'd:\Project\files\portfolio\index.html', 'r', encoding='utf-8') as f:
    t = f.read()

fixes = [
    ('\xf0\x9f\x8e\xaf', '&#127919;'),   # 🎯
    ('\xf0\x9f\x9a\x80', '&#128640;'),   # 🚀
    ('\xf0\x9f\x8e\xa8', '&#127912;'),   # 🎨
    ('\xf0\x9f\xa4\x9d', '&#129309;'),   # 🤝
    ('\xf0\x9f\x93\x84', '&#128196;'),   # 📄
    ('\xf0\x9f\x93\xa7', '&#128231;'),   # 📧
    ('\xf0\x9f\x92\xbc', '&#128188;'),   # 💼
    ('\xf0\x9f\x90\x99', '&#128025;'),   # 🐙
    ('\xf0\x9f\x93\x8d', '&#128205;'),   # 📍
    ('\xf0\x9f\x9a\xa7', '&#128679;'),   # 🚧
    ('\xe2\x80\x94',     '&mdash;'),      # —
    ('\xc2\xb7',         '&middot;'),     # ·
    ('\xe2\x80\x99',     '\''),           # '
    ('\xe2\x80\x9c',     '"'),            # "
    ('\xe2\x80\x9d',     '"'),            # "
    ('\xe2\x80\xa2',     '&bull;'),       # •
    # Garbled forms already in file
    ('ðŸŽ¯', '&#127919;'),
    ('ðŸš€', '&#128640;'),
    ('ðŸŽ¨', '&#127912;'),
    ('ðŸ"„', '&#128196;'),
    ('â€"',  '&mdash;'),
    ('Â·',   '&middot;'),
    ('â€™',  '\''),
    ('â€œ',  '"'),
]

for bad, good in fixes:
    t = t.replace(bad, good)

# Handle the tricky ones character by character
out = []
i = 0
while i < len(t):
    # 🤝 — U+1F91D
    if t[i:i+4] == '\xf0\x9f\xa4\x9d':
        out.append('&#129309;')
        i += 4
    else:
        out.append(t[i])
        i += 1

result = ''.join(out)

with open(r'd:\Project\files\portfolio\index.html', 'w', encoding='utf-8') as f:
    f.write(result)

print('Fixed successfully')
