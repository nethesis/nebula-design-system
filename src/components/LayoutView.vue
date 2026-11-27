<!--
  Copyright (C) 2026 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faArrowRight,
  faBars,
  faBell,
  faBuilding,
  faChevronDown,
  faCircleCheck,
  faCircleQuestion,
  faCircleXmark,
  faHouse,
  faServer,
  faTriangleExclamation,
  faUserGroup,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import {
  faHouse as falHouse,
  faServer as falServer,
  faTriangleExclamation as falTriangleExclamation,
  faUserGroup as falUserGroup
} from '@nethesis/nethesis-light-svg-icons'
import {
  NeButton,
  NeCard,
  NePaginator,
  NeRoundedIcon,
  NeTable,
  NeTableBody,
  NeTableCell,
  NeTableHead,
  NeTableHeadCell,
  NeTableRow,
  NeTextInput,
  NeToastNotificationV2,
  NeTooltip,
  type NeNotificationV2
} from '@nethesis/vue-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { computed, reactive, ref } from 'vue'
import Layout from '../../content/layout.md'

// The rules are in content/layout.md, also published for agents. Its
// ```example blocks become empty elements, filled here with examples built
// with the real components. The examples only show: their buttons do nothing.

// the app shell example, as in My Nethesis: the items of its side menu, with
// the section labels, and the parts of its top bar
const menuItem =
  'flex items-center gap-x-3 rounded-md border-l-4 px-3 py-2 text-sm leading-6 font-medium'
const currentItem = [
  menuItem,
  'border-primary-700 dark:border-primary-500 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
]
const otherItem = [menuItem, 'border-transparent text-gray-600 dark:text-gray-300']
const sectionLabel = 'px-3 pt-5 pb-1 text-xs text-gray-500 uppercase dark:text-gray-400'
const menuItems = [
  { label: 'Dashboard', icon: faHouse, classes: currentItem },
  { label: 'Systems management', classes: sectionLabel },
  { label: 'Alerts', icon: falTriangleExclamation, classes: otherItem },
  { label: 'Systems', icon: falServer, classes: otherItem },
  { label: 'Companies and users', classes: sectionLabel },
  { label: 'Users', icon: falUserGroup, classes: otherItem }
]
const topBarIcons = [faCircleQuestion, faBell]
const shellFrame =
  'overflow-hidden rounded-md border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'
const logo = 'flex h-14 items-center px-3 font-medium text-gray-900 dark:text-gray-50'
const topBar =
  'flex h-14 items-center gap-x-3 border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-950'
const separator = 'h-6 w-px bg-gray-200 dark:bg-gray-700'
const iconButton = 'flex rounded-full p-2 text-gray-700 dark:text-gray-200'
const avatar =
  'flex size-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200'

// the form in a page example, as FormLayout of My Nethesis and NethSecurity:
// the wide frame follows the md breakpoint, the small one is always stacked
const formSections = reactive([
  {
    title: 'Profile',
    description: 'Your name and the address that receives the notifications.',
    fields: [
      { label: 'Name', value: 'Alice Fox' },
      { label: 'Email', value: 'alice@example.com' }
    ]
  },
  {
    title: 'Support',
    description: 'Who Nethesis contacts about your support requests.',
    fields: [{ label: 'Phone number', value: '+39 0000 000000' }]
  }
])
const formScreens = [
  {
    caption: 'Wide screens',
    width: 'min-w-0',
    row: 'flex flex-col md:flex-row',
    side: 'sm:mr-6 md:w-5/12',
    fields: 'md:w-7/12'
  },
  { caption: 'Small screens', width: 'max-w-xs', row: 'flex flex-col', side: '', fields: '' }
]

// the dashboard example, as the counter cards of My Nethesis, with titles in
// sentence case: the numbers link to their lists
// From 10,000 the number is abbreviated, such as 12.5K, with the full
// number in a tooltip
const COMPACT_FROM = 10_000
const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
const full = new Intl.NumberFormat('en')
const counters = [
  { title: 'Alerts', counter: 3, icon: faTriangleExclamation },
  { title: 'Systems', counter: 12480, icon: faServer },
  { title: 'Customers', counter: 34, icon: faBuilding },
  { title: 'Users', counter: 12, icon: faUserGroup }
]

