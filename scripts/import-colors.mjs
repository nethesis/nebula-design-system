// Copyright (C) 2026 Nethesis S.r.l.
// SPDX-License-Identifier: GPL-3.0-or-later

// Validates the output of scripts/figma/export-colors.js and writes
// data/colors.json, one color per line so that diffs stay readable.
//
//   node scripts/import-colors.mjs <export.json>

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const OUTPUT = fileURLToPath(new URL('../data/colors.json', import.meta.url))
const HEX = /^#[0-9a-f]{6}([0-9a-f]{2})?$/

const file = process.argv[2]
if (!file) {
  console.error('usage: node scripts/import-colors.mjs <export.json>')
  process.exit(1)
}

const raw = JSON.parse(readFileSync(file, 'utf8'))
const errors = []

const primitives = raw.primitives.map(([name, hex]) => {
  if (!HEX.test(hex)) errors.push(`primitive ${name}: invalid color ${hex}`)
  return { name, hex }
})
const primitiveNames = new Set(primitives.map((p) => p.name))

// "Primitive:Gray/400" becomes "Gray/400"; other collections are kept as they are
const reference = (token, ref) => {
  if (ref === null) return null
  const [collection, name] = ref.split(/:(.*)/s)
  if (collection === 'Primitive' && !primitiveNames.has(name)) {
    errors.push(`${token}: unknown primitive ${name}`)
  }
  return collection === 'Primitive' ? name : ref
}

// Groups renamed here until the Figma file is fixed (see figma-fixes.md).
const RENAMED_GROUPS = [
  ['Product Primary/Website and My Nethesis/', 'Product Primary/My Nethesis/']
]
const rename = (name) => {
  for (const [from, to] of RENAMED_GROUPS) {
    if (name.startsWith(from)) return to + name.slice(from.length)
  }
  return name
}

const semantic = raw.semantic.map(([figmaName, lightRef, lightHex, darkRef, darkHex, description]) => {
  const name = rename(figmaName)
  for (const hex of [lightHex, darkHex]) {
    if (!HEX.test(hex)) errors.push(`${name}: invalid color ${hex}`)
  }
  return {
    name,
    light: { ref: reference(name, lightRef), hex: lightHex },
    dark: { ref: reference(name, darkRef), hex: darkHex },
    description
  }
})

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

const line = (value) => `  ${JSON.stringify(value)}`
const json = `{
"source": "Nebula Figma file ZRZzzlqb9GfB9Xdz6iGufh, variable collections Primitive and Semantic colors",
"exportedAt": "${new Date().toISOString().slice(0, 10)}",
"primitives": [
${primitives.map(line).join(',\n')}
],
"semantic": [
${semantic.map(line).join(',\n')}
]
}
`
JSON.parse(json)
writeFileSync(OUTPUT, json)
console.log(`data/colors.json: ${primitives.length} primitives, ${semantic.length} semantic tokens`)
