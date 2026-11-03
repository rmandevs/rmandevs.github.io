---
category: "Tool"
title: "pegboard"
date: 2026-11-03
repo: "rmandevs/pegboard"
language: "Go"
license: "MIT"
summary: "Configuration as Code for coding agents: declare MCPs, skills and context once, and apply them to every agent."
---
Pegboard declares the MCPs, skills and context your coding agents should have in one `pegboard.yaml`, then writes each agent's native config. It plans the change before touching anything, backs up every file it edits, and catches drift when a managed file is changed by hand. Works with Claude Code, Codex, opencode, Hermes, Pi, OMP, OpenClaw, Cursor and Gemini CLI.
