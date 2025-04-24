---
title: "Writing a Buffer Pool Manager"
description: "A blog on getting started with astro"
date: "2025-04-15"
---

A buffer pool manager is an indirection layer that sits between the execution layer *(query executor)* of the query and the data layer *(disk manager)*. It's an indirection layer that not only acts as an indirection but also as an abstraction that offers the undisputable benefit of caching with proper an appropriate cache eviction policy.  