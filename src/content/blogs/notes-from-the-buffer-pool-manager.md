---
title: "Notes From The Buffer Pool Cache"
description: "Internals of a buffer pool manager & some design philosophies"
date: "2025-04-15"
---

A buffer pool manager is an indirection layer that sits between the execution layer *(query executor)* of the query and the data layer *(disk manager)*. It's an indirection layer that not only acts as an indirection but also as an abstraction that offers the undisputable benefit of caching with appropriate cache eviction policy. Having a single layer for fetching page data also makes it easier to handle certain concurrency related problems

## Things that a useful Buffer Pool Manager brings to the table

A Buffer Pool must adhere to some of the following conditions:
- Any basic buffer pool manager **(BFPM)** should allow us to fetch page data *(usually as unsigned char[PAGE_SIZE])* given a page id. 

- Any thread that fetches the page data should also be responsible for informing the **BFPM** once it has finished using the page data. This is to release the **READ LATCH** on the page data

- There should be a way for a thread to let the **BFPM** know that it needs to modify the contents of a page (**WRITE LATCH**). 

- A **BFPM** should also contain an implicit eviction manager which releases the memory occupied by **Cold Pages** (or) pages that the buffer pool manager assumes, will not be used in the near future. This is done to make memory available for other pages that might need to be used for processing running queries.

- Consistency should be handled in concurrent workloads properly using the **READ** and **WRITE** Latches.

```cpp
enum LatchType {
    READ_LATCH,
    WRITE_LATCH
};

class BufferPoolManager {

    class EvictionManager {
        void updateAccess(int pageId);
        void evictPage();
    }

    unsigned char* getPage(int pageId, LatchType lt);
    void releasePage(int pageId);
    bool upgradeLatch(int pageId);
    EvictionManager em;
};
```

The methods defined by the skeleton of the BufferPoolManager is synchronous to the requirements of a buffer pool manager listed above. 

## Necessary Data Structures

The above class is a skeleton for implementing a **BFPM** and it enumerates the APIs the user of the **BFPM** will call in terms of methods. But we're yet to really look into the internal workings of the Buffer Pool Manager. While the skeleton is algorithm agnostic and high level, any note on a buffer pool manager should discuss about the specifics of the algorithm that powers the **BFPM** and the data structures required to do so.

*Note: I want to implement a generic Buffer Pool Manager with as much modularity as possible (For Extension) so I will not be using any sohphisticated algorithms for cache eviction and whatnot.*

<table style="border: 2px solid black;  border-radius: 5px; padding: 10px;">
  <tr>
    <th >Component</th>
    <th >Structure</th>
    <th >Need</th>
  </tr>
  <tr>
    <td>Buffer Pool Manager</td>
    <td>Concurrent Hash Map</td>
    <td>To store the page Id vs Page Data</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>