// the tables example: a table of users with NePaginator, 10 rows by default.
// A new number of rows brings it back to the first page.
const users = [
  'Alice Fox',
  'Bruno Rossi',
  'Carla Bianchi',
  'Daniel Weber',
  'Elena Conti',
  'Franco Neri',
  'Giulia Romano',
  'Hugo Martin',
  'Irene Galli',
  'Jonas Berg',
  'Laura Ferri',
  'Marco Greco'
].map((name, index) => ({
  name,
  email: `${name.split(' ')[0].toLowerCase()}@example.com`,
  role: index % 4 === 0 ? 'Admin' : 'Support'
}))
const pageSize = ref(10)
const currentPage = ref(1)
const usersPage = computed(() =>
  users.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
)
function selectPageSize(size: number) {
  pageSize.value = size
  currentPage.value = 1
}

// the buttons example: a copy of NeModal, open in its place, with the classes
// of its backdrop and panel, so that the two versions show side by side
const modalBackdrop = 'rounded-md bg-gray-500/75 p-4 sm:p-6 dark:bg-gray-700/75'
const modalPanel = 'rounded-lg bg-gray-50 px-4 pt-5 pb-4 shadow-xl sm:p-6 dark:bg-gray-900'
const modalExamples = [
  {
    caption: 'Do',
    icon: faCircleCheck,
    captionClass: 'text-green-800 dark:text-green-300',
    cancel: 'tertiary',
    confirm: 'danger'
  },
  {
    caption: "Don't",
    icon: faCircleXmark,
    captionClass: 'text-rose-800 dark:text-rose-300',
    cancel: 'primary',
    confirm: 'primary'
  }
] as const

// the toasts example, as My Nethesis shows them: on the screen, below the top
// bar, and in its notifications drawer. NeToastNotificationV2 names its close
// icon by string, so it must be in the icon library.
library.add(faXmark)
const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000)
const toasts: NeNotificationV2[] = [
  {
    id: 'user',
    kind: 'success',
    title: 'User created',
    description: 'User Alice Fox has been created',
    timestamp: minutesAgo(1)
  },
  {
    id: 'contact',
    kind: 'error',
    title: 'Cannot save phonebook contact',
    description: 'Request failed',
    timestamp: minutesAgo(5),
    firstButtonLabel: 'Details',
    firstButtonAction: 'details',
    firstButtonKind: 'secondary'
  }
]
const drawerPanel =
  'relative ml-auto w-[calc(100%-4rem)] bg-gray-50 p-6 shadow-[0px_20px_40px_0_rgba(0,0,0,0.2)] sm:w-100 dark:bg-gray-900 dark:shadow-[0px_20px_40px_0_rgba(0,0,0,0.6)]'

const frame = 'rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900'
const placeholder =
  'mt-6 flex h-24 items-center justify-center rounded-md border border-dashed border-gray-300 text-sm text-gray-500 dark:border-gray-600 dark:text-gray-400'
const caption = 'mb-2 flex items-center gap-2 text-xs font-medium'
</script>

