# Nebula Design System

The Nebula Design System is made of three parts, to use together:

- **This site**: the rules shared by all products, whatever technology they are built with.
- **[vue-components Storybook](https://nethesis.github.io/vue-components/)**: the Vue components
  and patterns of `@nethesis/vue-components`, with their props and live examples.
- **[Nebula Figma file](https://www.figma.com/design/ZRZzzlqb9GfB9Xdz6iGufh/Nebula-Design-System)**: the designs,
  open to the members of the Nethesis Figma team.

It applies to the user interfaces of Nethesis products, to different extents:

- **Fully**: NethSecurity and My Nethesis, built with Vue and `@nethesis/vue-components`.
- **Without the components**: NethVoice CTI and NethLink, built with React and Tailwind CSS. The
  writing guidelines, the glossary, the foundations and accessibility apply; vue-components does
  not.
- **Text only**: [NethServer 8](#nethserver-8), which uses Carbon, and NethService, built on
  WebTop. The writing guidelines and the glossary apply.

## What you find here

- [Writing guidelines](?page=writing-guidelines): how to write interface text, from voice and
  tone to the text of buttons, forms, empty states, modals and notifications.
- [Glossary](?page=glossary): the approved terms, with their Italian translations and the terms to
  avoid.
- Foundations: [colors](?page=colors), [typography](?page=typography),
  [iconography](?page=iconography), [spacing and border](?page=spacing-and-border),
  [elevation and shadow](?page=elevation-and-shadow), and
  [accessibility](?page=accessibility).

## Use it with a coding agent

The `nebula-frontend` skill makes a coding agent follow Nebula when it writes or reviews a
frontend. It reads the rules from this site and from the Storybook, so it is always up to date.
It is in the `frontend-skills` plugin of [NethServer/agents](https://github.com/NethServer/agents),
and has been tested in Claude Code and Codex. Other agents that support the
[Agent Skills](https://agentskills.io/) format may run it too. In a Claude Code session, run:

```
/plugin marketplace add NethServer/agents
/plugin install frontend-skills@nethserver
/reload-plugins
```

In Codex, run these commands in a terminal, then start a new session:

```
codex plugin marketplace add NethServer/agents
codex plugin add frontend-skills@nethserver
```

Other agents can read the same rules from [`llms.txt`](https://nethesis.github.io/nebula-design-system/llms.txt), the index of the files this
site publishes for them.

## NethServer 8

NethServer 8 uses the Carbon Design System, not Nebula: only the
[writing guidelines](?page=writing-guidelines) and the [glossary](?page=glossary) apply to it. The
foundations and the vue-components library do not. For its components and visual style, see:

- [Carbon Design System v10](https://v10.carbondesignsystem.com/): the design system.
- [ns8-ui-lib Storybook](https://nethserver.github.io/ns8-ui-lib/): the NethServer 8 components.
- [Carbon Components Vue Storybook](https://vue.carbondesignsystem.com/vue2/): the Carbon
  components for Vue 2.
