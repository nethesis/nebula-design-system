<!--
  Copyright (C) 2026 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { ELEVATION, SHADOWS } from '../foundations'
import { useTheme } from '../composables/useTheme'

const { isDark } = useTheme()
</script>

<template>
  <div class="foundation">
    <h2 id="elevation">Elevation</h2>
    <p>
      Elevation and shadow give depth to the interface, and build a visual hierarchy that guides the
      attention of users. Each level, from L0 to L4, has a surface color from the gray palette: L0
      is for the sidebar and the top bar, L1 for the page, and each next level for content on the
      previous one. L2 invert uses the L0 color to stand out on an L1 surface.
    </p>
    <p>The example follows the theme selected in the top bar.</p>
    <div
      class="mb-6 grid max-w-3xl grid-cols-[6rem_1fr] grid-rows-[auto_1fr] overflow-hidden rounded-md border border-gray-200 text-xs dark:border-gray-700"
    >
      <div
        class="col-span-2 border-b border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-950"
      >
        L0 top bar
      </div>
      <div class="border-r border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-950">
        L0 sidebar
      </div>
      <div class="bg-gray-50 p-4 dark:bg-gray-900">
        L1 page
        <div class="mt-2 grid gap-4 sm:grid-cols-2">
          <div class="bg-gray-100 p-4 dark:bg-gray-800">
            L2
            <div class="mt-2 bg-gray-200 p-4 dark:bg-gray-700">
              L3
              <div class="mt-2 bg-gray-300 p-4 dark:bg-gray-600">L4</div>
            </div>
          </div>
          <div class="bg-white p-4 dark:bg-gray-950">L2 invert</div>
        </div>
      </div>
    </div>
    <div class="table-frame">
      <table class="ds-table">
        <thead>
          <tr>
            <th>Level</th>
            <th>Use</th>
            <th>Light theme</th>
            <th>Dark theme</th>
            <th>Classes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="level in ELEVATION" :key="level.level">
            <td class="whitespace-nowrap">{{ level.level }}</td>
            <td class="min-w-56">{{ level.use }}</td>
            <td>{{ level.light }}</td>
            <td>{{ level.dark }}</td>
            <td>
              <code>{{ level.className }}</code>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="shadow">Shadow</h2>
    <p>
      Shadows apply to components such as cards, buttons, modals and tooltips, and give subtle cues
      about interactivity and layering. Each Figma shadow token matches a Tailwind CSS shadow class.
      In the dark theme the shadows are gray instead of black, and the drawer shadow is darker.
    </p>
    <div class="table-frame">
      <table class="ds-table">
        <thead>
          <tr>
            <th>Token</th>
            <th>Class</th>
            <th>Light theme</th>
            <th>Dark theme</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="shadow in SHADOWS" :key="shadow.token">
            <td class="whitespace-nowrap">{{ shadow.token }}</td>
            <!-- one class per line: the drawer has a long one for each theme -->
            <td>
              <div class="flex flex-col items-start gap-1">
                <code v-for="name in shadow.className.split(' ')" :key="name">{{ name }}</code>
              </div>
            </td>
            <td class="min-w-56 text-xs">{{ shadow.light }}</td>
            <td class="min-w-56 text-xs">{{ shadow.dark }}</td>
            <td class="px-6 py-6">
              <div
                class="h-12 w-24 rounded-md bg-white dark:bg-gray-950"
                :style="{ boxShadow: isDark ? shadow.dark : shadow.light }"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