<template>
  <article class="markdown">
    <Layout />
  </article>

  <Teleport defer to="[data-example='app-shell']">
    <div class="my-6 grid max-w-3xl gap-8" aria-hidden="true">
      <div class="min-w-0">
        <p :class="[caption, 'text-gray-600 dark:text-gray-300']">Wide screens</p>
        <div :class="[shellFrame, 'overflow-x-auto']">
          <div class="flex min-w-xl">
            <div
              class="w-56 shrink-0 border-r border-gray-200 bg-white px-2 pb-4 dark:border-gray-700 dark:bg-gray-950"
            >
              <p :class="logo">Product logo</p>
              <p v-for="item in menuItems" :key="item.label" :class="item.classes">
                <FontAwesomeIcon v-if="item.icon" :icon="item.icon" class="h-5 w-6 shrink-0" />
                {{ item.label }}
              </p>
            </div>
            <div class="min-w-0 flex-1">
              <div :class="topBar">
                <span class="flex-1" />
                <span class="-mr-2 flex items-center gap-x-1">
                  <span v-for="icon in topBarIcons" :key="icon.iconName" :class="iconButton">
                    <FontAwesomeIcon :icon="icon" class="size-5" />
                  </span>
                  <span :class="[iconButton, 'items-center gap-2']">
                    <span :class="avatar">A</span>
                    <FontAwesomeIcon :icon="faChevronDown" class="size-3" />
                  </span>
                </span>
              </div>
              <div class="px-4 py-6">
                <p class="text-xl font-medium text-gray-900 dark:text-gray-50">Dashboard</p>
                <p :class="placeholder">Page</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid gap-x-4 gap-y-8 sm:grid-cols-2">
        <div v-for="menuOpen in [false, true]" :key="String(menuOpen)" class="w-full max-w-xs">
          <p :class="[caption, 'text-gray-600 dark:text-gray-300']">
            {{ menuOpen ? 'Small screens, menu open' : 'Small screens' }}
          </p>
          <div :class="[shellFrame, 'relative h-[27rem]']">
            <div :class="topBar">
              <span :class="[iconButton, '-ml-2']">
                <FontAwesomeIcon :icon="faBars" class="size-5" />
              </span>
              <span :class="separator" />
              <span class="flex-1" />
              <span class="-mr-2 flex items-center gap-x-1">
                <span v-for="icon in topBarIcons" :key="icon.iconName" :class="iconButton">
                  <FontAwesomeIcon :icon="icon" class="size-5" />
                </span>
                <span :class="[iconButton, 'items-center gap-2']">
                  <span :class="avatar">A</span>
                  <FontAwesomeIcon :icon="faChevronDown" class="size-3" />
                </span>
              </span>
            </div>
            <div class="px-4 py-6">
              <p class="text-xl font-medium text-gray-900 dark:text-gray-50">Dashboard</p>
              <p :class="placeholder">Page</p>
            </div>
            <template v-if="menuOpen">
              <div class="absolute inset-0 bg-gray-900/80" />
              <div
                class="absolute inset-y-0 left-0 w-[calc(100%-4rem)] bg-white px-2 pb-4 dark:bg-gray-950"
              >
                <p :class="logo">Product logo</p>
                <p v-for="item in menuItems" :key="item.label" :class="item.classes">
                  <FontAwesomeIcon v-if="item.icon" :icon="item.icon" class="h-5 w-6 shrink-0" />
                  {{ item.label }}
                </p>
              </div>
              <span class="absolute top-0 right-0 flex h-14 w-16 items-center justify-center">
                <FontAwesomeIcon :icon="faXmark" class="size-5 text-white" />
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </Teleport>

  <Teleport defer to="[data-example='page-header']">
    <div class="my-6 grid max-w-3xl gap-8">
      <div>
        <p :class="[caption, 'text-gray-600 dark:text-gray-300']">Wide screens</p>
        <div :class="frame">
          <p class="text-xl font-medium text-gray-900 dark:text-gray-50">Users</p>
          <div class="mt-1 flex items-center justify-between gap-4">
            <p class="text-gray-600 dark:text-gray-300">
              List of users, including their role and status.
            </p>
            <NeButton kind="primary" class="shrink-0">Create user</NeButton>
          </div>
          <p :class="placeholder">Table of users</p>
        </div>
      </div>
      <div class="max-w-xs">
        <p :class="[caption, 'text-gray-600 dark:text-gray-300']">Small screens</p>
        <div :class="frame">
          <p class="text-xl font-medium text-gray-900 dark:text-gray-50">Users</p>
          <p class="mt-1 text-gray-600 dark:text-gray-300">
            List of users, including their role and status.
          </p>
          <NeButton kind="primary" class="mt-4">Create user</NeButton>
          <p :class="placeholder">Table of users</p>
        </div>
      </div>
    </div>
  </Teleport>

  <Teleport defer to="[data-example='card-actions']">
    <div class="my-6 grid max-w-3xl gap-x-4 gap-y-8 sm:grid-cols-2">
      <div>
        <p :class="[caption, 'text-green-800 dark:text-green-300']">
          <FontAwesomeIcon :icon="faCircleCheck" class="size-4" aria-hidden="true" />
          Do
        </p>
        <NeCard title="Users">
          <p class="text-gray-600 dark:text-gray-300">12 users, 2 of them suspended.</p>
          <NeButton kind="secondary" class="mt-6">
            <template #prefix>
              <FontAwesomeIcon :icon="faArrowRight" aria-hidden="true" />
            </template>
            Go to Users
          </NeButton>
        </NeCard>
      </div>
      <div>
        <p :class="[caption, 'text-rose-800 dark:text-rose-300']">
          <FontAwesomeIcon :icon="faCircleXmark" class="size-4" aria-hidden="true" />
          Don't
        </p>
        <NeCard title="Users">
          <p class="text-gray-600 dark:text-gray-300">12 users, 2 of them suspended.</p>
          <div class="mt-6 flex justify-end">
            <NeButton kind="secondary">
              <template #prefix>
                <FontAwesomeIcon :icon="faArrowRight" aria-hidden="true" />
              </template>
              Go to Users
            </NeButton>
          </div>
        </NeCard>
      </div>
    </div>
  </Teleport>

  <Teleport defer to="[data-example='dashboard']">
    <div :class="['my-6 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2', frame]">
      <NeCard v-for="card in counters" :key="card.title">
        <template #title>
          <span class="flex items-start gap-3 text-base text-gray-700 dark:text-gray-200">
            <FontAwesomeIcon :icon="card.icon" class="size-5 shrink-0" aria-hidden="true" />
            {{ card.title }}
          </span>
        </template>
        <template #topRight>
          <a
            href="#dashboard"
            :aria-label="`${card.title}: ${full.format(card.counter)}`"
            class="focus-visible:ring-primary-500 rounded-md px-1 text-4xl font-medium text-indigo-700 focus-visible:ring-2 focus-visible:outline-none dark:text-indigo-500"
          >
            <NeTooltip v-if="card.counter >= COMPACT_FROM" trigger-event="mouseenter focus" placement="auto">
              <template #trigger>
                <span>{{ compact.format(card.counter) }}</span>
              </template>
              <template #content>{{ full.format(card.counter) }}</template>
            </NeTooltip>
            <span v-else>{{ card.counter }}</span>
          </a>
        </template>
      </NeCard>
    </div>
  </Teleport>

  <Teleport defer to="[data-example='form-in-page']">
    <div class="my-6 grid max-w-3xl gap-8">
      <div v-for="screen in formScreens" :key="screen.caption" :class="screen.width">
        <p :class="[caption, 'text-gray-600 dark:text-gray-300']">{{ screen.caption }}</p>
        <div :class="[frame, 'space-y-8']">
          <template v-for="section in formSections" :key="section.title">
            <div :class="screen.row">
              <div :class="screen.side">
                <p class="mb-2 text-lg font-medium text-gray-900 dark:text-gray-50">
                  {{ section.title }}
                </p>
                <p class="mb-8 text-sm text-gray-500 dark:text-gray-400">
                  {{ section.description }}
                </p>
              </div>
              <div :class="[screen.fields, 'space-y-6']">
                <NeTextInput
                  v-for="field in section.fields"
                  :key="field.label"
                  v-model="field.value"
                  :label="field.label"
                />
              </div>
            </div>
            <hr class="border-gray-200 dark:border-gray-700" />
          </template>
          <div :class="screen.row">
            <div :class="screen.side"></div>
            <div :class="screen.fields">
              <NeButton kind="primary">Save</NeButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>

  <Teleport defer to="[data-example='table-pagination']">
    <div class="my-6 max-w-3xl">
      <NeTable aria-label="Users" card-breakpoint="sm">
        <NeTableHead>
          <NeTableHeadCell>Name</NeTableHeadCell>
          <NeTableHeadCell>Email</NeTableHeadCell>
          <NeTableHeadCell>Role</NeTableHeadCell>
        </NeTableHead>
        <NeTableBody>
          <NeTableRow v-for="user in usersPage" :key="user.email">
            <NeTableCell data-label="Name">{{ user.name }}</NeTableCell>
            <NeTableCell data-label="Email">{{ user.email }}</NeTableCell>
            <NeTableCell data-label="Role">{{ user.role }}</NeTableCell>
          </NeTableRow>
        </NeTableBody>
        <template #paginator>
          <NePaginator
            :current-page="currentPage"
            :total-rows="users.length"
            :page-size="pageSize"
            :page-sizes="[5, 10, 25, 50, 100]"
            previous-label="Go to previous page"
            next-label="Go to next page"
            nav-pagination-label="Pagination"
            range-of-total-label="of"
            page-size-label="Show"
            @select-page="currentPage = $event"
            @select-page-size="selectPageSize"
          />
        </template>
      </NeTable>
    </div>
  </Teleport>

  <Teleport defer to="[data-example='one-primary']">
    <div class="my-6 grid max-w-3xl gap-x-4 gap-y-8 sm:grid-cols-2">
      <div v-for="modal in modalExamples" :key="modal.caption">
        <p :class="[caption, modal.captionClass]">
          <FontAwesomeIcon :icon="modal.icon" class="size-4" aria-hidden="true" />
          {{ modal.caption }}
        </p>
        <div :class="modalBackdrop" aria-hidden="true">
          <div :class="[modalPanel, 'relative']">
            <span class="absolute top-4 right-4 p-1 text-gray-600 dark:text-gray-300">
              <FontAwesomeIcon :icon="faXmark" class="size-5" />
            </span>
            <div class="flex items-start pr-6">
              <NeRoundedIcon kind="warning" class="mr-4 shrink-0" />
              <div>
                <p class="mb-4 text-base leading-6 font-medium text-gray-900 dark:text-gray-50">
                  Delete user
                </p>
                <p class="text-sm text-gray-700 dark:text-gray-200">
                  User Alice Fox will be permanently deleted.
                </p>
              </div>
            </div>
            <div class="mt-6 flex justify-end gap-3">
              <NeButton :kind="modal.cancel" size="lg">Cancel</NeButton>
              <NeButton :kind="modal.confirm" size="lg">Delete</NeButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>

  <Teleport defer to="[data-example='toasts']">
    <div class="my-6 grid max-w-3xl gap-8">
      <div class="min-w-0">
        <p :class="[caption, 'text-gray-600 dark:text-gray-300']">Toasts on the screen</p>
        <div :class="[shellFrame, 'relative h-80']">
          <div :class="topBar">
            <span class="flex-1" />
            <span v-for="icon in topBarIcons" :key="icon.iconName" :class="iconButton">
              <FontAwesomeIcon :icon="icon" class="size-5" />
            </span>
          </div>
          <div class="p-4">
            <p class="text-xl font-medium text-gray-900 dark:text-gray-50">Users</p>
            <p :class="placeholder">Page</p>
          </div>
          <div class="absolute inset-x-0 top-14 flex flex-col items-end space-y-4 p-4">
            <NeToastNotificationV2
              v-for="toast in toasts"
              :key="toast.id"
              :notification="toast"
              sr-close-label="Close"
              show-close-button
            />
          </div>
        </div>
      </div>
      <div class="min-w-0">
        <p :class="[caption, 'text-gray-600 dark:text-gray-300']">Notifications drawer</p>
        <div :class="[shellFrame, 'relative']">
          <div :class="[topBar, 'absolute inset-x-0 top-0']">
            <span class="flex-1" />
            <span v-for="icon in topBarIcons" :key="icon.iconName" :class="iconButton">
              <FontAwesomeIcon :icon="icon" class="size-5" />
            </span>
          </div>
          <div class="absolute inset-0 bg-gray-500/75 dark:bg-gray-700/75" />
          <div :class="drawerPanel">
            <div class="flex items-center justify-between">
              <p class="text-lg font-medium text-gray-900 dark:text-gray-50">Notifications</p>
              <FontAwesomeIcon :icon="faXmark" class="size-4 text-gray-700 dark:text-gray-200" />
            </div>
            <hr class="my-6 border-gray-200 dark:border-gray-700" />
            <div class="space-y-4">
              <NeToastNotificationV2
                v-for="toast in toasts"
                :key="toast.id"
                :notification="toast"
                sr-close-label="Close"
                full-width
                show-timestamp
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
