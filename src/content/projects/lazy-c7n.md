---
category: "Tool"
title: "lazy-c7n"
date: 2026-11-11
repo: "rmandevs/lazy-c7n"
website: "https://rmandevs.github.io/lazy-c7n/"
language: "Go"
license: "MIT OR Apache-2.0"
summary: "Cloud Custodian without memorising a single flag: a keyboard-driven terminal UI for the custodian CLI."
image: "/projects/lazy-c7n.webp"
imageWidth: 1674
imageHeight: 504
imageAlt: "The lazy-c7n terminal UI: tabs for Policies, Runs, Resources, Schema and Jobs, with a green DRY badge in the status line"
imageCaption: "the Policies screen today"
---
lazy-c7n is a terminal UI for [Cloud Custodian](https://cloudcustodian.io/), in the spirit of lazygit and lazydocker. The goal is to turn the loop around c7n policies (validate, dry-run, run, read the results) into something you drive with a few keys.

It is **early alpha**. The scaffold is built and tested; the policy browser, dry-runs and live runs are being added milestone by milestone.

- A thin wrapper: the real `custodian` does all the work, and you see the exact command it runs
- Safe by default: dry-run first, and live runs sit behind a typed confirmation
- Local only: one binary, no server, no telemetry, and credentials are never stored or shown

lazy-c7n is an independent project. It is not affiliated with Cloud Custodian or the CNCF.
