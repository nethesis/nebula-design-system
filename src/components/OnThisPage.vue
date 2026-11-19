<!--
  Copyright (C) 2026 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { nextTick, ref, useId, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { pageHref, type Page } from '../pages'
import type { PageSection } from '../composables/usePageSections'

// The sections of the current page: a column on the right of the content on
// wide screens, a button that shows them above the content on the others
const props = defineProps<{
  page: Page
  sections: PageSection[]
  activeSection: string
  layout: 'column' | 'button'
}>()
const emit = defineEmits<{ navigate: [page: Page, hash: string] }>()

const expanded = ref(false)
const listId = useId()

// a new page starts with its sections hidden
watch(
  () => props.page,
  () => (expanded.value = false)
)

// plain links, so that they can also be opened in a new tab
function follow(event: MouseEvent, section: PageSection) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }
  event.preventDefault()
  expanded.value = false
  emit('navigate', props.page, `#${section.id}`)
}

// the column can be taller than the screen: keep the current section in
// view, scrolling only the column
const column = ref<HTMLElement>()
watch(
  () => props.activeSection,
  async () => {
    await nextTick()
    const link = column.value?.querySelector<HTMLElement>('[aria-current="location"]')
    if (!column.value || !link) return
    const box = column.value.getBoundingClientRect()
    const item = link.getBoundingClientRect()
    if (item.top < box.top) column.value.scrollTop -= box.top - item.top + 16
    else if (item.bottom > box.bottom) column.value.scrollTop += item.bottom - box.bottom + 16
  }
)

const linkClasses = (section: PageSection) => [
  section.id === props.activeSection
    ? 'font-medium text-primary-700 dark:text-primary-500'
    : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50',
  'block py-1 text-sm leading-6 transition-colors focus-visible:outline-2 focus-visible:outline-primary-700 dark:focus-visible:outline-primary-500'
]
</script>

<template>
  <nav
    v-if="sections.length && layout === 'column'"
    ref="column"
    aria-labelledby="on-this-page-column"
    class="sticky top-24 max-h-[calc(100dvh-8rem)] overflow-y-auto"
  >
    <p
      id="on-this-page-column"
      class="pb-2 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400"
    >
      On this page
    </p>
    <ul role="list" class="space-y-0.5 border-l border-gray-200 dark:border-gray-700">
      <li v-for="section in sections" :key="section.id">
        <a
          :href="`${pageHref(page)}#${section.id}`"
          :aria-current="section.id === activeSection ? 'location' : undefined"
          :class="[
            linkClasses(section),
            '-ml-px border-l-2 pr-2 pl-4',
            section.id === activeSection
              ? 'border-primary-700 dark:border-primary-500'
              : 'border-transparent'
          ]"
          @click="follow($event, section)"
        >
          {{ section.title }}
        </a>
      </li>
    </ul>
  </nav>

  <nav
    v-else-if="sections.length"
    aria-label="On this page"
    class="max-w-3xl rounded-md border border-gray-200 dark:border-gray-700"
  >
    <button
      type="button"
      :aria-expanded="expanded"
      :aria-controls="listId"
      class="flex w-full items-center justify-between gap-x-3 rounded-md px-4 py-2 text-sm leading-6 font-medium text-gray-900 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-primary-700 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus-visible:outline-primary-500"
      @click="expanded = !expanded"
    >
      On this page
      <FontAwesomeIcon
        :icon="expanded ? faChevronUp : faChevronDown"
        class="size-3 shrink-0"
        aria-hidden="true"
      />
    </button>
    <ul
      v-show="expanded"
      :id="listId"
      role="list"
      class="space-y-0.5 border-t border-gray-200 px-4 py-2 dark:border-gray-700"
    >
      <li v-for="section in sections" :key="section.id">
        <a
          :href="`${pageHref(page)}#${section.id}`"
          :aria-current="section.id === activeSection ? 'location' : undefined"
          :class="[linkClasses(section), 'rounded-md']"
          @click="follow($event, section)"
        >
          {{ section.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>
