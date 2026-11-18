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
  faTrash
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

// the side menu of the app shell example, as in My Nethesis
const menuSections = [
  {
    label: 'Systems management',
    items: [
      { label: 'Alerts', icon: falTriangleExclamation },
      { label: 'Systems', icon: falServer }
    ]
  },
  {
    label: 'Companies and users',
    items: [{ label: 'Users', icon: falUserGroup }]
  }
]
const menuItem =
  'flex items-center gap-x-3 rounded-md border-l-4 px-3 py-2 text-sm leading-6 font-medium'
const otherItem = [menuItem, 'border-transparent text-gray-600 dark:text-gray-300']
const iconButton = 'flex rounded-full p-2 text-gray-700 dark:text-gray-200'

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
    <div
      class="@container my-6 max-w-3xl overflow-hidden rounded-md border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
      aria-hidden="true"
    >
      <div class="flex">
        <!-- side menu, hidden on a narrow example as below lg -->
        <div
          class="hidden w-56 shrink-0 border-r border-gray-200 bg-white px-2 pb-4 @xl:block dark:border-gray-700 dark:bg-gray-950"
        >
          <p class="flex h-14 items-center px-3 font-medium text-gray-900 dark:text-gray-50">
            Product logo
          </p>
          <p
            :class="[
              menuItem,
              'border-primary-700 dark:border-primary-500 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
            ]"
          >
            <FontAwesomeIcon :icon="faHouse" class="h-5 w-6 shrink-0" />
            Dashboard
          </p>
          <template v-for="section in menuSections" :key="section.label">
            <p class="px-3 pt-5 pb-1 text-xs text-gray-500 uppercase dark:text-gray-400">
              {{ section.label }}
            </p>
            <p v-for="item in section.items" :key="item.label" :class="otherItem">
              <FontAwesomeIcon :icon="item.icon" class="h-5 w-6 shrink-0" />
              {{ item.label }}
            </p>
          </template>
        </div>
        <div class="min-w-0 flex-1">
          <!-- top bar -->
          <div
            class="flex h-14 items-center gap-x-3 border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-950"
          >
            <span :class="[iconButton, '-ml-2 @xl:hidden']">
              <FontAwesomeIcon :icon="faBars" class="size-5" />
            </span>
            <span class="h-6 w-px bg-gray-200 @xl:hidden dark:bg-gray-700" />
            <span class="flex-1" />
            <span class="hidden text-sm text-gray-600 @md:inline dark:text-gray-300">
              State of the product
            </span>
            <span class="hidden h-6 w-px bg-gray-200 @md:block dark:bg-gray-700" />
            <span class="-mr-2 flex items-center gap-x-1">
              <span :class="iconButton"
                ><FontAwesomeIcon :icon="faCircleQuestion" class="size-5"
              /></span>
              <span :class="iconButton"><FontAwesomeIcon :icon="faBell" class="size-5" /></span>
              <span :class="[iconButton, 'items-center gap-2']">
                <span
                  class="flex size-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                >
                  A
                </span>
                <FontAwesomeIcon :icon="faChevronDown" class="size-3" />
              </span>
            </span>
          </div>
          <!-- page -->
          <div class="px-4 py-6">
            <p class="text-xl font-medium text-gray-900 dark:text-gray-50">Dashboard</p>
            <p :class="placeholder">Page</p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>

  <Teleport defer to="[data-example='page-header']">
    <div class="my-6 grid max-w-3xl gap-4">
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
    <div class="my-6 grid max-w-3xl gap-4 sm:grid-cols-2">
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
    <div class="my-6 grid max-w-3xl gap-4 sm:grid-cols-2">
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
