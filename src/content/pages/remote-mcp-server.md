---
title: "Remote MCP Server"
description: "Setting up a remote model context protocol server with static client registration OAuth"
belongsTo:
  type: "groups"
  groups: []
references: []
created: 2025-10-01
---

This page provides a guide on setting up a remote Model Context Protocol (MCP) server that supports static client registration OAuth for secure communication.

## Prerequisites

In an empty directory, execute the following.

```bash
docker run --name mcp_server_remote -v $(pwd):/app --network=host -it ubuntu

apt update -y && apt install python3 -y

apt install python3-pip

apt install python3.12-venv

cd app && python3 -m venv env

source env/bin/activate

pip install fastmcp fastapi
```


