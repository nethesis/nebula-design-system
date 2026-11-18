<!--
  Copyright (C) 2026 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBars,
  faBell,
  faChevronDown,
  faCircleCheck,
  faCircleQuestion,
  faCircleXmark,
  faEye,
  faHouse,
  faPenToSquare,
  faTrash,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import {
  faHouse as falHouse,
  faServer as falServer,
  faTriangleExclamation as falTriangleExclamation,
  faUserGroup as falUserGroup
} from '@nethesis/nethesis-light-svg-icons'
import { NeButton, NeCard } from '@nethesis/vue-components'
import Layout from '../../content/layout.md'

// The rules are in content/layout.md, also published for agents. Its
// ```example blocks become empty elements, filled here with examples built
// with the real components. The examples only show: their buttons do nothing.

const cardMenu = [
  { id: 'edit', label: 'Edit', icon: faPenToSquare },
  { id: 'delete', label: 'Delete', icon: faTrash, danger: true }
]

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
                <span class="text-sm text-gray-600 dark:text-gray-300">State of the product</span>
                <span :class="separator" />
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
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xl font-medium text-gray-900 dark:text-gray-50">Users</p>
              <p class="mt-1 text-gray-600 dark:text-gray-300">
                List of users, including their role and status.
              </p>
            </div>
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
        <NeCard title="Subscription" :menu-items="cardMenu">
          <p class="text-gray-600 dark:text-gray-300">Enterprise, valid until 31/12/2027.</p>
          <NeButton kind="tertiary" class="mt-4">
            <template #prefix>
              <FontAwesomeIcon :icon="faEye" aria-hidden="true" />
            </template>
            Details
          </NeButton>
        </NeCard>
      </div>
      <div>
        <p :class="[caption, 'text-rose-800 dark:text-rose-300']">
          <FontAwesomeIcon :icon="faCircleXmark" class="size-4" aria-hidden="true" />
          Don't
        </p>
        <NeCard title="Subscription" :menu-items="cardMenu">
          <p class="text-gray-600 dark:text-gray-300">Enterprise, valid until 31/12/2027.</p>
          <div class="mt-4 flex justify-end">
            <NeButton kind="tertiary">
              <template #prefix>
                <FontAwesomeIcon :icon="faEye" aria-hidden="true" />
              </template>
              Details
            </NeButton>
          </div>
        </NeCard>
      </div>
    </div>
  </Teleport>

  <Teleport defer to="[data-example='one-primary']">
    <div class="my-6 grid max-w-3xl gap-x-4 gap-y-8 sm:grid-cols-2">
      <div>
        <p :class="[caption, 'text-green-800 dark:text-green-300']">
          <FontAwesomeIcon :icon="faCircleCheck" class="size-4" aria-hidden="true" />
          Do
        </p>
        <div :class="[frame, 'flex justify-end gap-3']">
          <NeButton kind="tertiary">Cancel</NeButton>
          <NeButton kind="danger">Delete</NeButton>
        </div>
      </div>
      <div>
        <p :class="[caption, 'text-rose-800 dark:text-rose-300']">
          <FontAwesomeIcon :icon="faCircleXmark" class="size-4" aria-hidden="true" />
          Don't
        </p>
        <div :class="[frame, 'flex justify-end gap-3']">
          <NeButton kind="primary">Cancel</NeButton>
          <NeButton kind="primary">Delete</NeButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>
