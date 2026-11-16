<!--
  Copyright (C) 2026 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCircleCheck,
  faCircleXmark,
  faEye,
  faPenToSquare,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { NeButton, NeCard } from '@nethesis/vue-components'
import Layout from '../../content/layout.md'

// The rules are in content/layout.md, also published for agents. Its
// ```example blocks become empty elements, filled here with examples built
// with the real components. The examples only show: their buttons do nothing.

const cardMenu = [
  { id: 'edit', label: 'Edit', icon: faPenToSquare },
  { id: 'delete', label: 'Delete', icon: faTrash, danger: true }
]

const frame = 'rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900'
const caption = 'mb-2 flex items-center gap-2 text-xs font-medium'
</script>

<template>
  <article class="markdown">
    <Layout />
  </article>

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
